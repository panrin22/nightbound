# Nightbound โ€” Google Play Store Listing Pack

**Package:** `com.nightbound.app`  
**Default language:** English (United States)  
**Category:** Health & Fitness *or* Lifestyle (pick one; Health & Fitness if sleep/unwind positioning; Lifestyle if story-first)  
**Recommendation:** **Lifestyle** (safer if avoiding medical claims)  
**Last updated:** 2026-08-05

---

## 1. App identity

| Field | Value |
|--------|--------|
| App name (โค30) | **Nightbound** |
| Optional longer | Nightbound: AI Bedtime Stories |
| Developer name | *(your legal / brand name)* |
| Contact email | rinpan@yahoo.com |
| Privacy Policy URL | `https://YOUR-DOMAIN/privacy-policy.html` |
| Terms URL (optional but good) | `https://YOUR-DOMAIN/terms.html` |

---

## 2. Short description (โค80 characters)

**Primary (79 chars):**
```
Soft literary AI bedtime stories for adults. Calm nights. Sleep-first endings.
```

**Alt A:**
```
AI bedtime stories for grown-upsโ€”cozy, romance, mystery. Wind down gently.
```

**Alt B:**
```
Unwind with adult bedtime tales. Mood โ’ story โ’ soft voice. Not for kids.
```

---

## 3. Full description (copy-paste)

```
Nightbound is a calm space for adults who need help shutting the day off.

Pick a moodโ€”Cozy, Soft Romance, Gentle Mystery, Nature, Literary, and moreโ€”and get an original soft literary story written for wind-down, not hype. Read in a dark, quiet interface or listen with your deviceโ€s system voice. A sleep timer lets the night take over when youโ€re ready.

WHY NIGHTBOUND
โ€ข Sleep-first storytelling โ€” pacing slows; endings fade to rest (no cheap cliffhangers)
โ€ข Made for adults โ€” literary tone, emotional nuance, never a kidsโ€ app
โ€ข Soft literary only โ€” tender, not explicit
โ€ข Fresh stories โ€” AI-crafted for tonightโ€s mood
โ€ข Library & favorites โ€” re-read or re-listen when you want the same quiet company
โ€ข Free to try โ€” limited daily stories; Premium unlocks more moods and unlimited nights

PREMIUM
Nightbound Premium is an optional auto-renewing subscription (price shown in Google Play, e.g. $2.99/month where available). Cancel anytime in Google Play โ’ Subscriptions.

IMPORTANT
Nightbound is entertainment for adults 18+. It is not a medical device and does not diagnose, treat, or cure insomnia or any condition. If you have sleep or health concerns, talk to a qualified professional.

Content is AI-generated and may vary. Soft literary guidelines applyโ€”no graphic material.

Unwind. Dim the lights. Let the last page go soft.
```

**Character count:** ~1,350 (under Playโ€s 4000 limit)

---

## 4. ASO keywords (for description naturally; no separate keyword field on Play)

Use naturally in description / whatโ€s new:

`bedtime stories adults` ยท `sleep stories` ยท `AI stories` ยท `calm romance` ยท `wind down` ยท `soft literary` ยท `night reading` ยท `sleep timer` ยท `adult audiobook short` ยท `cozy story`

**Do not claim:** โ€cures insomniaโ€, โ€clinicalโ€, โ€doctor recommendedโ€ (unless true and allowed).

---

## 5. Graphics checklist

| Asset | Spec | Status |
|--------|------|--------|
| App icon | 512 ร— 512 PNG, 32-bit | Use branded night/amber mark (replace default Expo icon) |
| Feature graphic | 1024 ร— 500 | Dark sky + โ€Nightboundโ€ + โ€Stories for grown-upsโ€ |
| Phone screenshots | min 2, ideal 6โ€“8 | See shot list below |
| Tablet (optional) | 7" / 10" | Later |
| Promo video (optional) | 30s YouTube | Mood picker โ’ generating โ’ reading โ’ timer |

### Screenshot shot list (phone, dark UI)

1. **Hero** โ€” Home moods grid + title โ€How should the night feel?โ€
2. **Age / brand** โ€” Age gate or splash with โ€Stories for grown-upsโ€
3. **Generating** โ€” Ritual loading (โ€Softening the endingโ€ฆโ€)
4. **Reader** โ€” Story text, large type, dark theme
5. **Listen** โ€” TTS controls + sleep timer chips
6. **Library** โ€” Saved stories list
7. **Paywall** โ€” $2.99/mo benefits (no misleading โ€guarantee sleepโ€)
8. **Optional** โ€” Settings / Premium badge

**Overlay captions (short):**
- โ€Mood โ’ story in momentsโ€
- โ€Soft literary. Adults only.โ€
- โ€Listen with system voiceโ€
- โ€Ends gently. Sleep timer.โ€

---

## 6. Content rating (IARC questionnaire guidance)

Answer honestly for **soft literary adult stories, non-explicit**:

| Topic | Suggested direction |
|--------|---------------------|
| Violence | None / infrequent mild fictional |
| Sexual content | None or mild/infrequent romantic themes (no nudity/sex acts) |
| Language | Infrequent mild if any |
| Controlled substances | None |
| User interaction | No social UGC feed; AI text generation + report path |
| Shares location | No |
| Targets children | **No** โ€” 18+ |

**Expected band:** often **Teen** or **Mature 17+** depending on romance wordingโ€”prefer questionnaire answers that match *no explicit sex*.  
In store: note โ€Not designed for children.โ€

Age gate in app already asks 18+.

---

## 7. Data safety form (Play Console โ€” draft answers)

Update if you add Firebase/analytics later.

| Data type | Collected? | Shared? | Purpose |
|-----------|------------|---------|---------|
| App interactions | Yes (usage events if analytics on) | No* | Analytics / app functionality |
| Crash logs | Yes (if enabled) | With crash vendor | Stability |
| Device IDs | Possibly (for limits / fraud) | No* | App functionality, fraud prevention |
| Purchase history | Yes (via Play) | Google processes payment | App functionality |
| User-generated content | Story text / optional seeds | Processed by AI provider to generate stories | App functionality |
| Account info | Only if sign-in added | Provider as needed | Account management |
| Approximate location | No | โ€” | โ€” |
| Precise location | No | โ€” | โ€” |
| Photos / contacts / mic | No | โ€” | โ€” |

\* โ€Sharedโ€ = sold or transferred for advertising; processing by **service providers** (hosting, AI API) is typically declared as โ€Data is processed byโ€ฆโ€ / service providersโ€”not โ€sold.โ€

**Security practices:**
- [x] Data encrypted in transit (HTTPS)
- [ ] Users can request deletion (email privacy@โ€ฆ) โ€” offer process
- [ ] Committed to Play Families Policy โ€” **N/A** (not for kids)

**Sensitive permissions:** none required for MVP (no mic if system TTS only).

---

## 8. Ads

**Contains ads:** No (recommended for sleep product)

---

## 9. App access / login

MVP: no mandatory login โ’ โ€All functionality available without special accessโ€  
If you add account-only features later, provide demo credentials for reviewers.

---

## 10. News / COVID / other declarations

Generally **No** for news, COVID contact tracing, etc.

---

## 11. Store presence โ€” โ€Whatโ€s newโ€ (v1.0)

```
First release of Nightbound
โ€ข Mood-based soft literary bedtime stories for adults
โ€ข System voice playback & sleep timer
โ€ข Personal library
โ€ข Optional Nightbound Premium
```

---

## 12. Support & legal links (must work before review)

| Link | File in repo |
|------|----------------|
| Privacy Policy | `store/privacy-policy.html` |
| Terms of Service | `store/terms.html` |

### Host quickly (pick one)

**GitHub Pages**
1. Create public repo `nightbound-legal` (or use project site)
2. Put `privacy-policy.html` + `terms.html` in `/docs` or root
3. Enable Pages โ’ HTTPS URL
4. Paste URL into Play Console

**Netlify Drop / Cloudflare Pages**
- Drag the `store/` folder โ’ get HTTPS URL

**Replace before go-live**
- `rinpan@yahoo.com` / `rinpan@yahoo.com` โ’ real email you monitor
- Optional: governing law in Terms ยง13

---

## 13. Subscription product (for Console, when billing ships)

| Field | Value |
|--------|--------|
| Product ID | `premium_monthly` |
| Name | Nightbound Premium Monthly |
| Description | Unlimited calm stories, all moods, sleep timer & library extras |
| Base plan | Auto-renewing monthly |
| Price | **USD 2.99** (localize others) |
| Free trial | 3 or 7 days (recommended) |
| Grace period | Use Play defaults |
| Yearly (optional) | `premium_yearly` @ $24.99 |

Billing declaration: digital content โ’ Play Billing when live.

---

## 14. Pre-submission checklist

- [ ] Privacy Policy live on **HTTPS**
- [ ] Terms live on HTTPS
- [ ] Real support email works
- [ ] Icon 512 + feature graphic 1024ร—500
- [ ] โฅ6 screenshots (phone)
- [ ] Short + full description pasted
- [ ] Data safety form filled
- [ ] Content rating questionnaire completed
- [ ] Target audience: **18+** / not for children
- [ ] No medical claims in listing or in-app
- [ ] Closed testing track tested install + generate + subscribe (when billing ready)
- [ ] App access: no login required for MVP review

---

## 15. Listing tone rules (brand)

| Do | Donโ€t |
|----|--------|
| โ€Unwindโ€, โ€wind downโ€, โ€calmโ€, โ€soft literaryโ€ | โ€Cure insomniaโ€, โ€clinically proven sleepโ€ |
| โ€For adults / grown-upsโ€ | Target kids or โ€family bedtimeโ€ as primary |
| โ€AI-generated stories may varyโ€ | Promise perfect unique masterpieces every time |
| โ€Cancel anytime in Google Playโ€ | Hide subscription terms |

---

*Files live under `ai-bedtime-stories/store/`. Open HTML in a browser to preview.*
