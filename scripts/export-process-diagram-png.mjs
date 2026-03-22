/**
 * Figma REST API로 프로세스 다이어그램(노드 1188:582)을 PNG로 받아 public/assets/process-flow.png 로 저장합니다.
 *
 * 사용 전: https://www.figma.com/developers/api#access-tokens 에서 Personal access token 발급
 *
 *   PowerShell:
 *   $env:FIGMA_ACCESS_TOKEN="figd_xxxxxxxx"
 *   node scripts/export-process-diagram-png.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outPath = path.join(root, 'public', 'assets', 'process-flow.png')

const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN
const fileKey = 'hf1fGyJXjIGg6IdWwFvaRt'
const nodeId = '1188:582'
const scale = 2

if (!token) {
  console.error('[export-process-diagram-png] FIGMA_ACCESS_TOKEN 이 없습니다.')
  process.exit(1)
}

const metaUrl = new URL(`https://api.figma.com/v1/images/${fileKey}`)
metaUrl.searchParams.set('ids', nodeId)
metaUrl.searchParams.set('format', 'png')
metaUrl.searchParams.set('scale', String(scale))

const metaRes = await fetch(metaUrl, { headers: { 'X-Figma-Token': token } })
if (!metaRes.ok) {
  console.error(await metaRes.text())
  process.exit(1)
}
const meta = await metaRes.json()
const imageUrl = meta.images?.[nodeId] ?? Object.values(meta.images ?? {})[0]
if (!imageUrl) {
  console.error('[export-process-diagram-png] 이미지 URL 없음:', meta)
  process.exit(1)
}

const imgRes = await fetch(imageUrl)
if (!imgRes.ok) {
  console.error('[export-process-diagram-png] PNG 다운로드 실패', imgRes.status)
  process.exit(1)
}

const buf = Buffer.from(await imgRes.arrayBuffer())
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, buf)
console.log('[export-process-diagram-png] 저장:', outPath, `(${(buf.length / 1024).toFixed(1)} KB)`)
