import 'dotenv/config';

export type AiProvider = 'xai' | 'groq';

function detectProvider(): AiProvider {
  const forced = (process.env.AI_PROVIDER ?? 'auto').toLowerCase();
  if (forced === 'xai' || forced === 'groq') return forced;

  const groqKey = process.env.GROQ_API_KEY ?? '';
  const xaiKey = process.env.XAI_API_KEY ?? '';

  // Prefer explicit Groq key
  if (groqKey && groqKey !== 'gsk_your-key-here') return 'groq';

  // Auto from key shape when only XAI_API_KEY is filled
  if (xaiKey.startsWith('gsk_')) return 'groq';
  if (xaiKey.startsWith('xai-')) return 'xai';

  if (xaiKey && xaiKey !== 'xai-your-key-here') return 'xai';
  return 'xai';
}

const provider = detectProvider();

/** Resolve the actual API key for the active provider */
function resolveApiKey(): string {
  if (provider === 'groq') {
    return (
      process.env.GROQ_API_KEY ||
      process.env.XAI_API_KEY || // allow gsk_ stored under XAI_API_KEY
      ''
    );
  }
  return process.env.XAI_API_KEY ?? '';
}

const apiKey = resolveApiKey();

const defaultModel =
  provider === 'groq'
    ? process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile'
    : process.env.XAI_MODEL ?? 'grok-4.5';

export const config = {
  port: Number(process.env.PORT ?? 8787),
  host: process.env.HOST ?? '0.0.0.0',
  provider,
  apiKey,
  model: defaultModel,
  apiSecret: process.env.API_SECRET ?? '',
  maxOutputTokens: Number(process.env.MAX_OUTPUT_TOKENS ?? 1800),
  xaiBaseUrl: 'https://api.x.ai/v1',
  groqBaseUrl: 'https://api.groq.com/openai/v1',
};

export function assertAiReady(): void {
  if (!hasAiKey()) {
    throw new Error(
      'No AI key. Set XAI_API_KEY (xai-…) from console.x.ai OR GROQ_API_KEY (gsk_…) from console.groq.com'
    );
  }
}

export function hasAiKey(): boolean {
  if (!apiKey) return false;
  if (apiKey === 'xai-your-key-here' || apiKey === 'gsk_your-key-here') return false;
  return true;
}

export function providerBaseUrl(): string {
  return provider === 'groq' ? config.groqBaseUrl : config.xaiBaseUrl;
}
