/**
 * Text-to-speech through Azure AI Speech (official API), for devices that have no
 * Sinhala/Tamil voice installed. Enabled when AZURE_SPEECH_KEY and AZURE_SPEECH_REGION are set.
 *   GET /api/tts?probe=1            → 200 if enabled, 501 if not
 *   GET /api/tts?lang=si-LK&text=…  → audio/mpeg
 */

const VOICES: Record<string, string> = {
  si: "si-LK-ThiliniNeural",
  en: "en-US-AvaMultilingualNeural",
  ta: "ta-IN-PallaviNeural",
  es: "es-ES-ElviraNeural",
  it: "it-IT-ElsaNeural",
};

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

export async function GET(req: Request) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  const url = new URL(req.url);
  if (!key || !region) return new Response("TTS not configured", { status: 501 });
  if (url.searchParams.has("probe")) return new Response("ok", { headers: { "Cache-Control": "no-store" } });

  const text = (url.searchParams.get("text") ?? "").slice(0, 600).trim();
  const lang = url.searchParams.get("lang") ?? "si-LK";
  const rate = Math.min(2, Math.max(0.5, Number(url.searchParams.get("rate") ?? "1") || 1));
  if (!text) return new Response("Missing text", { status: 400 });

  const voice = VOICES[lang.slice(0, 2).toLowerCase()] ?? VOICES.en;
  const ssml = `<speak version="1.0" xml:lang="${voice.slice(0, 5)}"><voice name="${voice}"><prosody rate="${Math.round((rate - 1) * 100)}%">${escapeXml(text)}</prosody></voice></speak>`;

  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "tripitaka-app",
    },
    body: ssml,
  });
  if (!res.ok) return new Response(`TTS error ${res.status}`, { status: 502 });

  return new Response(res.body, {
    headers: {
      "Content-Type": "audio/mpeg",
      // identical text → identical audio; let the CDN and browser keep it
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
