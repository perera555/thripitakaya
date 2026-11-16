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

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const session = useRef(0);
  const keep = useRef<SpeechSynthesisUtterance[]>([]);
  const me = useRef(Symbol("player"));

  useEffect(() => {
    const onClaim = (o: symbol | null) => {
      if (o !== me.current) {
        session.current++;
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
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      session.current++;
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    session.current++;
    keep.current = [];
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (items: SpeechItem[], start: number, opts: Options = {}) => {
      if (!("speechSynthesis" in window)) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      claim(me.current);
      const my = ++session.current;
      const all = synth.getVoices();
      setSpeaking(true);

      const run = (i: number) => {
        if (my !== session.current) return;
        if (i >= items.length) {
          setSpeaking(false);
          opts.onDone?.();
          return;
        }
        opts.onIndex?.(i);
        const parts = chunk(items[i].text);
        if (!parts.length) return run(i + 1);
        const voice = findVoice(all, items[i].lang);
        let k = 0;
        const sayNext = () => {
          if (my !== session.current) return;
          if (k >= parts.length) return run(i + 1);
          const u = new SpeechSynthesisUtterance(parts[k++]);
          u.lang = voice?.lang ?? items[i].lang;
          if (voice) u.voice = voice;
          u.rate = opts.rate ?? 1;
          u.onend = sayNext;
          u.onerror = (e) => {
            if (e.error === "interrupted" || e.error === "canceled") return;
            sayNext();
          };
          keep.current = [u];
          synth.speak(u);
        };
        sayNext();
      };
      run(start);
    },
    [],
  );

  return { supported, voices, speaking, speak, stop };
}
