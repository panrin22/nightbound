import type { MoodId, StoryLength } from '@/constants/moods';
import { generateStoryRemote } from '@/lib/api';
import type { Story } from '@/lib/types';

/**
 * Prefer backend (xAI). Fall back to offline soft-literary templates
 * if the API is down or not configured.
 */

const TITLES: Record<MoodId, string[]> = {
  cozy: ['The Lamp by the Window', 'Second Cup', 'Keys on the Table'],
  soft_romance: ['Almost Said', 'The Shared Umbrella', 'Letters Never Sent'],
  mystery: ['The Quiet Floor', 'A Name on the Envelope', 'After Closing Time'],
  nature: ['Rain on the Leaves', 'Path Without a Map', 'Tide Going Out'],
  scifi_calm: ['Station Lights', 'The Slow Orbit', 'Message from Home'],
  comfort: ['What Remains Warm', 'A Place to Sit', 'Held Lightly'],
  adventure_soft: ['The Long Road Home', 'Map Folded Twice', 'Village at Dusk'],
  literary: ['The Last Paragraph', 'Ink and Evening', 'A Room of Soft Hours'],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function paragraphsFor(mood: MoodId, length: StoryLength): string[] {
  const short = length === 'short';

  const commonOpen = [
    'The day had already done enough. Night arrived without asking permission, and that was a kindness.',
    'Somewhere a clock softened its tick, as if it too preferred not to rush.',
  ];

  const byMood: Record<MoodId, string[]> = {
    cozy: [
      'In the apartment, the lamp left a small circle of gold on the table. Outside, the street murmured and then forgot itself.',
      'You set a cup down carefully. Steam rose like a quiet thought that did not need answering.',
      'A book lay open where you left it yesterday. The page had waited without complaint.',
      'Socks. Blanket. The familiar creak of the chair. Ordinary things, arranged into peace.',
    ],
    soft_romance: [
      'They had spoken about weather and work and nothing that mattered, and still the air between them felt full.',
      'A hand paused near another hand and did not take it. The almost was enough for tonight.',
      'Streetlights painted soft edges on faces. No declarations. Only the slow understanding of company.',
      'Later, alone, the memory of a laugh returned like a warm coat you forgot you owned.',
    ],
    mystery: [
      'On the third floor, a light stayed on past closing. Not bright. Not urgent. Simply there.',
      'The envelope had no return address, only a single initial written as if by someone thinking of something else.',
      'You opened the drawer you never used. Dust, a ribbon, and a key that did not match any door you knew.',
      'The answer could wait until morning. Mystery, when gentle, becomes a reason to rest.',
    ],
    nature: [
      'Rain found the leaves one by one, a soft inventory of the dark.',
      'The path bent without drama. Trees leaned in as if sharing a secret too old for words.',
      'You breathed the wet green air and felt the day rinse out of your shoulders.',
      'Far off, something small moved through undergrowth and was gone. The forest kept its calm.',
    ],
    scifi_calm: [
      'The station windows held a slow parade of stars. No alarms. Only the hush of recycled air.',
      'On the outer ring, a gardener tended moss under artificial dusk. Green against metal. A quiet rebellion.',
      'A message arrived from Earth with nothing urgent inside: a photo of rain on a porch.',
      'You dimmed the cabin lights and let the orbit do the thinking for a while.',
    ],
    comfort: [
      'Grief did not leave. It sat nearby, less sharp than before, like a guest who finally stopped pacing.',
      'Someone had left tea. Someone had left silence that did not demand performance.',
      'You did not have to fix the day. You only had to set it down.',
      'Warmth returned in small units: a sweater sleeve, a soft lamp, the weight of a blanket.',
    ],
    adventure_soft: [
      'The road did not hurry you. Hills arrived and left like polite companions.',
      'In a village at dusk, windows lit one by one, as if agreeing the day was done.',
      'Your pack felt lighter when you stopped measuring distance and started noticing doors and dogs and smoke.',
      'Tomorrow could keep its maps. Tonight only asked for a chair and a window.',
    ],
    literary: [
      'Language loosened its necktie. Sentences grew longer, then shorter, like breathing you could trust.',
      'You remembered a sentence from years ago and did not mind that you forgot the rest of the book.',
      'Evening edited the world: fewer colors, better shadows, a gentler plot.',
      'Meaning, if it came at all, came the way sleep does—sideways, unannounced, kind.',
    ],
  };

  const windDown = [
    'The edges of the room softened. Sound stepped back a pace.',
    'There was nothing left that required your cleverness tonight.',
    'Breathe in as if drawing a curtain. Breathe out as if lowering a lamp.',
    'The story loosens its hold. Characters rest. Doors close gently.',
    'You may keep what comforted you and leave the rest on the page.',
    'Sleep is not a task. It is a tide. Let it take the shoreline of your thoughts.',
    'Darkness here is friendly. It does not demand. It only stays.',
    'And so the night continues without you having to follow every detail.',
    'Eyes heavier. Shoulders lower. The last image is light growing small.',
    'Good night. The rest can wait until the morning finds you.',
  ];

  const body = byMood[mood];
  const selected = short
    ? [pick(commonOpen), ...body.slice(0, 3), ...windDown.slice(0, 5)]
    : [pick(commonOpen), pick(commonOpen), ...body, ...windDown];

  return selected;
}

export async function generateStoryOffline(params: {
  mood: MoodId;
  length: StoryLength;
}): Promise<Story> {
  // Brief pause so the ritual screen is visible offline too
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

  const title = pick(TITLES[params.mood]);
  const paras = paragraphsFor(params.mood, params.length);
  const body = paras.join('\n\n');

  return {
    id: `story_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title,
    body,
    mood: params.mood,
    length: params.length,
    createdAt: new Date().toISOString(),
    favorite: false,
    source: 'offline',
  };
}

export async function generateStory(params: {
  mood: MoodId;
  length: StoryLength;
  userSeed?: string;
  /** When true, never call network (tests / airplane) */
  offlineOnly?: boolean;
}): Promise<Story> {
  if (!params.offlineOnly) {
    try {
      const remote = await generateStoryRemote({
        mood: params.mood,
        length: params.length,
        userSeed: params.userSeed,
      });
      return remote;
    } catch (e) {
      console.warn('[Nightbound] AI backend unavailable, using offline engine', e);
    }
  }
  return generateStoryOffline({ mood: params.mood, length: params.length });
}
