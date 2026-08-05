#!/usr/bin/env bash
# Run ONCE on a fresh Ubuntu Hostinger VPS as root (or sudo).
# Usage: bash setup-vps.sh
set -euo pipefail

echo "==> Nightbound API VPS bootstrap (Ubuntu)"

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git nginx ufw

# Node 22 LTS
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

npm install -g pm2

# Firewall: SSH + HTTP + HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable || true

echo "==> Node $(node -v) npm $(npm -v)"
echo "==> Done base setup. Next: clone repo, copy .env, pm2 start, certbot."
