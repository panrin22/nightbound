# Nightbound API — your Hostinger VPS

| | |
|--|--|
| Host | `srv1163683.hstgr.cloud` |
| Plan | KVM 2 |
| IP | `72.61.210.115` |

**Do not paste SSH passwords or API keys into chat.**

---

## A) DNS (optional but better for HTTPS)

In Hostinger DNS (or hPanel → Domains):

| Type | Name | Points to |
|------|------|-----------|
| A | `@` or subdomain | `72.61.210.115` |

Quick options:

1. **Use Hostinger hostname (easiest first):**  
   `https://srv1163683.hstgr.cloud` after nginx + certbot  
2. **Custom subdomain:** e.g. `api.yourdomain.com` → A record → `72.61.210.115`

Until HTTPS works, temporary API for testing only:
```text
http://72.61.210.115:8787
```
(Android production prefers HTTPS.)

---

## B) SSH from your PC (PowerShell)

```powershell
ssh root@72.61.210.115
```

If Hostinger gave you a non-root user:
```powershell
ssh YOUR_USER@72.61.210.115
```

First login may ask to trust host key → type `yes`.

---

## C) Paste on the VPS (all-in-one bootstrap)

After SSH is open, paste this block:

```bash
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git nginx ufw

# Node 22
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw allow 8787/tcp || true
ufw --force enable || true

# App
mkdir -p /var/www
cd /var/www
if [ ! -d nightbound ]; then
  git clone https://github.com/panrin22/nightbound.git
fi
cd /var/www/nightbound
git pull origin main || true

cd /var/www/nightbound/backend
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo ">>> EDIT .env NOW: put GROQ_API_KEY=gsk_...  (or XAI_API_KEY)"
  echo ">>> nano /var/www/nightbound/backend/.env"
  echo ">>> Then re-run the install section below."
fi

# Install deps + build
npm install
npm install typescript tsx --save-dev
npx tsc

# Bind publicly for first test (later use 127.0.0.1 + nginx only)
# Edit .env: HOST=0.0.0.0  PORT=8787

# PM2
pm2 delete nightbound-api 2>/dev/null || true
# Prefer ecosystem; override HOST for first bring-up
HOST=0.0.0.0 PORT=8787 pm2 start dist/src/index.js --name nightbound-api
pm2 save
pm2 startup | tail -n 1
# Run the command that pm2 prints if shown

curl -sS http://127.0.0.1:8787/health || true
echo
echo "From browser or PC: curl http://72.61.210.115:8787/health"
```

### Edit secrets on server

```bash
nano /var/www/nightbound/backend/.env
```

Example:
```env
AI_PROVIDER=auto
GROQ_API_KEY=gsk_xxxxxxxx
PORT=8787
HOST=0.0.0.0
API_SECRET=
```

Restart:
```bash
cd /var/www/nightbound/backend
npx tsc
pm2 restart nightbound-api
```

### Test from your Windows PC

```powershell
curl http://72.61.210.115:8787/health
```

Expect something like:
```json
{"ok":true,"aiConfigured":true,"provider":"groq",...}
```

---

## D) Nginx + HTTPS (recommended)

Use hostname:

```bash
cat >/etc/nginx/sites-available/nightbound-api <<'EOF'
server {
    listen 80;
    server_name srv1163683.hstgr.cloud;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
}
EOF

ln -sf /etc/nginx/sites-available/nightbound-api /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Point API only on localhost after nginx works:
# In .env set HOST=127.0.0.1 and pm2 restart

apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d srv1163683.hstgr.cloud
```

Then test:
```bash
curl https://srv1163683.hstgr.cloud/health
```

App / EAS:
```env
EXPO_PUBLIC_API_URL=https://srv1163683.hstgr.cloud
```

---

## E) Rebuild AAB after API is live

On your PC:
```powershell
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound
# set production env on EAS or local .env:
# EXPO_PUBLIC_API_URL=https://srv1163683.hstgr.cloud

eas env:create --name EXPO_PUBLIC_API_URL --value https://srv1163683.hstgr.cloud --environment production --visibility plaintext
eas build -p android --profile production --non-interactive
```

Upload new AAB to Closed testing.

---

## F) Hostinger panel firewall

hPanel → VPS → Firewall (if present): allow **22, 80, 443**, and for first test **8787**.

---

## Checklist

- [ ] SSH `root@72.61.210.115` works
- [ ] `curl http://72.61.210.115:8787/health` → ok + aiConfigured true
- [ ] HTTPS `https://srv1163683.hstgr.cloud/health` works
- [ ] EAS rebuild with that URL
- [ ] New AAB on Play Closed testing
