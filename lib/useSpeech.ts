"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SpeechItem = { text: string; lang: string };

type Options = {
  rate?: number;
  onIndex?: (i: number) => void;
  onDone?: () => void;
};

/** Split text into small utterances — long ones are cut off by some browsers. */
function chunk(text: string, max = 180): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= max) return [clean];
  const sentences = clean.split(/(?<=[.!?;:।॥෴”"’)])\s+/);
  const out: string[] = [];
  let buf = "";
  const push = (s: string) => {
    if ((buf + " " + s).trim().length > max) {
      if (buf) out.push(buf.trim());
      buf = s;
    } else buf = (buf + " " + s).trim();
  };
  for (const s of sentences) {
    if (s.length <= max) push(s);
    else for (const word of s.split(/\s+/)) push(word);
  }
  if (buf) out.push(buf.trim());
  return out;
}

function norm(l: string) {
  return l.replace("_", "-").toLowerCase();
}

export function findVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const want = norm(lang);
  const base = want.split("-")[0];
  return (
    voices.find((v) => norm(v.lang) === want && /google|natural|online/i.test(v.name)) ??
    voices.find((v) => norm(v.lang) === want) ??
    voices.find((v) => norm(v.lang).split("-")[0] === base)
  );
}

/** Only one player may speak at a time; others are told to stop. */
let owner: symbol | null = null;
const owners = new Set<(o: symbol | null) => void>();
function claim(me: symbol | null) {
  owner = me;
  owners.forEach((f) => f(me));
}

/** Is the server voice (/api/tts) available? Checked once per page load. */
let cloudProbe: Promise<boolean> | null = null;
export function hasCloudVoice(): Promise<boolean> {
  if (!cloudProbe)
    cloudProbe = fetch("/api/tts?probe=1")
      .then((r) => r.ok)
      .catch(() => false);
  return cloudProbe;
}

export function useCloudVoice(): boolean {
  const [c, setC] = useState(false);
  useEffect(() => {
    hasCloudVoice().then(setC);
  }, []);
  return c;
}

/** How to speak Pāli: Sinhala script with a Sinhala voice when possible, else Roman with Italian/English. */
export function paliSpeech(voices: SpeechSynthesisVoice[], cloud: boolean): { lang: string; sinhala: boolean } {
  if (findVoice(voices, "si-LK") || cloud) return { lang: "si-LK", sinhala: true };
  if (findVoice(voices, "it-IT")) return { lang: "it-IT", sinhala: false };
  return { lang: "en-US", sinhala: false };
}

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [cloud, setCloud] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const session = useRef(0);
  const keep = useRef<SpeechSynthesisUtterance[]>([]);
  const audio = useRef<HTMLAudioElement | null>(null);
  const me = useRef(Symbol("player"));

  useEffect(() => {
    hasCloudVoice().then(setCloud);
  }, []);

  useEffect(() => {
    const onClaim = (o: symbol | null) => {
      if (o !== me.current) {
        session.current++;
        audio.current?.pause();
        setSpeaking(false);
      }
    };
    owners.add(onClaim);
    return () => {
      owners.delete(onClaim);
      if (owner === me.current) owner = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSupported("speechSynthesis" in window || "Audio" in window);
    if (!("speechSynthesis" in window)) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      session.current++;
      window.speechSynthesis.cancel();
      audio.current?.pause();
    };
  }, []);

  const stop = useCallback(() => {
    session.current++;
    keep.current = [];
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    audio.current?.pause();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (items: SpeechItem[], start: number, opts: Options = {}) => {
      const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
      synth?.cancel();
      audio.current?.pause();
      claim(me.current);
      const my = ++session.current;
      const all = synth?.getVoices() ?? [];
      setSpeaking(true);
      setFailed(null);

      const fail = (lang: string) => {
        if (my !== session.current) return;
        setSpeaking(false);
        setFailed(lang);
      };

      const run = async (i: number) => {
        if (my !== session.current) return;
        if (i >= items.length) {
          setSpeaking(false);
          opts.onDone?.();
          return;
        }
        opts.onIndex?.(i);
        const parts = chunk(items[i].text);
        if (!parts.length) return run(i + 1);
        const lang = items[i].lang;
        const voice = findVoice(all, lang);
        let k = 0;

        // 1) A real voice for this language on the device → browser speech.
        if (voice && synth) {
          const sayNext = () => {
            if (my !== session.current) return;
            if (k >= parts.length) return void run(i + 1);
            const u = new SpeechSynthesisUtterance(parts[k++]);
            u.lang = voice.lang;
            u.voice = voice;
            u.rate = opts.rate ?? 1;
            u.onend = sayNext;
            u.onerror = (e) => {
              if (e.error === "interrupted" || e.error === "canceled") return;
              if (e.error === "language-unavailable" || e.error === "voice-unavailable" || e.error === "synthesis-unavailable") return fail(lang);
              sayNext();
            };
            keep.current = [u];
            synth.speak(u);
          };
          return sayNext();
        }

        // 2) No device voice → natural voice from the server (/api/tts).
        if (await hasCloudVoice()) {
          const el = audio.current ?? (audio.current = new Audio());
          const playNext = () => {
            if (my !== session.current) return;
            if (k >= parts.length) return void run(i + 1);
            const q = new URLSearchParams({ lang, text: parts[k++], rate: String(opts.rate ?? 1) });
            el.src = `/api/tts?${q}`;
            el.onended = playNext;
            el.onerror = () => fail(lang);
            el.play().catch(() => fail(lang));
          };
          return playNext();
        }

        // 3) Nothing can speak this language here.
        fail(lang);
      };
      void run(start);
    },
    [],
  );

  return { supported, voices, speaking, speak, stop, cloud, failed };
}
