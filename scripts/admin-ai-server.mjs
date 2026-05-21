// FutureVisor 어드민 AI 분석 서버 (로컬 전용)
//
// 실행: `npm run ai:server`
// 인증: 로컬 Claude Code OAuth 세션 사용 (별도 ANTHROPIC_API_KEY 불필요)
//       env에 ANTHROPIC_API_KEY가 있으면 SDK가 그걸 우선 사용하므로,
//       구독으로만 돌리려면 해당 env가 비어있어야 함.
//
// 프로덕션(https://www.futurevisor.co.kr) 에선 mixed-content로 호출 불가 →
// 로컬 dev 모드(localhost:5173)에서만 사용.

import express from 'express'
import cors from 'cors'
import { spawn } from 'node:child_process'

const PORT = Number(process.env.FV_AI_PORT || 3001)
const MODEL = process.env.FV_AI_MODEL || 'claude-sonnet-4-6'

const app = express()
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5188',
      'http://127.0.0.1:5173',
      'https://www.futurevisor.co.kr',
      'https://futurevisor.co.kr',
    ],
    allowedHeaders: ['Content-Type', 'x-fv-admin'],
  }),
)
app.use(express.json({ limit: '1mb' }))

if (process.env.ANTHROPIC_API_KEY) {
  console.warn(
    '[fv-ai] ANTHROPIC_API_KEY가 설정되어 있습니다. 구독 한도로 무료 사용하려면 해당 env를 제거하세요.',
  )
}

// Agent SDK 대신 claude CLI를 직접 spawn — 컨테이너/네이티브 모두에서 안정적으로 동작.
// `claude -p <prompt> --model <model> --output-format json` 호출 후 JSON.result 반환.
async function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const args = ['-p', prompt, '--model', MODEL, '--output-format', 'json']
    const child = spawn('claude', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (chunk) => (stdout += chunk.toString()))
    child.stderr.on('data', (chunk) => (stderr += chunk.toString()))
    child.on('error', (e) => reject(new Error(`claude spawn 실패: ${e.message}`)))
    child.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`claude exit ${code}: ${stderr.slice(0, 500) || stdout.slice(0, 500)}`))
      }
      try {
        const json = JSON.parse(stdout)
        if (json.is_error) {
          return reject(new Error(json.result || 'claude_error'))
        }
        resolve((json.result || '').trim())
      } catch (e) {
        reject(new Error(`JSON 파싱 실패: ${e.message}. 원문: ${stdout.slice(0, 300)}`))
      }
    })
  })
}

app.get('/healthz', (_req, res) => res.json({ ok: true, model: MODEL }))

const adminGate = (req, res, next) => {
  const tok = req.header('x-fv-admin')
  if (!tok) return res.status(401).json({ error: 'missing_admin_header' })
  // 토큰 자체는 Supabase RPC가 검증함. 여기선 로컬 접근이 사실상 게이트.
  next()
}

app.post('/api/ai/today-summary', adminGate, async (req, res) => {
  try {
    const data = req.body || {}
    const prompt = `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 FutureVisor 랜딩 사이트 (futurevisor.co.kr — 기업 맞춤 자동화 시스템 구축 B2B 서비스)의 **오늘**(${data.dateLabel ?? '날짜 미상'} 한국시각, 현재 ${data.elapsedHours ?? '?'}시간 경과 / 24시간 중) 진행 중 트래픽 집계입니다.

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(현재 시각까지 방문자/PV/체류시간/바운스 + 어제 같은 시간대 대비가 데이터에 있으면 그 비교까지 한 문장)

### 지금까지의 시그널
- (오전/오후 어느 시간대에 유입이 몰렸는지)
- (어디서 와서, 어떤 페이지를 봤는지)
- (체류·바운스 품질)

### 남은 시간 액션
- (오늘 안에 시도할 수 있는 트래픽 부스팅 액션 1개)
- (지금 들어온 방문자 유형 기반의 후속 조치 1개)

오늘은 **진행 중인 부분 데이터**임을 분석에 명시적으로 반영하세요. 어제와 비교할 수 있으면 "어제 같은 시간대 대비 X%" 같은 표현을 사용. 데이터가 너무 적으면(예: PV 5 미만) "데이터 부족" 솔직히 적고 어떤 신호가 더 필요한지 말씀해주세요.

데이터:
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\``
    const md = await callClaude(prompt)
    res.json({ markdown: md })
  } catch (e) {
    console.error('[fv-ai] today-summary 에러:', e)
    res.status(500).json({ error: String(e?.message || e) })
  }
})

app.post('/api/ai/yesterday-summary', adminGate, async (req, res) => {
  try {
    const data = req.body || {}
    const prompt = `당신은 그로스 마케팅 데이터 분석가입니다. 아래는 FutureVisor 랜딩 사이트 (futurevisor.co.kr — 기업 맞춤 자동화 시스템 구축 B2B 서비스)의 어제(${data.dateLabel ?? '날짜 미상'} 한국시각) 트래픽 집계입니다.

다음 형식으로 마크다운, 한국어로 답해주세요:

### 한 줄 요약
(방문자/PV/체류시간/바운스 핵심 지표 한 문장)

### 인사이트
- (어디서 와서, 무엇을 보고, 얼마나 머물렀는지 1번)
- (2번)
- (3번)

### 액션 제안
- (유입 늘리기 위한 구체적 액션 1번)
- (2번)

데이터가 너무 적으면(예: PV 10 미만) "데이터 부족"이라 솔직히 적고, 어떤 시그널이 더 필요한지 짚어주세요. 절대 데이터 없는 사실을 지어내지 마세요.

데이터:
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\``
    const md = await callClaude(prompt)
    res.json({ markdown: md })
  } catch (e) {
    console.error('[fv-ai] yesterday-summary 에러:', e)
    res.status(500).json({ error: String(e?.message || e) })
  }
})

app.post('/api/ai/channel-compare', adminGate, async (req, res) => {
  try {
    const data = req.body || {}
    const prompt = `당신은 마케팅 채널 효율 분석가입니다. 아래는 FutureVisor 랜딩 사이트(B2B 기업 자동화 서비스, futurevisor.co.kr)의 유입 채널별 성과 집계입니다 — 기간: ${data.dateRange ?? '미상'}.

각 채널(Google, Naver, Daum/Kakao, Meta, X/Twitter, YouTube, LinkedIn, 직접/북마크, UTM 캠페인 등)을 다음 관점으로 비교 분석해 주세요:

### 채널별 한 줄 평가
- (채널명: 방문자 수 vs 평균 체류 vs 바운스율을 보고 한 줄 평가)
- 채널마다 한 줄씩, 데이터가 있는 채널만

### 효율 vs 양 진단
- "양은 많은데 질이 낮은" 채널과 "양은 적지만 질이 높은" 채널을 구분해 짚어주세요

### 다음 액션 (우선순위)
- (광고/콘텐츠 배분 제안 2-3가지, 구체적으로)

데이터가 한쪽으로 쏠려 있으면(예: 직접 유입만 99%) 솔직히 그 사실을 지적하고 다른 채널을 키울 출발점을 제안하세요. 데이터에 없는 채널을 지어내지 마세요.

데이터:
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\``
    const md = await callClaude(prompt)
    res.json({ markdown: md })
  } catch (e) {
    console.error('[fv-ai] channel-compare 에러:', e)
    res.status(500).json({ error: String(e?.message || e) })
  }
})

app.listen(PORT, () => {
  console.log(`[fv-ai] AI 분석 서버 → http://localhost:${PORT}  (model: ${MODEL})`)
  console.log(`[fv-ai] Claude Code OAuth 세션으로 인증. 별도 API 키 불필요.`)
})
