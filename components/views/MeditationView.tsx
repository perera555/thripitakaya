"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Bell, BookOpenText, Pause, Play, RotateCcw } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader, Section, TiltCard } from "@/components/ui";
import { PlayerBar, usePlayer } from "@/components/Player";
import { VideoGrid } from "@/components/Video";
import { LANGS, pick } from "@/lib/i18n";
import { MEDITATIONS, type Meditation } from "@/lib/data/meditations";

export function MeditationList() {
  const { t, lang } = useApp();
  return (
    <div>
      <PageHeader icon="🧘" title={t("meditation")} subtitle={t("meditationDesc")} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MEDITATIONS.map((m, i) => (
          <TiltCard
            key={m.slug}
            href={`/meditation/${m.slug}`}
            className="group p-6 animate-rise"
            style={{ animationDelay: `${i * 40}ms`, background: `radial-gradient(120% 80% at 0% 0%, hsl(${m.hue} 75% 55% / .22), transparent 60%), linear-gradient(160deg, var(--card-2), var(--card))` }}
          >
            <div className="pop">
              <div className="relative mb-4 grid h-16 w-16 place-items-center">
                <span className="absolute inset-0 rounded-full animate-breathe" style={{ background: `radial-gradient(circle, hsl(${m.hue} 80% 60% / .55), transparent 70%)` }} />
                <span className="relative text-4xl">{m.icon}</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{m.pali}</p>
              <h2 className="mt-1 text-xl font-bold">{pick(m.name, lang)}</h2>
              <p className="mt-2 text-sm text-muted">{pick(m.summary, lang)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                {t("start")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}

/** A soft singing-bowl bell synthesised with Web Audio. */
function ringBell() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [[528, 0.5], [1056, 0.18], [1584, 0.09], [792, 0.12]].forEach(([f, g]) => {
      const o = ctx.createOscillator();
      const gain = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(g, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 7);
      o.connect(gain).connect(ctx.destination);
      o.start(now);
      o.stop(now + 7.2);
    });
    setTimeout(() => ctx.close(), 8000);
  } catch {}
}

function Timer({ initial }: { initial: number }) {
  const { t } = useApp();
  const [mins, setMins] = useState(initial);
  const [left, setLeft] = useState(initial * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const end = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const s = Math.max(0, Math.round((end.current - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) {
        setRunning(false);
        setDone(true);
        ringBell();
      }
    }, 250);
    return () => clearInterval(id);
  }, [running]);
  useLayoutEffect(() => () => setRunning(false), []);

  const start = () => {
    if (left === 0) setLeft(mins * 60);
    end.current = Date.now() + (left === 0 ? mins * 60 : left) * 1000;
    if (left === mins * 60 || left === 0) ringBell();
    setDone(false);
    setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setDone(false);
    setLeft(mins * 60);
  };
  const pct = 1 - left / (mins * 60 || 1);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="card3d p-6 text-center">
      <h3 className="mb-4 font-semibold text-gold-2">{t("timer")}</h3>
      <div className="relative mx-auto grid h-56 w-56 place-items-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="url(#tg)" strokeWidth="6" strokeLinecap="round" strokeDasharray={339.3} strokeDashoffset={339.3 * (1 - pct)} style={{ transition: "stroke-dashoffset .3s" }} />
          <defs>
            <linearGradient id="tg">
              <stop offset="0" stopColor="var(--gold-2)" />
              <stop offset="1" stopColor="var(--saffron)" />
            </linearGradient>
          </defs>
        </svg>
        <span className={`absolute inset-6 rounded-full ${running ? "animate-breathe" : ""}`} style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 25%, transparent), transparent 70%)" }} />
        <span className="relative text-5xl font-bold tabular-nums">{done ? "🙏" : `${mm}:${ss}`}</span>
      </div>
      {done && <p className="mt-2 text-gold-2">{t("sessionDone")}</p>}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {[5, 10, 15, 20, 30, 45, 60].map((m) => (
          <button key={m} className="chip" aria-pressed={mins === m} disabled={running} onClick={() => (setMins(m), setLeft(m * 60), setDone(false))}>
            {m} {t("minutes")}
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <button className="btn btn-gold px-6" onClick={running ? () => setRunning(false) : start}>
          {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />} {running ? t("pause") : t("start")}
        </button>
        <button className="btn btn-ghost" onClick={reset}>
          <RotateCcw className="h-4 w-4" /> {t("reset")}
        </button>
        <button className="btn btn-ghost" onClick={ringBell} aria-label={t("bell")}>
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function MeditationDetail({ m }: { m: Meditation }) {
  const { t, lang } = useApp();
  const steps = m.steps[lang] ?? m.steps.en;
  const speech = LANGS.find((l) => l.code === lang)!.speech;
  const items = useMemo(() => steps.map((s) => ({ text: s, lang: speech })), [steps, speech]);
  const p = usePlayer(items);

  return (
    <div>
      <PageHeader icon={m.icon} title={pick(m.name, lang)} subtitle={pick(m.summary, lang)}>
        <p className="text-sm font-semibold tracking-[0.18em] text-gold">{m.pali}</p>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="card3d p-6">
          <h2 className="mb-4 text-xl font-semibold text-gold-2">{t("howToPractise")}</h2>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li
                key={i}
                onClick={() => p.start(i)}
                className={`flex cursor-pointer gap-4 rounded-2xl p-3 transition ${p.playing && p.index === i ? "bg-gold/15 ring-1 ring-gold/50" : "hover:bg-card-2/60"}`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-2 to-saffron font-bold text-[#1d1205]">{i + 1}</span>
                <p className="reading pt-1">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-muted">{t("guidedSession")}</p>
            <PlayerBar p={p} />
          </div>
          {m.sutta && (
            <Link href={`/read/${m.sutta.uid}`} className="btn btn-ghost mt-5 text-sm">
              <BookOpenText className="h-4 w-4" /> {t("relatedSutta")}: {m.sutta.name}
            </Link>
          )}
        </div>
        <Timer initial={m.minutes} />
      </div>

      <Section title={t("guidedVideos")}>
        <VideoGrid keys={m.videos} search={`${pick(m.name, lang)} ${m.pali}`} />
      </Section>
    </div>
  );
}
