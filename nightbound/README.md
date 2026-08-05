# Nightbound

**AI bedtime stories for adults** — soft literary tone, sleep-first pacing.  
English · React Native (Expo) · System TTS · Subscription target **$2.99/mo**

| | |
|--|--|
| Package | `com.nightbound.app` |
| Content | Soft literary only (no explicit) |
| Voice MVP | System TTS via `expo-speech` |
| AI | Backend **xAI** (`../backend`) + offline fallback |

## Quick start

```bash
cd ai-bedtime-stories/nightbound
npm start
# then press a for Android emulator / Expo Go
```

## App flow

1. **Age gate (18+)**  
2. **Tonight** — pick mood + length  
3. **Generate** — ritual loading → save story  
4. **Reader** — read + System TTS + sleep timer  
5. **Library** — re-open favorites  
6. **Paywall** — $2.99 stub (Play Billing next)  

Free: **1 story/day** + 3 free moods. Premium unlocks all moods + unlimited (dev toggle in Settings).

## Project map

```
app/
  age-gate.tsx      # 18+ confirm
  (tabs)/           # Tonight · Library · Settings
  generate.tsx      # story creation ritual
  story/[id].tsx    # reader + TTS + timer
  paywall.tsx       # subscription UI stub
constants/
  theme.ts          # dark cozy palette
  moods.ts          # moods + free limits
lib/
  generateStory.ts  # offline soft-literary engine
  speech.ts         # expo-speech wrapper
  storage.ts        # AsyncStorage
  quota.ts          # free daily limit
```

## Next engineering steps

1. **Backend** `POST /stories/generate` → SpaceXAI / xAI (`XAI_API_KEY` server-only)  
2. **Google Play Billing** product `premium_monthly` @ $2.99 + optional yearly  
3. **RevenueCat** (optional) for receipt validation  
4. **EAS Build** + Play Console closed testing  
5. Privacy Policy URL  

See parent plan: [`../PLAN.md`](../PLAN.md)

## Scripts

| Command | |
|---------|--|
| `npm start` | Expo dev server |
| `npm run android` | Open Android |
| `npm run web` | Web preview (TTS may differ) |
