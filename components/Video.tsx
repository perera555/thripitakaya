"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { Play, Subtitles } from "lucide-react";
import { videosFor, type Video } from "@/lib/data/videos";
import { LANGS, type Lang } from "@/lib/i18n";
import { useApp } from "./providers";

export function VideoCard({ video }: { video: Video }) {
  const { lang, t } = useApp();
  const [active, setActive] = useState(false);

  // Stop playback when the page is hidden (routes stay mounted under Activity).
  useLayoutEffect(() => () => setActive(false), []);

  const src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=${lang}&hl=${lang}`;

  return (
    <article className="card3d tilt overflow-hidden">
      <div className="relative aspect-video bg-black">
        {active ? (
          <iframe
            src={src}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button className="group absolute inset-0" onClick={() => setActive(true)} aria-label={`${t("play")}: ${video.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-gold-2 to-saffron text-[#1d1205] shadow-[0_0_40px_rgba(244,185,66,0.6)] transition group-hover:scale-110">
              <Play className="ml-1 h-7 w-7" fill="currentColor" />
            </span>
            <span className="absolute left-2 top-2 flex gap-1">
              <span className="rounded-md bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">{LANGS.find((l) => l.code === video.lang)?.label}</span>
              <span className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
                <Subtitles className="h-3 w-3" /> CC
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug">{video.title}</h3>
        <p className="mt-2 truncate text-sm text-muted">{video.by}</p>
      </div>
    </article>
  );
}

/** Grid of videos with a language filter. Defaults to the reader's language when such videos exist. */
export function VideoGrid({ keys, videos: given }: { keys?: string[]; videos?: Video[]; search?: string }) {
  const { lang, t } = useApp();
  const videos = useMemo(() => given ?? videosFor(keys), [given, keys]);
  const langs = useMemo(() => LANGS.filter((l) => videos.some((v) => v.lang === l.code)), [videos]);
  const [filter, setFilter] = useState<Lang | "all" | null>(null);
  const effective = filter ?? (videos.some((v) => v.lang === lang) ? lang : "all");
  const shown = effective === "all" ? videos : videos.filter((v) => v.lang === effective);

  if (!videos.length) return null;
  return (
    <div>
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4">
        <button className="chip" aria-pressed={effective === "all"} onClick={() => setFilter("all")}>
          {t("allLanguages")} · {videos.length}
        </button>
        {langs.map((l) => (
          <button key={l.code} className="chip" aria-pressed={effective === l.code} onClick={() => setFilter(l.code)}>
            {l.label} · {videos.filter((v) => v.lang === l.code).length}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm text-muted">
        <Subtitles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span>{t("captionsNote")}</span>
      </p>
    </div>
  );
}
