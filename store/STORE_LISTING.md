# Nightbound — Google Play Store Listing Pack

**Package:** `com.nightbound.app`  
**Default language:** English (United States)  
**Category:** Health & Fitness *or* Lifestyle (pick one; Health & Fitness if sleep/unwind positioning; Lifestyle if story-first)  
**Recommendation:** **Lifestyle** (safer if avoiding medical claims)  
**Last updated:** 2026-08-05

---

## 1. App identity

| Field | Value |
|--------|--------|
| App name (≤30) | **Nightbound** |
| Optional longer | Nightbound: AI Bedtime Stories |
| Developer name | *(your legal / brand name)* |
| Contact email | support@nightbound.app *(replace with real inbox)* |
| Privacy Policy URL | `https://YOUR-DOMAIN/privacy-policy.html` |
| Terms URL (optional but good) | `https://YOUR-DOMAIN/terms.html` |

---

## 2. Short description (≤80 characters)

**Primary (79 chars):**
```
Soft literary AI bedtime stories for adults. Calm nights. Sleep-first endings.
```

**Alt A:**
```
AI bedtime stories for grown-ups—cozy, romance, mystery. Wind down gently.
```

**Alt B:**
```
Unwind with adult bedtime tales. Mood → story → soft voice. Not for kids.
```

---

## 3. Full description (copy-paste)

```
Nightbound is a calm space for adults who need help shutting the day off.

Pick a mood—Cozy, Soft Romance, Gentle Mystery, Nature, Literary, and more—and get an original soft literary story written for wind-down, not hype. Read in a dark, quiet interface or listen with your device’s system voice. A sleep timer lets the night take over when you’re ready.

WHY NIGHTBOUND
• Sleep-first storytelling — pacing slows; endings fade to rest (no cheap cliffhangers)
• Made for adults — literary tone, emotional nuance, never a kids’ app
• Soft literary only — tender, not explicit
• Fresh stories — AI-crafted for tonight’s mood
• Library & favorites — re-read or re-listen when you want the same quiet company
• Free to try — limited daily stories; Premium unlocks more moods and unlimited nights

PREMIUM
Nightbound Premium is an optional auto-renewing subscription (price shown in Google Play, e.g. $2.99/month where available). Cancel anytime in Google Play → Subscriptions.

IMPORTANT
Nightbound is entertainment for adults 18+. It is not a medical device and does not diagnose, treat, or cure insomnia or any condition. If you have sleep or health concerns, talk to a qualified professional.

Content is AI-generated and may vary. Soft literary guidelines apply—no graphic material.

Unwind. Dim the lights. Let the last page go soft.
```

**Character count:** ~1,350 (under Play’s 4000 limit)

---

## 4. ASO keywords (for description naturally; no separate keyword field on Play)

Use naturally in description / what’s new:

`bedtime stories adults` · `sleep stories` · `AI stories` · `calm romance` · `wind down` · `soft literary` · `night reading` · `sleep timer` · `adult audiobook short` · `cozy story`

**Do not claim:** “cures insomnia”, “clinical”, “doctor recommended” (unless true and allowed).

---

## 5. Graphics checklist

| Asset | Spec | Status |
|--------|------|--------|
| App icon | 512 × 512 PNG, 32-bit | Use branded night/amber mark (replace default Expo icon) |
| Feature graphic | 1024 × 500 | Dark sky + “Nightbound” + “Stories for grown-ups” |
| Phone screenshots | min 2, ideal 6–8 | See shot list below |
| Tablet (optional) | 7" / 10" | Later |
| Promo video (optional) | 30s YouTube | Mood picker → generating → reading → timer |

### Screenshot shot list (phone, dark UI)

1. **Hero** — Home moods grid + title “How should the night feel?”
2. **Age / brand** — Age gate or splash with “Stories for grown-ups”
3. **Generating** — Ritual loading (“Softening the ending…”)
4. **Reader** — Story text, large type, dark theme
5. **Listen** — TTS controls + sleep timer chips
6. **Library** — Saved stories list
7. **Paywall** — $2.99/mo benefits (no misleading “guarantee sleep”)
8. **Optional** — Settings / Premium badge

**Overlay captions (short):**
- “Mood → story in moments”
- “Soft literary. Adults only.”
- “Listen with system voice”
- “Ends gently. Sleep timer.”

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
| Targets children | **No** — 18+ |

**Expected band:** often **Teen** or **Mature 17+** depending on romance wording—prefer questionnaire answers that match *no explicit sex*.  
In store: note “Not designed for children.”

Age gate in app already asks 18+.

---

## 7. Data safety form (Play Console — draft answers)

Update if you add Firebase/analytics later.

| Data type | Collected? | Shared? | Purpose |
|-----------|------------|---------|---------|
| App interactions | Yes (usage events if analytics on) | No* | Analytics / app functionality |
| Crash logs | Yes (if enabled) | With crash vendor | Stability |
| Device IDs | Possibly (for limits / fraud) | No* | App functionality, fraud prevention |
| Purchase history | Yes (via Play) | Google processes payment | App functionality |
| User-generated content | Story text / optional seeds | Processed by AI provider to generate stories | App functionality |
| Account info | Only if sign-in added | Provider as needed | Account management |
| Approximate location | No | — | — |
| Precise location | No | — | — |
| Photos / contacts / mic | No | — | — |

\* “Shared” = sold or transferred for advertising; processing by **service providers** (hosting, AI API) is typically declared as “Data is processed by…” / service providers—not “sold.”

**Security practices:**
- [x] Data encrypted in transit (HTTPS)
- [ ] Users can request deletion (email privacy@…) — offer process
- [ ] Committed to Play Families Policy — **N/A** (not for kids)

**Sensitive permissions:** none required for MVP (no mic if system TTS only).

---

## 8. Ads

**Contains ads:** No (recommended for sleep product)

---

## 9. App access / login

MVP: no mandatory login → “All functionality available without special access”  
If you add account-only features later, provide demo credentials for reviewers.

---

## 10. News / COVID / other declarations

Generally **No** for news, COVID contact tracing, etc.

---

## 11. Store presence — “What’s new” (v1.0)

```
First release of Nightbound
• Mood-based soft literary bedtime stories for adults
• System voice playback & sleep timer
• Personal library
• Optional Nightbound Premium
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
3. Enable Pages → HTTPS URL
4. Paste URL into Play Console

**Netlify Drop / Cloudflare Pages**
- Drag the `store/` folder → get HTTPS URL

**Replace before go-live**
- `privacy@nightbound.app` / `support@nightbound.app` → real email you monitor
- Optional: governing law in Terms §13

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

Billing declaration: digital content → Play Billing when live.

---

## 14. Pre-submission checklist

- [ ] Privacy Policy live on **HTTPS**
- [ ] Terms live on HTTPS
- [ ] Real support email works
- [ ] Icon 512 + feature graphic 1024×500
- [ ] ≥6 screenshots (phone)
- [ ] Short + full description pasted
- [ ] Data safety form filled
- [ ] Content rating questionnaire completed
- [ ] Target audience: **18+** / not for children
- [ ] No medical claims in listing or in-app
- [ ] Closed testing track tested install + generate + subscribe (when billing ready)
- [ ] App access: no login required for MVP review

---

## 15. Listing tone rules (brand)

| Do | Don’t |
|----|--------|
| “Unwind”, “wind down”, “calm”, “soft literary” | “Cure insomnia”, “clinically proven sleep” |
| “For adults / grown-ups” | Target kids or “family bedtime” as primary |
| “AI-generated stories may vary” | Promise perfect unique masterpieces every time |
| “Cancel anytime in Google Play” | Hide subscription terms |

---

*Files live under `ai-bedtime-stories/store/`. Open HTML in a browser to preview.*
