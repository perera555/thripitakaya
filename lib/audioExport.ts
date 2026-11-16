"use client";

import { chunk, type SpeechItem } from "./useSpeech";

/**
 * Records the spoken text to one MP3 file: each sentence is voiced by /api/tts
 * and the MP3 pieces are joined in order, then downloaded.
 */
export async function downloadAudio(items: SpeechItem[], filename: string, onProgress?: (done: number, total: number) => void, signal?: AbortSignal) {
  const parts = items.flatMap((it) => chunk(it.text).map((text) => ({ text, lang: it.lang })));
  if (!parts.length) return;
  const out: (ArrayBuffer | null)[] = new Array(parts.length).fill(null);
  let next = 0;
  let done = 0;
  const worker = async () => {
    while (next < parts.length) {
      if (signal?.aborted) return;
      const i = next++;
      const q = new URLSearchParams({ lang: parts[i].lang, text: parts[i].text });
      try {
        const r = await fetch(`/api/tts?${q}`, { signal });
        if (r.ok) out[i] = await r.arrayBuffer();
      } catch {}
      onProgress?.(++done, parts.length);
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  if (signal?.aborted) return;
  const blob = new Blob(out.filter((b): b is ArrayBuffer => !!b), { type: "audio/mpeg" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith(".mp3") ? filename : `${filename}.mp3`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
