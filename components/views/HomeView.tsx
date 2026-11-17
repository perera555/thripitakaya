"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Flower2, Library } from "lucide-react";
import { useApp } from "@/components/providers";
import { DharmaWheel } from "@/components/DharmaWheel";
import { TiltCard } from "@/components/ui";
import { PageSpeak } from "@/components/PageSpeak";
import type { StringKey } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { MEDITATIONS } from "@/lib/data/meditations";

const TILES: { href: string; title: StringKey; desc: StringKey; icon: string; hue: number; big?: boolean }[] = [
  { href: "/tipitaka", title: "tipitaka", desc: "tipitakaDesc", icon: "📚", hue: 40, big: true },
  { href: "/pirith", title: "pirith", desc: "pirithDesc", icon: "🪷", hue: 25, big: true },
  { href: "/jataka", title: "jataka", desc: "jatakaDesc", icon: "🦚", hue: 150 },
  { href: "/meditation", title: "meditation", desc: "meditationDesc", icon: "🧘", hue: 200 },
  { href: "/sutras", title: "sutras", desc: "sutrasDesc", icon: "📜", hue: 45 },
  { href: "/gatha", title: "gatha", desc: "gathaDesc", icon: "🛕", hue: 330 },
  { href: "/patthana", title: "patthana", desc: "patthanaDesc", icon: "🔆", hue: 280 },
  { href: "/books", title: "books", desc: "booksDesc", icon: "📖", hue: 15 },
  { href: "/deshana", title: "deshana", desc: "deshanaDesc", icon: "🎧", hue: 260 },
  { href: "/install", title: "install", desc: "installDesc", icon: "📲", hue: 180 },
];

export function HomeView() {
  const { t, lang } = useApp();
  const [day, setDay] = useState<{ i: number; label: string } | null>(null);
  useEffect(() => {
    const now = new Date();
    setDay({ i: Math.floor(now.getTime() / 86_400_000) % MEDITATIONS.length, label: now.toLocaleDateString(lang === "si" ? "si-LK" : lang) });
  }, [lang]);
  const today = MEDITATIONS[day?.i ?? 0];

  return (
    <div>
      {/* Top: Samadhi Buddha photo with the dedication */}
      <section className="card3d relative mb-6 overflow-hidden animate-rise" aria-label={t("dedicationTitle")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg/samadhi.webp"
          srcSet="/bg/samadhi-sm.webp 700w, /bg/samadhi.webp 1400w"
          sizes="(max-width: 768px) 100vw, 1280px"
          alt="සමාධි බුද්ධ ප්‍රතිමාව, අනුරාධපුරය · Samadhi Buddha statue, Anuradhapura"
          className="h-[240px] w-full object-cover object-[50%_45%] sm:h-[400px]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 hidden sm:block" style={{ background: "linear-gradient(180deg, rgba(11,9,21,0) 35%, rgba(11,9,21,0.92) 100%)" }} />
        <div className="relative p-4 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-6">
          <p className="flex items-center gap-2 text-lg font-bold text-gold-2 drop-shadow">
            <span aria-hidden>🪷</span> {t("dedicationTitle")}
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-white/95 drop-shadow sm:text-base">{t("dedication")}</p>
          <p className="mt-1.5 text-sm font-semibold text-gold-2">සාධු! සාධු! සාධු!</p>
        </div>
      </section>

      {/* Hero */}
      <section className="relative grid items-center gap-6 py-6 md:grid-cols-[1.1fr_1fr] md:gap-8 md:py-12">
        
        <div className="order-2 text-center md:order-1 md:text-left animate-rise">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-gold"> නමෝ තස්ස භගවතෝ අරහතෝ සම්මා සම්බුද්ධස්ස</p>
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            <span className="text-gradient">{t("appName")}</span>
          </h1>
          <p className="mt-3 text-xl text-ink/90">{t("tagline")}</p>
          <p className="mx-auto mt-4 max-w-xl text-muted md:mx-0">{t("heroIntro")}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href="/tipitaka" className="btn btn-gold px-6 py-3 text-base">
              <Library className="h-5 w-5" /> {t("startReading")}
            </Link>
            <Link href="/meditation" className="btn btn-ghost px-6 py-3 text-base">
              <Flower2 className="h-5 w-5" /> {t("startMeditating")}
            </Link>
            <PageSpeak />
          </div>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <div className="animate-float">
            <DharmaWheel size={300} className="!h-[190px] !w-[190px] md:!h-[300px] md:!w-[300px]" />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile, i) => (
          <TiltCard
            key={tile.href}
            href={tile.href}
            className={`group p-5 animate-rise ${tile.big ? "lg:col-span-2" : ""}`}
            style={{
              animationDelay: `${i * 50}ms`,
              background: `linear-gradient(150deg, hsl(${tile.hue} 70% 55% / 0.18), transparent 55%), linear-gradient(160deg, var(--card-2), var(--card))`,
            }}
          >
            <div className="pop flex h-full flex-col">
              <span className="mb-3 text-4xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">{tile.icon}</span>
              <h2 className="text-lg font-bold">{t(tile.title)}</h2>
              <p className="mt-1 flex-1 text-sm text-muted">{t(tile.desc)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                {t("open")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </TiltCard>
        ))}
      </section>

      {/* Today's practice */}
      <section className="mt-10">
        <TiltCard href={`/meditation/${today.slug}`} className="p-6 sm:p-8" max={5}>
          <div className="pop-sm flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative grid h-28 w-28 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full animate-breathe" style={{ background: `radial-gradient(circle, hsl(${today.hue} 80% 60% / .5), transparent 70%)` }} />
              <span className="relative text-5xl">{today.icon}</span>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t("meditation")}{day ? ` · ${day.label}` : ""}</p>
              <h3 className="mt-1 text-2xl font-bold">{pick(today.name, lang)}</h3>
              <p className="mt-1 text-muted">{pick(today.summary, lang)}</p>
            </div>
            <span className="btn btn-gold sm:ml-auto">
              {t("start")} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
