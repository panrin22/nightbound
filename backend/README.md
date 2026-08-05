# Nightbound Backend (AI)

Story generation API. Keys stay **server-side only**.

**Providers**
| Provider | Key | Default model |
|----------|-----|----------------|
| **xAI** (preferred long-term) | `xai-…` → `XAI_API_KEY` | `grok-4.5` |
| **Groq** (works now with `gsk_…`) | `gsk_…` → `GROQ_API_KEY` or `XAI_API_KEY` | `llama-3.3-70b-versatile` |

`AI_PROVIDER=auto` detects from key prefix (`gsk_` → groq, `xai-` → xai).

## Setup

```bash
cd ai-bedtime-stories/backend
cp .env.example .env
# Put gsk_ or xai- key in .env
npm install
npm run dev
```

Server: `http://0.0.0.0:8787`

## Endpoints

### `GET /health`
```json
{ "ok": true, "aiConfigured": true, "provider": "groq", "model": "llama-3.3-70b-versatile" }
```

### `POST /v1/stories/generate`
```json
{
  "mood": "cozy",
  "length": "short",
  "language": "en",
  "user_seed": "optional notes, max 400 chars"
}
```

**Response**
```json
{
  "id": "story_…",
  "title": "…",
  "body": "…",
  "mood": "cozy",
  "length": "short",
  "createdAt": "ISO",
  "source": "xai",
  "model": "grok-4.5"
}
```

If `API_SECRET` is set in `.env`, send header: `X-Nightbound-Key: <secret>`.

## Env

| Var | Required | Default |
|-----|----------|---------|
| `XAI_API_KEY` | yes (for AI) | — |
| `XAI_MODEL` | no | `grok-4.5` |
| `PORT` | no | `8787` |
| `API_SECRET` | no | empty (open for local) |

## Smoke test

```bash
# terminal 1
npm run dev
# terminal 2
npm run smoke
```

## Mobile client URLs

| Where app runs | `EXPO_PUBLIC_API_URL` |
|----------------|------------------------|
| Android emulator | `http://10.0.2.2:8787` |
| iOS simulator | `http://127.0.0.1:8787` |
| Physical device | `http://<your-lan-ip>:8787` |
| Web | `http://127.0.0.1:8787` |
