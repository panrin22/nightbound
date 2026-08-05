# Nightbound — Graphics checklist + EAS Build guide

Contact: **rinpan@yahoo.com**  
Package: `com.nightbound.app`  
Repo: https://github.com/panrin22/nightbound  

---

## Part A — Store graphics checklist

Put finished files in:

```
store/assets/
  icon-512.png
  feature-graphic-1024x500.png
  screenshots/
    01-home.png
    02-age-gate.png
    03-generating.png
    04-reader.png
    05-listen-timer.png
    06-library.png
    07-paywall.png
    08-settings.png   (optional)
```

Also copy icon into the Expo app:

```
nightbound/assets/images/icon.png          ← 1024×1024 preferred for Expo
nightbound/assets/images/android-icon-*.png
nightbound/assets/images/splash-icon.png
```

### A1. Required by Google Play

| # | Asset | Size | Format | Status |
|---|--------|------|--------|--------|
| 1 | **App icon** | **512 × 512** | PNG 32-bit, no alpha *required for Play store listing icon* | ☐ |
| 2 | **Feature graphic** | **1024 × 500** | PNG or JPEG | ☐ |
| 3 | **Phone screenshots** | min **2**, ideal **6–8** | PNG/JPEG | ☐ |

**Phone screenshot size (pick one and stick to it):**
- Common: **1080 × 1920** (9:16) or **1080 × 2340**
- Play accepts various; keep same aspect for all

### A2. Brand look (Nightbound)

| Token | Value |
|--------|--------|
| Background | `#0B0D12` |
| Card | `#1A1F2B` |
| Text | `#E8E4DC` |
| Accent (amber) | `#C4A574` |
| Mood | calm, literary, night, not childish, not neon |

**Icon idea:** crescent / soft lamp / open book silhouette in amber on near-black.  
No tiny text. Readable at 48px.

**Feature graphic idea:**
- Left: wordmark **Nightbound**
- Right: soft moon / bedroom lamp glow
- Subtitle: *Soft literary stories for grown-ups*
- No medical claims (“cure insomnia”)

### A3. Screenshot shot list (capture order)

| # | Screen | Overlay caption (optional) |
|---|--------|----------------------------|
| 01 | Home moods | *Mood → story in moments* |
| 02 | Age gate | *Stories for grown-ups · 18+* |
| 03 | Generating ritual | *Softening the ending…* |
| 04 | Story reader | *Soft literary. Calm endings.* |
| 05 | Listen + sleep timer | *System voice · sleep timer* |
| 06 | Library | *Revisit quiet nights* |
| 07 | Paywall $2.99 | *Premium · cancel anytime* |
| 08 | Settings (opt) | *AI backend · plan* |

**How to capture (easiest):**
1. Run app on phone or emulator  
2. Android: Power + Volume Down  
3. Or Expo web + browser full-page (less ideal for Play)  
4. Optional: add caption bar in Figma/Canva (dark frame + amber text)

### A4. Optional assets

| Asset | When |
|--------|------|
| 7" / 10" tablet screenshots | Later |
| 15–30s promo video (YouTube) | After MVP polish |
| Promo graphic 180×120 | Optional old field |

### A5. Graphics done when…

- [ ] Icon 512 uploaded in Play Console  
- [ ] Feature graphic 1024×500 uploaded  
- [ ] ≥6 phone screenshots uploaded  
- [ ] Same assets used in `nightbound/assets/images/` for the build  
- [ ] No kid-cartoon style, no “medical sleep guarantee” text  

---

## Part B — EAS Build (Android AAB for Play)

### B1. One-time accounts

| Account | Action |
|---------|--------|
| [Expo](https://expo.dev) | Sign up (can use GitHub) |
| [Google Play Console](https://play.google.com/console) | $25 one-time developer fee |
| GitHub | repo already: panrin22/nightbound |

### B2. Install tools (PC)

```powershell
# Node already required
npm install -g eas-cli
eas login
```

### B3. Configure project (in `nightbound/`)

```powershell
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound
eas build:configure
```

This creates/links `eas.json` and sets `extra.eas.projectId` in `app.json`.

**Already prepared:** `eas.json` in this repo (see below). After `eas build:configure`, confirm `projectId` is a real UUID (not `replace-before-eas-build`).

### B4. App version fields

In `app.json` / `app.config`:

| Field | Example | When to bump |
|--------|---------|----------------|
| `version` | `1.0.0` | User-visible |
| `android.versionCode` | `1` | **Every** Play upload (+1) |
| `android.package` | `com.nightbound.app` | Never change after first publish |

### B5. Production vs cleartext

For **store release**, prefer:

- Backend on **HTTPS** (Railway / Fly / etc.)  
- `usesCleartextTraffic: false` (or remove)  
- `EXPO_PUBLIC_API_URL=https://your-api.example.com`

Local HTTP is fine for Expo Go only.

### B6. Build commands

```powershell
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound

# Production Android App Bundle (what Play wants)
eas build -p android --profile production

# Internal test APK (optional, easier sideload)
eas build -p android --profile preview
```

Wait for Expo cloud build → download **.aab** from expo.dev builds page.

### B7. First upload to Play Console

1. Create app **Nightbound**  
2. Dashboard → **Release** → **Testing** → **Closed testing** (recommended first)  
3. Create release → upload **.aab**  
4. Fill:
   - Privacy policy URL (GitHub Pages)  
   - Short / full description (`STORE_LISTING.md`)  
   - Graphics (Part A)  
   - Content rating  
   - Data safety  
   - Target audience **18+** / not for children  
5. Add ≥ email testers (use `rinpan@yahoo.com` + friends)  
6. Roll out closed test → install via Play opt-in link  

### B8. Subscription product (before/with billing code)

Play Console → Monetize → Products → Subscriptions:

| Field | Value |
|--------|--------|
| Product ID | `premium_monthly` |
| Name | Nightbound Premium |
| Base plan | Monthly |
| Price | **USD 2.99** (and local prices) |
| Free trial | 3 or 7 days (optional) |

Billing code in app is still **TODO** — product can exist in Console first.

### B9. Production release

After closed test OK:

1. Promote release to **Production** (or create production release with same AAB)  
2. Countries / pricing  
3. Submit for review  

---

## Part C — Master shipping checklist

### Legal & Console text
- [ ] Repo **Public**  
- [ ] GitHub Pages `/docs` live  
- [ ] Privacy: `https://panrin22.github.io/nightbound/privacy-policy.html`  
- [ ] Terms URL optional but good  
- [ ] Contact **rinpan@yahoo.com**  
- [ ] Short + full description pasted from `STORE_LISTING.md`  

### Graphics
- [ ] Icon 512  
- [ ] Feature 1024×500  
- [ ] 6–8 screenshots  
- [ ] Icons copied into Expo `assets/images`  

### App quality
- [ ] Expo Go / device: generate story works  
- [ ] TTS + timer work  
- [ ] Age gate 18+  
- [ ] No crash on cold start  
- [ ] Production API URL on HTTPS (for store build)  

### Build
- [ ] `eas login` + project linked  
- [ ] `versionCode` set  
- [ ] `eas build -p android --profile production` succeeds  
- [ ] AAB downloaded  

### Play
- [ ] Closed testing track live  
- [ ] Data safety filled  
- [ ] Content rating done  
- [ ] Subscription product created (even if code later)  
- [ ] Production submit  

---

## Part D — Suggested week plan

| Day | Focus |
|-----|--------|
| 1 | Public + Pages + Privacy URL |
| 2 | Capture screenshots + icon/feature in Canva |
| 3 | `eas build:configure` + first **preview** APK |
| 4 | Fix crash/API for release; production AAB |
| 5 | Closed testing upload + listing graphics |
| 6–7 | Tester feedback; bump versionCode; re-upload |

---

## Part E — Common errors

| Error | Fix |
|--------|-----|
| `projectId` invalid | Run `eas build:configure` / `eas init` |
| Package name taken | Change `com.nightbound.app` **before** first publish only |
| Cleartext / network fail | Use HTTPS API in production profile |
| versionCode 1 already used | Increment `android.versionCode` |
| Expo Go works, AAB doesn’t | Check env vars: set in `eas.json` `env` or EAS secrets |
| Play rejects medical claim | Remove “cure insomnia” from listing & UI |

### EAS secrets (for production API URL)

```powershell
eas secret:create --name EXPO_PUBLIC_API_URL --value https://YOUR-API --scope project
```

Or set under `eas.json` → `build.production.env` (non-secret URL is fine in git).

---

## Quick commands cheat sheet

```powershell
# App
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound
npx expo start -c

# EAS
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile production
eas build:list

# Backend (local)
cd C:\Users\tawat\grokwork\ai-bedtime-stories\backend
npm run dev
```

---

*When graphics files exist, drop them in `store/assets/` and commit (no secrets). Build artifacts (.aab) stay on Expo/Play — do not commit large binaries.*
