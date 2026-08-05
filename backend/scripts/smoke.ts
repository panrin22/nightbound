/**
 * Smoke test: health + optional generate if XAI_API_KEY is set.
 * Usage: npm run smoke
 */
import 'dotenv/config';

const base = process.env.SMOKE_BASE_URL ?? `http://127.0.0.1:${process.env.PORT ?? 8787}`;

async function main() {
  console.log('GET', `${base}/health`);
  const health = await fetch(`${base}/health`);
  const hj = await health.json();
  console.log(health.status, hj);

  if (!hj.aiConfigured) {
    console.log('Skip generate: XAI_API_KEY not configured');
    process.exit(health.ok ? 0 : 1);
  }

  console.log('POST', `${base}/v1/stories/generate`);
  const res = await fetch(`${base}/v1/stories/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.API_SECRET
        ? { 'X-Nightbound-Key': process.env.API_SECRET }
        : {}),
    },
    body: JSON.stringify({
      mood: 'cozy',
      length: 'short',
      language: 'en',
      user_seed: 'a small apartment after rain, one lamp left on',
    }),
  });

  const text = await res.text();
  console.log(res.status, text.slice(0, 500) + (text.length > 500 ? '…' : ''));
  process.exit(res.ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
