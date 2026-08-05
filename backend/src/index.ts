import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

import { config, hasAiKey } from './config.js';
import { generateStory } from './generate.js';
import { MOOD_IDS } from './moods.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'X-Nightbound-Key'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  })
);

app.use('/v1/*', async (c, next) => {
  if (!config.apiSecret) return next();
  const key = c.req.header('X-Nightbound-Key');
  if (key !== config.apiSecret) {
    throw new HTTPException(401, { message: 'Invalid or missing API key' });
  }
  return next();
});

app.get('/health', (c) =>
  c.json({
    ok: true,
    service: 'nightbound-backend',
    aiConfigured: hasAiKey(),
    provider: config.provider,
    model: config.model,
  })
);

const generateSchema = z.object({
  mood: z.enum(MOOD_IDS),
  length: z.enum(['short', 'medium']),
  language: z.literal('en').optional().default('en'),
  user_seed: z.string().max(400).optional(),
});

app.post('/v1/stories/generate', async (c) => {
  if (!hasAiKey()) {
    throw new HTTPException(503, {
      message:
        'AI not configured. Set XAI_API_KEY (xai-…) or GROQ_API_KEY (gsk_…) in backend/.env',
    });
  }

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    throw new HTTPException(400, { message: 'Invalid JSON body' });
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    throw new HTTPException(400, {
      message: parsed.error.issues.map((i) => i.message).join('; '),
    });
  }

  const { mood, length, user_seed } = parsed.data;

  try {
    const story = await generateStory({
      mood,
      length,
      userSeed: user_seed,
    });

    const id = `story_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return c.json({
      id,
      title: story.title,
      body: story.body,
      mood: story.mood,
      length: story.length,
      createdAt: new Date().toISOString(),
      source: story.source,
      model: story.model,
    });
  } catch (e) {
    const err = e as Error & { status?: number; statusCode?: number };
    const raw = err.status ?? err.statusCode ?? 502;
    const status = (
      raw === 400 || raw === 401 || raw === 403 || raw === 429 || raw === 503
        ? raw
        : 502
    ) as 400 | 401 | 403 | 429 | 502 | 503;
    console.error('[generate]', err.message);
    throw new HTTPException(status, {
      message: err.message || 'Story generation failed',
    });
  }
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  console.error(err);
  return c.json({ error: 'Internal server error' }, 500);
});

console.log(
  `Nightbound API on http://${config.host}:${config.port} provider=${config.provider} model=${config.model} ai=${hasAiKey() ? 'ready' : 'MISSING KEY'}`
);

serve({
  fetch: app.fetch,
  port: config.port,
  hostname: config.host,
});
