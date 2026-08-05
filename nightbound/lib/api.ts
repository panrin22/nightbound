import type { MoodId, StoryLength } from '@/constants/moods';
import type { Story } from '@/lib/types';

/**
 * Backend base URL.
 * - Android emulator: http://10.0.2.2:8787
 * - iOS sim / web:    http://127.0.0.1:8787
 * - Physical device:  http://<LAN-IP>:8787
 *
 * Override with EXPO_PUBLIC_API_URL in `.env` or app config.
 */
export function apiBaseUrl(): string {
  return (
    process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ||
    'http://127.0.0.1:8787'
  );
}

export interface GenerateRemoteResult extends Story {
  source: 'xai' | 'groq' | 'offline';
  model?: string;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function healthCheck(): Promise<{
  ok: boolean;
  aiConfigured?: boolean;
  model?: string;
}> {
  const res = await fetch(`${apiBaseUrl()}/health`, {
    method: 'GET',
  });
  if (!res.ok) throw new ApiError(res.status, 'Health check failed');
  return res.json();
}

export async function generateStoryRemote(params: {
  mood: MoodId;
  length: StoryLength;
  userSeed?: string;
  signal?: AbortSignal;
}): Promise<GenerateRemoteResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const secret = process.env.EXPO_PUBLIC_API_SECRET;
  if (secret) headers['X-Nightbound-Key'] = secret;

  const res = await fetch(`${apiBaseUrl()}/v1/stories/generate`, {
    method: 'POST',
    headers,
    signal: params.signal,
    body: JSON.stringify({
      mood: params.mood,
      length: params.length,
      language: 'en',
      user_seed: params.userSeed,
    }),
  });

  const text = await res.text();
  let data: {
    error?: string;
    id?: string;
    title?: string;
    body?: string;
    mood?: MoodId;
    length?: StoryLength;
    createdAt?: string;
    source?: 'xai' | 'groq';
    model?: string;
  };
  try {
    data = JSON.parse(text);
  } catch {
    throw new ApiError(res.status, text || 'Invalid server response');
  }

  if (!res.ok) {
    throw new ApiError(res.status, data.error || `Generate failed (${res.status})`);
  }

  if (!data.id || !data.title || !data.body) {
    throw new ApiError(502, 'Malformed story payload');
  }

  return {
    id: data.id,
    title: data.title,
    body: data.body,
    mood: data.mood ?? params.mood,
    length: data.length ?? params.length,
    createdAt: data.createdAt ?? new Date().toISOString(),
    favorite: false,
    source: data.source ?? 'xai',
    model: data.model,
  };
}
