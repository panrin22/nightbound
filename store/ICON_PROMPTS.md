# Nightbound — App icon prompts

**Use for:** Midjourney / DALL·E / Ideogram / Gemini / Canva AI / Imagine  
**Output needed:** square **1:1** → export **512×512 PNG** (Play) + **1024×1024** (Expo `icon.png`)  
**Brand colors:** bg `#0B0D12` · accent `#C4A574` · soft text `#E8E4DC`

---

## Design rules (read before generating)

1. **Simple silhouette** — must read at 48px (phone home screen).  
2. **No tiny text** inside the icon (words get mushy). Wordmark goes on feature graphic only.  
3. **No faces of real people**, no kids, no cartoon “bedtime for children.”  
4. **Adult literary calm** — elegant, quiet luxury, not neon cyberpunk.  
5. **Safe zone:** main symbol in center 70%; edges can be solid dark for adaptive icon.  
6. **Flat or soft 3D** — avoid busy photo backgrounds.

**Negative / avoid (if tool supports):**  
text, watermark, logo letters, busy clutter, neon pink, childish cartoon, anime mascot, horror, blood, explicit, bright white background, stock photo bedroom.

---

## Master prompt (primary — recommended)

```
App icon design for "Nightbound", a soft literary AI bedtime stories app for adults. Centered simple symbol: a thin elegant golden-amber crescent moon gently holding a tiny open book, both glowing softly. Deep near-black background (#0B0D12). Accent color warm antique gold / amber (#C4A574). Minimal, premium, calm, literary. Flat vector-like style with subtle soft glow, high contrast silhouette, generous padding, no text, no watermark, square composition, centered, mobile app icon.
```

**Aspect:** `1:1`  
**Export:** 1024×1024 → resize to 512×512 for Play listing

---

## Variation A — Crescent lamp (cozy)

```
Mobile app icon, square. A single soft amber oil-lamp flame shaped like a crescent, floating on deep charcoal black. Subtle gold rim light, minimal elegant design for a bedtime stories app for grown-ups. Premium calm mood, vector flat with soft gradient, no text, no people, centered symbol, lots of negative space.
```

---

## Variation B — Moon + page curl (literary)

```
Square app icon. Abstract soft gold crescent moon overlapping a single curled parchment page corner, deep black background, warm amber highlights. Soft literary adult brand, refined and quiet, modern minimal logo mark, flat design with gentle shadow, no letters, no clutter, centered.
```

---

## Variation C — Night window (story mood)

```
App icon mark: a small rounded-square window glowing warm amber light in a vast dark night field, tiny star points, soft gold frame. Suggests quiet evening reading. Minimal geometric style, adult premium sleep-story brand, no text, high readability at small size, pure black background.
```

---

## Variation D — Abstract “N” monogram (only if clean)

```
Abstract monogram icon: letter N formed from a crescent and a vertical book spine, amber gold on near-black, extremely simplified geometric logo, luxury literary brand, no extra decoration, no serifs that break at small size, square app icon, centered.
```

Use D only if the monogram stays readable at 48px; otherwise prefer A/B.

---

## Adaptive icon layers (Android)

Generate **two** images for Expo adaptive icon:

### Foreground (transparent-friendly subject)

```
App icon foreground layer only: elegant amber crescent moon cradling a tiny open book, soft gold glow, isolated on pure transparent background, centered, with 20% empty margin on all sides for Android safe zone, no background circle, no text, vector clean.
```

*(If the tool can't do true transparency, use pure magenta `#FF00FF` or pure white and key it out later.)*

### Background

```
Solid deep near-black square fill color #0B0D12, subtle very soft radial vignette slightly lighter in the center, no objects, no text, seamless, app icon background layer.
```

Or simply use solid `#0B0D12` in code (already in `app.json` as `backgroundColor`).

---

## Feature graphic prompt (1024×500 — not the icon)

```
Google Play feature graphic banner, wide 1024x500 feel, dark cinematic night gradient #0B0D12 to soft charcoal. Left side large elegant wordmark "Nightbound" in warm off-white serif. Thin amber accent line. Right side soft crescent moon and open book motif matching the app icon, gentle gold glow, stars sparse. Subtitle text "Soft literary stories for grown-ups" in small refined sans-serif. Calm adult premium mood, no photos of people, no medical claims, plenty of margin, clean marketing banner.
```

**Note:** AI often mis-renders text — if “Nightbound” is garbled, generate **image without text** and add title in Canva/Figma.

### Feature graphic without text (safer)

```
Wide banner background for a mobile app store, dark near-black night sky with soft amber crescent moon and a delicate open book silhouette on the right third, sparse warm stars, left two-thirds empty dark space for later text overlay, calm literary adult brand, elegant minimal, no letters, no logos, no watermarks.
```

Then add in Canva:
- **Nightbound** (serif or clean sans, `#E8E4DC`)  
- *Soft literary stories for grown-ups* (`#C4A574`)

---

## Midjourney-style (if you use `--` params)

```
app icon, elegant amber crescent moon cradling open book, deep black #0B0D12 background, soft gold glow, minimal premium literary bedtime brand for adults, flat vector logo mark, centered, high contrast --v 6 --stylize 100 --ar 1:1
```

---

## Post-process checklist

1. Pick the cleanest symbol (best at thumbnail size).  
2. Resize: **1024×1024** → save as `nightbound/assets/images/icon.png`.  
3. Export **512×512** → `store/assets/icon-512.png` for Play Console.  
4. Foreground crop with padding for adaptive icon.  
5. Background solid `#0B0D12`.  
6. Check on black and on light gray — still readable.  
7. No accidental text/watermarks.

---

## Quick pick guide

| If you want… | Use |
|--------------|-----|
| Safest / most “app logo” | **Master prompt** |
| Cozy sleep feel | **A — Crescent lamp** |
| Bookish literary | **B — Moon + page** |
| More abstract modern | **C — Night window** |
| Letter brand | **D — N monogram** (test small!) |
