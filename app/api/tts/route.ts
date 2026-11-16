/**
 * Text-to-speech audio for devices that have no Sinhala/Tamil voice installed.
 *  - Azure AI Speech (official, natural voices) when AZURE_SPEECH_KEY + AZURE_SPEECH_REGION are set
 *  - otherwise Google Translate's public speech endpoint (free, unofficial — may change)
 *
 *   GET /api/tts?probe=1            → 200
 *   GET /api/tts?lang=si-LK&text=…  → audio/mpeg
 */

const AZURE_VOICES: Record<string, string> = {
  si: "si-LK-ThiliniNeural",
  en: "en-US-AvaMultilingualNeural",
  ta: "ta-IN-PallaviNeural",
  es: "es-ES-ElviraNeural",
  it: "it-IT-ElsaNeural",
};

const AUDIO_HEADERS = {
  "Content-Type": "audio/mpeg",
  // identical text → identical audio; let the CDN and browser keep it
  "Cache-Control": "public, max-age=31536000, immutable",
};

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

async function azure(text: string, lang: string, key: string, region: string) {
  const voice = AZURE_VOICES[lang] ?? AZURE_VOICES.en;
  const ssml = `<speak version="1.0" xml:lang="${voice.slice(0, 5)}"><voice name="${voice}">${escapeXml(text)}</voice></speak>`;
  return fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "tripitaka-app",
    },
    body: ssml,
  });
}

async function google(text: string, lang: string) {
  const q = new URLSearchParams({ ie: "UTF-8", client: "tw-ob", tl: lang, q: text });
  return fetch(`https://translate.google.com/translate_tts?${q}`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36" },
    signal: AbortSignal.timeout(20000),
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.has("probe")) return new Response("ok", { headers: { "Cache-Control": "no-store" } });

  const text = (url.searchParams.get("text") ?? "").slice(0, 200).trim();
  const lang = (url.searchParams.get("lang") ?? "si").slice(0, 2).toLowerCase();
  if (!text) return new Response("Missing text", { status: 400 });

  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  try {
    if (key && region) {
      const r = await azure(text, lang, key, region);
      if (r.ok) return new Response(r.body, { headers: AUDIO_HEADERS });
    }
    const g = await google(text, lang);
    if (g.ok) return new Response(g.body, { headers: AUDIO_HEADERS });
    return new Response(`TTS error ${g.status}`, { status: 502 });
  } catch {
    return new Response("TTS unavailable", { status: 504 });
  }
}
