# Nightbound

**Soft literary AI bedtime stories for adults.**  
React Native (Expo) · AI backend · Google Play target **$2.99/mo** subscription.

| Path | What |
|------|------|
| [`nightbound/`](./nightbound/) | Expo app (`com.nightbound.app`) |
| [`backend/`](./backend/) | Story API (Groq / xAI) |
| [`store/`](./store/) | Privacy Policy, Terms, Play listing copy |
| [`PLAN.md`](./PLAN.md) | Product & build plan |
| [`STATUS.md`](./STATUS.md) | **สรุปสถานะปัจจุบัน** (ทำแล้ว / เหลือ / URL) |

## Quick start

### Backend
```bash
cd backend
cp .env.example .env   # set GROQ_API_KEY (gsk_…) or XAI_API_KEY (xai-…)
npm install
npm run dev            # http://127.0.0.1:8787
```

**Production on Hostinger VPS:** see [`backend/HOSTINGER_VPS.md`](./backend/HOSTINGER_VPS.md)

### Mobile app
```bash
cd nightbound
cp .env.example .env   # EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8787
npm install
npx expo start -c
```

## Legal & shipping (Play Store)

- Privacy: [`store/privacy-policy.html`](./store/privacy-policy.html)
- Terms: [`store/terms.html`](./store/terms.html)
- Listing pack: [`store/STORE_LISTING.md`](./store/STORE_LISTING.md)
- **Graphics + EAS Build:** [`store/GRAPHICS_AND_EAS.md`](./store/GRAPHICS_AND_EAS.md)

Host `docs/*.html` on GitHub Pages before Play review.

## Decisions (MVP)

- Language: **English**
- Stack: **React Native (Expo)**
- Voice: **System TTS**
- Name: **Nightbound**
- Content: **Soft literary only** (not for kids, not explicit)

## License

Private / all rights reserved unless otherwise stated.
