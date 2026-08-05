# AI Bedtime Stories for Adults — Product & Build Plan

**Goal:** แอป Android บน Google Play — สร้าง/ฟังนิทานก่อนนอนสำหรับผู้ใหญ่  
**Monetization:** Subscription **$2.99/month** (แนะนำเพิ่มรายปี $24.99 ≈ 2 เดือนฟรี)  
**Status:** Planning  
**Last updated:** 2026-08-05

---

## 1. Product thesis (1 ประโยค)

> แอปที่ช่วยคนวัยทำงาน “ปิดสมอง” ก่อนนอน ด้วยเรื่องสั้นที่ AI สร้างตามอารมณ์/ธีมที่เลือก — อ่านหรือฟังเสียงนุ่ม ๆ แล้วค่อย ๆ หลับ

### 1.1 “For Adults” หมายถึงอะไร (สำคัญมากสำหรับ Play Store)

| ความหมาย | แนะนำ? | เหตุผล |
|----------|--------|--------|
| **นิทาน/เรื่องสั้นสำหรับผู้ใหญ่** — โรแมนติก, thriller, cozy, sci‑fi, literary, soft sensual (ไม่โป๊) | ✅ ใช่ | ผ่านนโยบาย Play ได้ง่าย, ตลาดกว้าง |
| **เนื้อหา 18+ เชิงอีโรติกชัดเจน** | ❌ ไม่แนะนำเป็น core | เสี่ยง age-rating, จำกัดการกระจาย, แบนโฆษณา/discoverability |

**ตำแหน่งแบรนด์ที่แนะนำ:**  
**“Calm, literary bedtime stories for grown-ups — not for kids, not porn.”**

แนวเทียบเคียง: Calm / Headspace (sleep) + personalized AI story (Like Replika-lite แต่โฟกัสเรื่องสั้นก่อนนอน)

---

## 2. กลุ่มเป้าหมาย & JTBD

### 2.1 Primary persona
- อายุ 25–45, นอนดึกเพราะคิดมาก
- ชอบ podcast / audiobook / romance / thriller
- ยอมจ่าย $2–5/เดือนถ้าช่วยหลับจริงและไม่ซ้ำซาก

### 2.2 Jobs to be done
1. อยากได้เรื่องใหม่ทุกคืนโดยไม่ต้องเลือกนาน
2. อยากให้โทนเรื่อง “สงบลงเรื่อย ๆ” (ไม่ climax แรงตอนท้าย)
3. อยากฟังมือเปล่า (dark mode, timer, เสียงนุ่ม)
4. อยากปรับธีมตามอารมณ์ (lonely, cozy, mystery, soft romance…)

### 2.3 Non-goals (MVP)
- ไม่ใช่ chatbot แชทยาว
- ไม่ใช่ social / community
- ไม่ใช่ kids app
- ไม่ใช่ full novel writer

---

## 3. Value proposition & differentiation

| คู่แข่งโดยคร่าว | จุดอ่อนที่เราชนะได้ |
|------------------|----------------------|
| Calm / Headspace | เนื้อหาซ้ำ, ไม่ personalize มาก |
| AI story apps ทั่วไป | โทน “ตื่น” หรือเด็ก ๆ, ไม่ออกแบบมาให้หลับ |
| Kindle Unlimited / Audible | แพง/ยาว/ต้องเลือกเอง |

**USP 3 ข้อ:**
1. **Sleep-first story engine** — pacing ช้า, ลงท้ายสงบ, ความยาว 8–15 นาที
2. **Mood → story in 15 วินาที** (เลือก mood + length + voice)
3. **Adult tone** — ภาษาโต, อารมณ์ซับซ้อน, ไม่ lecture เด็ก

---

## 4. Feature scope

### 4.1 MVP (Ship ไป Play ได้ — เป้าหมาย 4–6 สัปดาห์)

| # | Feature | รายละเอียด |
|---|---------|------------|
| 1 | Onboarding | อายุ 18+ confirm, เลือกภาษา (EN ก่อน / TH เฟส 2), เลือก voice |
| 2 | Mood picker | 6–8 moods: Cozy · Soft Romance · Mystery · Nature · Sci‑fi calm · Grief/comfort · Adventure soft · Custom prompt |
| 3 | Generate story | AI สร้างเรื่อง ~800–1,500 คำ / 8–15 นาที |
| 4 | Reader | Dark theme, large type, progress, “wind down” font |
| 5 | TTS / Narration | เสียงนุ่ม (on-device TTS ก่อน หรือ cloud TTS premium) |
| 6 | Sleep timer | 10 / 15 / 20 / 30 นาที + fade out |
| 7 | Library | บันทึกเรื่องที่สร้าง, favorite, re-listen |
| 8 | Free tier limits | 1–2 เรื่อง/วัน หรือ 3 เรื่องแรกฟรี |
| 9 | Paywall | Subscription $2.99/mo + trial 3–7 วัน |
| 10 | Account | Google Sign-In (optional guest + device id) |

### 4.2 V1.1 (หลัง launch 2–4 สัปดาห์)
- Series / multi-chapter “คืนนี้ต่อจากคืนที่แล้ว”
- Background rain / fireplace mix
- Offline download ของเรื่องที่สร้างแล้ว
- Thai full support + เสียงไทย
- Share card (quote จากเรื่อง)

### 4.3 V2 (โมเดลโต)
- Voice cloning / premium narrators
- Couples mode (สองคนเลือก mood ร่วม)
- Widget “Tonight’s story”
- Wear OS / Android Auto (play only)
- Web companion (sync library)

---

## 5. UX flow หลัก (MVP)

```
Splash → Age gate (18+) → Mood home
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         Pick mood      Custom prompt    Continue last
              │               │               │
              └───────┬───────┘               │
                      ▼                       │
              Length + Voice                  │
                      │                       │
                      ▼                       │
              [Generate] ── loading ritual ───┘
                      │
                      ▼
              Story player (text + audio)
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
      Save       Sleep timer    Rate mood
         │
         ▼
   Paywall if free limit hit
```

**Ritual loading (สำคัญต่อ brand):**  
ไม่โชว์ spinner ธรรมดา — ข้อความสั้น ๆ “Dimming the lights…”, “Softening the ending…”, animation ช้า ๆ

---

## 6. Content & AI design

### 6.1 System prompt principles (sleep-first)
1. ภาษาผู้ใหญ่ ชัด อบอุ่น ไม่ประชดแรง
2. โครงสร้าง: setup ช้า → soft tension เบา → resolution สงบ → fade-out imagery
3. **ห้าม** cliffhanger แรง, jump scare, gore, explicit sex, self-harm instruction
4. จบด้วยภาพนิ่ง/ลมหายใจ/แสงไฟดับ
5. ความยาวตามพารามิเตอร์ (short/medium)

### 6.2 Safety layer (ต้องมี)
- Input filter: block illegal / extreme NSFW / minors
- Output filter: re-check ก่อนส่งให้ client
- Report story button
- Store content rating: **Mature 17+** (violence mild / sexual content *infrequent* ถ้ามี soft romance) — ตั้งค่าจริงตอนกรอก Play Console ตามเนื้อหาจริง

### 6.3 AI stack (แนะนำ)

```
Mobile App  →  Backend API (auth + quota + billing check)
                    │
                    ├─ LLM: SpaceXAI / xAI (api.x.ai)  model e.g. grok-4.5
                    │       (key อยู่ server เท่านั้น — ห้ามฝังใน APK)
                    │
                    ├─ TTS option A: Android system TTS (ฟรี, คุณภาพปานกลาง)
                    ├─ TTS option B: cloud TTS (ElevenLabs / Google Cloud) สำหรับ subscriber
                    │
                    └─ DB: stories, users, usage, subscription status
```

| ชั้น | เทคโนโลยีที่แนะนำ |
|------|-------------------|
| Mobile | **Kotlin + Jetpack Compose** (native Play-ready) *หรือ* Flutter ถ้าอยาก iOS ทีหลังเร็ว |
| Backend | **Node (Hono/Fastify) หรือ Python FastAPI** บน Railway / Fly / Cloud Run |
| Auth | Firebase Auth หรือ Clerk / Supabase Auth |
| DB | Postgres (Supabase / Neon) |
| Billing | **Google Play Billing Library 8+** (บังคับอัปเดตภายใน Aug 31, 2026) + (optional) RevenueCat |
| AI | Server-side `XAI_API_KEY` → `https://api.x.ai/v1` |
| Analytics | Firebase Analytics + Play Console + simple event: story_generated, paywall_view, subscribe |

**ทำไม backend จำเป็น:**  
- ซ่อน API key  
- คุม quota / cost  
- verify subscription กับ Google Play Developer API  
- log สำหรับ moderation

### 6.4 Cost model (คร่าว ๆ ต่อผู้ใช้ที่ active)

สมมติ 1 เรื่อง ≈ 1.2k tokens out + 0.5k in ≈ ~$0.01–0.05 ขึ้นกับ model  
TTS cloud ≈ $0.02–0.10 ต่อเรื่อง  

| รายการ | ประมาณ |
|--------|--------|
| AI cost / sub ที่ใช้หนัก (30 เรื่อง/เดือน) | $0.30–1.50 |
| Play fee ~15–30% of $2.99 | ~$0.45–0.90 |
| Infra fixed | $20–80/เดือน ช่วงแรก |
| **Gross margin เป้า** | 40–70% หลัง scale (คุม free tier + cache stories ยอดนิยม) |

**เทคนิคลดต้นทุน:**
- Cache / reuse template stories สำหรับ free users
- Stream generation + max tokens cap
- จำกัด custom prompt ความยาว
- Pre-generate “Tonight’s picks” ตอน off-peak

---

## 7. Monetization design

### 7.1 Products บน Play Console

| Product ID (ตัวอย่าง) | Type | Price |
|----------------------|------|-------|
| `premium_monthly` | Auto-renewing sub | **$2.99 / month** |
| `premium_yearly` (แนะนำ) | Auto-renewing sub | $24.99 / year |
| Base plan + offers | Free trial 3 or 7 days | $0 then $2.99 |

### 7.2 Free vs Premium

| | Free | Premium ($2.99/mo) |
|--|------|---------------------|
| Stories / day | 1 (หรือ 3 เรื่องแรก lifetime) | Unlimited (soft cap 20/day กัน abuse) |
| Moods | 3 basic | ทั้งหมด + custom |
| Voices | System TTS 1 เสียง | Premium voices + styles |
| Library | 5 stories | Unlimited + favorites |
| Sleep timer | 10 นาที | ทุกตัวเลือก |
| Ads | ไม่มี (รักษา mood) | — |
| Series continue | ❌ | ✅ |

**ไม่ใส่ interstitials ก่อนนอน** — ทำลาย product. ใช้ soft paywall แทน

### 7.3 Paywall copy (ตัวอย่าง)
- Headline: *Tonight’s story is waiting.*
- Body: *Unlimited calm stories, premium voices, sleep timer — less than a coffee.*
- CTA: *Start 7-day free trial*
- Subtext: *$2.99/month after · Cancel anytime*

### 7.4 Compliance billing
- ใช้ **Play Billing** สำหรับ digital content ในแอป (มาตรฐาน)
- แสดง manage subscription / cancel path ชัด (Play policy)
- Real-time developer notifications (RTDN) สำหรับ renew/cancel/grace
- Billing Library **v8+** (deadline Aug 31, 2026 สำหรับ app ใหม่/อัปเดต)

---

## 8. Google Play launch checklist

### 8.1 บัญชี & กฎหมาย
- [ ] Google Play Developer account ($25 one-time)
- [ ] ยืนยัน identity / organization ถ้าจำเป็น
- [ ] Privacy Policy URL (บังคับ — โฮสต์บน GitHub Pages / Notion / site)
- [ ] Terms of Service
- [ ] Data safety form (AI data, account, purchase)
- [ ] Content rating questionnaire (IARC)

### 8.2 Store listing
- [ ] App name (≤30): e.g. **Nightbound — AI Bedtime Stories**
- [ ] Short description (80 chars)
- [ ] Full description + keywords: bedtime stories adults, sleep stories, AI stories, calm romance…
- [ ] Icon 512, feature graphic 1024×500
- [ ] Screenshots  phone (อย่างน้อย 2, แนะนำ 6–8) — dark cozy UI
- [ ] Optional promo video 15–30s

### 8.3 Technical release
- [ ] `targetSdk` ตาม requirement ปัจจุบันของ Play
- [ ] App signing by Google Play
- [ ] Closed testing track → Open testing → Production
- [ ] Subscription products active **ก่อน** production (ไม่งั้นซื้อไม่ได้)
- [ ] License testers สำหรับ sandbox purchase

### 8.4 Policy risks ที่ต้องระวัง
- Misleading “AI will cure insomnia” → ใช้ภาษา *help you unwind*, ไม่ claim ทางการแพทย์
- User-generated / AI content → ต้องมี report + block
- ถ้ามี sensual content → เรตติ้งและคำอธิบายต้องตรงความจริง
- API keys ใน client = ห้าม

---

## 9. Architecture sketch

```
┌─────────────────────────────┐
│  Android App (Compose)      │
│  - UI / player / local cache│
│  - Play Billing Client      │
└─────────────┬───────────────┘
              │ HTTPS + Firebase Auth token
              ▼
┌─────────────────────────────┐
│  API Gateway / Backend      │
│  POST /stories/generate     │
│  GET  /stories              │
│  POST /billing/verify       │
│  GET  /entitlements         │
└──────┬──────────┬───────────┘
       │          │
       ▼          ▼
   Postgres    xAI API
   (users,     (story text)
    stories,
    usage)
       │
       ▼
  Play Developer API
  (subscription state)
       +
  optional TTS provider
```

### 9.1 ตารางข้อมูลหลัก
- `users` (id, auth_provider, created_at)
- `entitlements` (user_id, plan, expires_at, source=play)
- `stories` (id, user_id, mood, title, body, audio_url?, created_at)
- `usage_daily` (user_id, date, count)
- `reports` (story_id, reason)

---

## 10. Roadmap & timeline (solo / small team)

| สัปดาห์ | สิ่งที่ส่งมอบ |
|---------|----------------|
| **W0** | ตั้งชื่อ, brand moodboard, Privacy Policy draft, Play account |
| **W1** | App shell Compose + dark theme + mood UI mock + backend hello |
| **W2** | Generate story end-to-end (xAI) + reader + local library |
| **W3** | TTS + sleep timer + free quota |
| **W4** | Play Billing + paywall + verify server-side |
| **W5** | Polish, crash-free, store assets, closed test |
| **W6** | Open test feedback → production submit |

**Fast path (2–3 สัปดาห์):** ตัด custom prompt, ใช้ system TTS อย่างเดียว, guest-only + Play Billing, ภาษาอังกฤษอย่างเดียว

---

## 11. ชื่อแอป (ตัวเลือก)

| ชื่อ | โทน |
|------|-----|
| **Nightbound** | literary, premium |
| **Soft Ember** | cozy |
| **After Hours Stories** | adult, clear |
| **Dusk & Drift** | sleep |
| **Moonlit Chapter** | romance-friendly |
| **Lull — Stories for Grown-ups** | direct |

Package ตัวอย่าง: `com.yourstudio.nightbound`

---

## 12. KPI หลัง launch (90 วัน)

| Metric | เป้าช่วงแรก |
|--------|-------------|
| Install → trial start | ≥ 8–15% |
| Trial → paid | ≥ 30–40% |
| D1 retention | ≥ 25% |
| D7 retention | ≥ 10–15% |
| Stories / paid user / week | ≥ 3 |
| Refund / chargeback | ต่ำ |
| AI cost / paid user | < 30% of net revenue |

---

## 13. งบประมาณเริ่มต้น (ประมาณ)

| รายการ | ครั้งเดียว / เดือน |
|--------|---------------------|
| Play Developer | $25 once |
| Domain + Privacy page | $0–15 |
| Backend + DB | $0–25/mo (free tier ได้ช่วงแรก) |
| xAI API credits | $20–100 seed |
| TTS (ถ้าใช้ cloud) | pay-as-you-go |
| Design assets (ถ้าจ้าง) | $50–300 |
| **รวมเริ่ม** | **~$100–250** ก่อนมี user |

---

## 14. ความเสี่ยง & mitigation

| ความเสี่ยง | แก้ |
|------------|-----|
| AI cost พุ่งจาก abuse | quota, rate limit, captcha soft, device binding |
| เรื่องน่าเบื่อ/ซ้ำ | mood templates + temperature + “surprise me” + feedback |
| หลับไม่จริง / churn | A/B ความยาว, fade ending, ambient mix |
| Play reject | age gate, policy copy, no medical claims, proper rating |
| Key leak | server-only keys, Play App Check / attestation optional |

---

## 15. Decision log — LOCKED (2026-08-05)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Language (MVP) | **EN only** |
| 2 | Mobile stack | **React Native (Expo)** |
| 3 | Voice (MVP) | **System TTS** (`expo-speech`) |
| 4 | App name / package | **Nightbound** · `com.nightbound.app` |
| 5 | Adult scope | **Soft literary only** (no explicit/erotic) |

---

## 16. ขั้นตอนถัดไป

1. ~~ล็อก decision log~~ ✅  
2. ~~Scaffold RN Expo app~~ ✅ → `nightbound/`  
3. ~~Minimal backend `/v1/stories/generate` (xAI)~~ ✅ → `backend/`  
4. ~~Privacy Policy + Terms + Store listing pack~~ ✅ → `store/`  
5. Play Console subscription `premium_monthly` @ $2.99  
6. Host legal HTML on HTTPS + real support email  
7. Wire real Play Billing (replace dev premium toggle)  
8. Closed testing 5–10 คน  

---

## Appendix A — Sample story generation request (API)

```json
{
  "mood": "soft_romance",
  "length": "medium",
  "language": "en",
  "constraints": {
    "sleep_first": true,
    "no_cliffhanger": true,
    "max_words": 1200,
    "ending": "fade_to_rest"
  },
  "user_seed": "rainy city apartment, two neighbors, almost confession"
}
```

## Appendix B — Sample paywall economics

- 100 paid subs × $2.99 = $299 gross  
- Play fee 15% (หลัง year 1 บางกรณี) ≈ $45 → net ~$254  
- AI+infra สมมติ $80 → **~$174 profit / month** ที่ 100 subs  
- Break-even คร่าว ๆ: **~40–60 paid subs** (ขึ้นกับ free usage)

---

*เอกสารนี้เป็นแผนผลิตภัณฑ์/เทคนิค ไม่ใช่ code production — พร้อมแตกเป็น tasks implement เมื่อ lock decisions*
