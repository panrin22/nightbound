import OpenAI from 'openai';
import {
  assertAiReady,
  config,
  providerBaseUrl,
  type AiProvider,
} from './config.js';
import { LENGTH_GUIDANCE, type MoodId, type StoryLength } from './moods.js';
import { isSeedSafe, systemPrompt, userPrompt } from './prompts.js';

export interface GeneratedStory {
  title: string;
  body: string;
  mood: MoodId;
  length: StoryLength;
  model: string;
  source: AiProvider;
}

function client(): OpenAI {
  assertAiReady();
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: providerBaseUrl(),
  });
}

function parseStoryJson(raw: string): { title: string; body: string } {
  let text = raw.trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }

  // Prefer outermost JSON object
  const brace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (brace !== -1 && lastBrace > brace) {
    text = text.slice(brace, lastBrace + 1);
  }

  const tryParse = (s: string): { title: string; body: string } | null => {
    try {
      const obj = JSON.parse(s) as { title?: string; body?: string };
      if (obj.title && obj.body && String(obj.body).length > 50) {
        return {
          title: String(obj.title).trim().slice(0, 120),
          body: String(obj.body).trim(),
        };
      }
    } catch {
      return null;
    }
    return null;
  };

  const direct = tryParse(text);
  if (direct) return direct;

  // Repair common model mistakes: trailing commas, smart quotes
  const repaired = text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/,\s*([}\]])/g, '$1');
  const fixed = tryParse(repaired);
  if (fixed) return fixed;

  // Regex fallback: "title": "...", "body": "..."
  const titleMatch = raw.match(/"title"\s*:\s*"((?:\\.|[^"\\])*)"/i);
  const bodyMatch = raw.match(/"body"\s*:\s*"((?:\\.|[^"\\])*)"/is);
  if (titleMatch && bodyMatch) {
    const unesc = (s: string) =>
      s
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
    return {
      title: unesc(titleMatch[1]).trim().slice(0, 120),
      body: unesc(bodyMatch[1]).trim(),
    };
  }

  // Plain text: first short line = title
  const lines = raw
    .replace(/```(?:json)?/gi, '')
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l && l !== '{' && l !== '}');
  if (lines.length >= 2 && lines[0].length < 80 && !lines[0].startsWith('"')) {
    return {
      title: lines[0].replace(/^title:\s*/i, '').replace(/^["']|["']$/g, ''),
      body: lines.slice(1).join('\n\n'),
    };
  }

  return { title: 'A Quiet Night', body: raw.trim() };
}

async function generateViaResponses(input: {
  mood: MoodId;
  length: StoryLength;
  userSeed?: string;
}): Promise<string> {
  const openai = client();
  const maxTokens = LENGTH_GUIDANCE[input.length].maxTokens;

  const response = await openai.responses.create({
    model: config.model,
    input: [
      { role: 'system', content: systemPrompt() },
      { role: 'user', content: userPrompt(input) },
    ],
    temperature: 0.85,
    max_output_tokens: Math.min(maxTokens, config.maxOutputTokens),
  } as Parameters<typeof openai.responses.create>[0]);

  const raw =
    (response as { output_text?: string }).output_text ??
    extractOutputText(response);
  return raw?.trim() ?? '';
}

async function generateViaChat(input: {
  mood: MoodId;
  length: StoryLength;
  userSeed?: string;
}): Promise<string> {
  const openai = client();
  const maxTokens = LENGTH_GUIDANCE[input.length].maxTokens;

  const response = await openai.chat.completions.create({
    model: config.model,
    temperature: 0.85,
    max_tokens: Math.min(maxTokens, config.maxOutputTokens),
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt() },
      { role: 'user', content: userPrompt(input) },
    ],
  });

  return response.choices[0]?.message?.content?.trim() ?? '';
}

function extractOutputText(response: unknown): string {
  const r = response as {
    output?: Array<{
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };
  const parts: string[] = [];
  for (const item of r.output ?? []) {
    for (const c of item.content ?? []) {
      if (c.text) parts.push(c.text);
    }
  }
  return parts.join('\n').trim();
}

/**
 * Generate a soft-literary bedtime story via configured provider.
 * - xAI: Responses API
 * - Groq: Chat Completions (OpenAI-compatible)
 */
export async function generateStory(input: {
  mood: MoodId;
  length: StoryLength;
  userSeed?: string;
}): Promise<GeneratedStory> {
  if (!isSeedSafe(input.userSeed)) {
    const err = new Error('Seed rejected by safety filter');
    (err as Error & { status: number }).status = 400;
    throw err;
  }

  const raw =
    config.provider === 'groq'
      ? await generateViaChat(input)
      : await generateViaResponses(input);

  if (!raw) {
    throw new Error(`Empty response from ${config.provider}`);
  }

  const { title, body } = parseStoryJson(raw);
  if (body.length < 200) {
    throw new Error('Story too short; generation failed quality check');
  }

  return {
    title: title || 'Untitled Night',
    body,
    mood: input.mood,
    length: input.length,
    model: config.model,
    source: config.provider,
  };
}
