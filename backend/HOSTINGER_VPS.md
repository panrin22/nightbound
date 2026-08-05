# Deploy Nightbound API on Hostinger VPS

Goal: public **HTTPS** API for the Android app / closed testing.

Example final URL:
```text
https://api.yourdomain.com
```
App env:
```text
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
```

**Never put API keys in the mobile app.** Only on the VPS `.env`.

---

## What you need from Hostinger

| Item | Where |
|------|--------|
| VPS IP | hPanel → VPS → overview |
| SSH user | often `root` |
| SSH password or key | hPanel |
| Domain (recommended) | any domain/subdomain pointed to VPS IP |

Create DNS **A record**:
```text
api.yourdomain.com  →  YOUR_VPS_IP
```
(Wait a few minutes for DNS.)

---

## 1) SSH into VPS

**Windows PowerShell:**
```powershell
ssh root@YOUR_VPS_IP
```

---

## 2) One-time server setup

```bash
# paste after SSH
curl -fsSL https://raw.githubusercontent.com/panrin22/nightbound/main/backend/deploy/setup-vps.sh | bash
```

Or manually:
```bash
apt update && apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm i -g pm2
```

---

## 3) Clone the repo

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/panrin22/nightbound.git
cd nightbound/backend
```

---

## 4) Create secrets (on server only)

```bash
cp .env.example .env
nano .env
```

Minimum (you already use Groq `gsk_…`):
```env
AI_PROVIDER=auto
# Prefer dedicated name:
GROQ_API_KEY=gsk_your_key_here
# or leave in XAI_API_KEY if gsk_ — auto-detect works

PORT=8787
HOST=127.0.0.1
# Strong random string for production:
API_SECRET=change-me-to-long-random
```

Save: `Ctrl+O` Enter, exit `Ctrl+X`.

---

## 5) Install, build, start with PM2

```bash
cd /var/www/nightbound/backend
npm install
npm install -D typescript tsx
npx tsc
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
# run the command pm2 prints (enables boot restart)
```

Check:
```bash
curl http://127.0.0.1:8787/health
# expect: {"ok":true,"aiConfigured":true,...}
```

---

## 6) Nginx reverse proxy

```bash
# edit domain first
nano /var/www/nightbound/backend/deploy/nginx-nightbound.conf
# change api.YOURDOMAIN.com → your real host

cp /var/www/nightbound/backend/deploy/nginx-nightbound.conf /etc/nginx/sites-available/nightbound-api
ln -sf /etc/nginx/sites-available/nightbound-api /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 7) Free HTTPS (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

Follow prompts (email, agree). Certbot rewrites nginx for HTTPS.

Test:
```bash
curl https://api.yourdomain.com/health
```

---

## 8) Point the Android app + rebuild AAB

On your PC `nightbound/.env` (local) and EAS:

```env
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
EXPO_PUBLIC_API_SECRET=same-as-API_SECRET-if-set
```

EAS production env (recommended):
```powershell
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound
eas env:create --name EXPO_PUBLIC_API_URL --value https://api.yourdomain.com --environment production --visibility plaintext
# if API_SECRET set on server:
eas env:create --name EXPO_PUBLIC_API_SECRET --value YOUR_SECRET --environment production --visibility sensitive
```

Rebuild for Play (version bumps automatically with remote source):
```powershell
eas build -p android --profile production --non-interactive
```

Upload new **.aab** to Closed testing (versionCode 2+).

---

## 9) Update code later

```bash
cd /var/www/nightbound
git pull
bash backend/deploy/deploy.sh
```

---

## Firewall (Hostinger + ufw)

Allow:
- 22 (SSH)
- 80 / 443 (HTTP/HTTPS)

**Do not** expose port `8787` publicly if nginx proxies it (bind to `127.0.0.1` — already in ecosystem).

In hPanel firewall, open 80/443 if Hostinger has an extra firewall panel.

---

## Security checklist

- [ ] `.env` only on server (never commit)
- [ ] `API_SECRET` set in production
- [ ] HTTPS works (`https://…/health`)
- [ ] Groq/xAI key not in mobile app
- [ ] `pm2 status` shows `nightbound-api` online
- [ ] Optional: fail2ban, disable password SSH (key only)

---

## Smoke test from your PC

```powershell
curl https://api.yourdomain.com/health
curl -X POST https://api.yourdomain.com/v1/stories/generate `
  -H "Content-Type: application/json" `
  -H "X-Nightbound-Key: YOUR_API_SECRET" `
  -d "{\"mood\":\"cozy\",\"length\":\"short\",\"language\":\"en\"}"
```

---

## If you only have IP (no domain yet)

Temporary (HTTP only — Android cleartext needed; not ideal for Play):

```text
http://YOUR_VPS_IP:8787
```

Better: add free subdomain from Hostinger and use HTTPS ASAP.

---

## What to send back so we can finish config

Reply with (no passwords/keys):

1. **VPS public IP** (optional)  
2. **Domain/subdomain** you will use, e.g. `api.nightbound.xxx`  
3. Whether you prefer **Groq** (current) or xAI  

Then we can fill exact nginx `server_name` and EAS env values.
