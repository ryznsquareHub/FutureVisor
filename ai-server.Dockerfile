# FutureVisor 어드민 AI 분석 서버 — 컨테이너 이미지
#
# - Node 22 slim 베이스
# - claude CLI 전역 설치 (admin-ai-server.mjs가 child_process.spawn 으로 호출)
# - express + cors 만 설치 (scripts/ai-server.pkg.json — 프론트엔드 deps 제외)
# - 사용자의 ~/.claude 를 볼륨 마운트해 OAuth 세션 재사용 → 별도 API 키 불필요

FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Claude Code CLI 전역 설치 — admin-ai-server.mjs가 `claude` 바이너리를 spawn 함
RUN npm install -g @anthropic-ai/claude-code --no-audit --no-fund \
  && npm cache clean --force

# AI 서버 전용 최소 의존성 (express + cors) — react/vite/d3 등 프론트 deps 미포함
COPY scripts/ai-server.pkg.json ./package.json
RUN npm install --no-audit --no-fund --omit=dev \
  && npm cache clean --force

COPY scripts/admin-ai-server.mjs ./scripts/admin-ai-server.mjs

ENV NODE_ENV=production
ENV FV_AI_PORT=3001
EXPOSE 3001

# 컨테이너 안에서 HOME=/root → /root/.claude 로 자격증명 마운트됨
CMD ["node", "scripts/admin-ai-server.mjs"]
