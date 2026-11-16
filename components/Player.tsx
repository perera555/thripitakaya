"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import { findVoice, useSpeech, type SpeechItem } from "@/lib/useSpeech";
import { LANGS } from "@/lib/i18n";
import { useApp } from "./providers";

export type PlayerState = ReturnType<typeof usePlayer>;

export function usePlayer(items: SpeechItem[]) {
  const sp = useSpeech();
  const [index, setIndex] = useState(0);
  const [, setPlaying] = useState(false);
  const playing = sp.speaking;
  const [rate, setRate] = useState(1);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const start = useCallback(
    (i: number, r = rate) => {
      if (!itemsRef.current.length) return;
      const at = Math.max(0, Math.min(i, itemsRef.current.length - 1));
      setIndex(at);
      setPlaying(true);
      sp.speak(itemsRef.current, at, {
        rate: r,
        onIndex: setIndex,
        onDone: () => {
          setPlaying(false);
          setIndex(0);
        },
      });
    },
    [sp, rate],
  );

  const pause = useCallback(() => {
    sp.stop();
    setPlaying(false);
  }, [sp]);

  const toggle = useCallback(() => (playing ? pause() : start(index)), [playing, pause, start, index]);
  const next = useCallback(() => (playing ? start(index + 1) : setIndex((i) => Math.min(i + 1, itemsRef.current.length - 1))), [playing, start, index]);
  const prev = useCallback(() => (playing ? start(index - 1) : setIndex((i) => Math.max(i - 1, 0))), [playing, start, index]);
  const stop = useCallback(() => {
    pause();
    setIndex(0);
  }, [pause]);
  const changeRate = useCallback(
    (r: number) => {
      setRate(r);
      if (playing) start(index, r);
    },
    [playing, start, index],
  );

  // New content → reset.
  useEffect(() => {
    sp.stop();
    setPlaying(false);
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Stop speaking when this page is hidden by navigation.
  useLayoutEffect(() => () => window.speechSynthesis?.cancel(), []);

  const missing = useMemo(() => {
    if (sp.cloud) return sp.failed ? [sp.failed] : [];
    const langs = [...new Set(items.map((i) => i.lang))];
    const lacking = langs.filter((l) => !findVoice(sp.voices, l));
    if (sp.failed && !lacking.includes(sp.failed)) lacking.push(sp.failed);
    return lacking;
  }, [items, sp.voices, sp.cloud, sp.failed]);

  return { ...sp, index, setIndex, playing, rate, start, pause, toggle, next, prev, stop, changeRate, missing, count: items.length };
}

const RATES = [0.75, 1, 1.25, 1.5];

export function PlayerBar({ p, big = false, label }: { p: PlayerState; big?: boolean; label?: string }) {
  const { t } = useApp();
  if (!p.supported) return <p className="rounded-xl border border-line p-3 text-sm text-muted">{t("noSpeech")}</p>;

  const pct = p.count ? ((p.index + (p.playing ? 0.5 : 0)) / p.count) * 100 : 0;
  const btn = big ? "h-14 w-14" : "h-11 w-11";
  const main = big ? "h-20 w-20" : "h-14 w-14";

  return (
    <div className={big ? "" : "glass rounded-2xl p-3 shadow-[var(--shadow)]"}>
      <div className={`flex items-center ${big ? "justify-center gap-5" : "gap-2"}`}>
        <button className={`btn btn-ghost ${btn} p-0`} onClick={p.prev} aria-label={t("previous")}>
          <SkipBack className="h-5 w-5" />
        </button>
        <button className={`btn btn-gold ${main} p-0`} onClick={p.toggle} aria-label={p.playing ? t("pause") : t("play")}>
          {p.playing ? <Pause className={big ? "h-9 w-9" : "h-6 w-6"} fill="currentColor" /> : <Play className={`${big ? "h-9 w-9" : "h-6 w-6"} ml-1`} fill="currentColor" />}
        </button>
        <button className={`btn btn-ghost ${btn} p-0`} onClick={p.next} aria-label={t("next")}>
          <SkipForward className="h-5 w-5" />
        </button>
        {!big && (
          <button className={`btn btn-ghost ${btn} p-0`} onClick={p.stop} aria-label={t("stop")}>
            <Square className="h-4 w-4" />
          </button>
        )}
        <div className={`${big ? "" : "ml-auto"} flex items-center gap-1`}>
          <span className="hidden text-xs text-muted sm:inline">{t("speed")}</span>
          <select
            value={p.rate}
            onChange={(e) => p.changeRate(Number(e.target.value))}
            className="rounded-full border border-line bg-card-2 px-2 py-1.5 text-sm"
            aria-label={t("speed")}
          >
            {RATES.map((r) => (
              <option key={r} value={r}>
                {r}×
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-card-2">
          <div className="h-full rounded-full bg-gradient-to-r from-gold-2 to-saffron transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs tabular-nums text-muted">
          {Math.min(p.index + 1, p.count)} / {p.count}
        </span>
      </div>
      {label && <p className="mt-2 text-center text-xs text-muted">{label}</p>}
      {p.missing.length > 0 && (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-saffron/10 p-2.5 text-xs text-muted">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
          <span>{t("noVoice", { lang: p.missing.map((m) => LANGS.find((l) => m.startsWith(l.code))?.label ?? m).join(", ") })}</span>
        </p>
      )}
    </div>
  );
}

/** One-tap speak button for a short text. */
export function SpeakButton({ text, lang, label }: { text: string; lang: string; label?: string }) {
  const items = useMemo(() => [{ text, lang }], [text, lang]);
  const p = usePlayer(items);
  const { t } = useApp();
  return (
    <button className="btn btn-ghost px-3 py-1.5 text-sm" onClick={p.toggle} aria-label={label ?? t("listen")}>
      {p.playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      {label ?? t("listen")}
    </button>
  );
}
