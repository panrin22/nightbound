#!/usr/bin/env bash
# Deploy / update Nightbound API on VPS.
# Run from repo root on the server, e.g.:
#   cd /var/www/nightbound && bash backend/deploy/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT/backend"

if [[ ! -f .env ]]; then
  echo "Missing backend/.env — copy from .env.example and set GROQ_API_KEY or XAI_API_KEY"
  exit 1
fi

echo "==> npm ci"
npm ci --omit=dev || npm install --omit=dev
npm install typescript tsx --no-save 2>/dev/null || true

echo "==> build"
npx tsc

echo "==> pm2 restart"
if pm2 describe nightbound-api >/dev/null 2>&1; then
  pm2 restart nightbound-api
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

echo "==> health"
sleep 1
curl -sS "http://127.0.0.1:8787/health" || true
echo
echo "==> Deploy done"
