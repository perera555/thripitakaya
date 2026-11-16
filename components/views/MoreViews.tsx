"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Apple, BookOpenText, Download, ExternalLink, Monitor, Smartphone, Trash2, WifiOff, X } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader, Section, TiltCard } from "@/components/ui";
import { PlayerBar, SpeakButton, usePlayer } from "@/components/Player";
import { VideoGrid } from "@/components/Video";
import { useInstall } from "@/components/Install";
import { LANGS, pick, type Lang } from "@/lib/i18n";
import { paliToSinhala, renderPali } from "@/lib/pali";
import { usePref } from "@/lib/usePref";
import { findVoice } from "@/lib/useSpeech";
import { PACCAYAS, PATTHANA_UID } from "@/lib/data/patthana";
import { VIDEOS, VIDEO_TOPICS, type Video } from "@/lib/data/videos";
import { listSaved, removeSaved, type SavedText } from "@/lib/saved";
import booksData from "@/lib/data/rerukane-books.json";

/* ── Samanta Paṭṭhāna ───────────────────────────────────── */
export function PatthanaView() {
  const { t, lang } = useApp();
  const [script, setScript] = usePref<"sinhala" | "roman">("script", lang === "si" ? "sinhala" : "roman");
  const items = useMemo(() => {
    const voices = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices() : [];
    const si = !!findVoice(voices, "si-LK");
    return PACCAYAS.map((p) => ({ text: si ? paliToSinhala(p.pali) : p.pali, lang: si ? "si-LK" : findVoice(voices, "it-IT") ? "it-IT" : "en-US" }));
  }, []);
  const player = usePlayer(items);

  return (
    <div>
      <PageHeader icon="🔆" title={t("patthana")} subtitle={t("patthanaIntro")}>
        <div className="flex flex-wrap gap-2">
          <Link href={`/read/${PATTHANA_UID}`} className="btn btn-gold">
            <BookOpenText className="h-4 w-4" /> {t("readFull")} — Paccayuddesa · Paccayaniddesa
          </Link>
          <button className="chip" aria-pressed={script === "sinhala"} onClick={() => setScript("sinhala")}>සිංහල</button>
          <button className="chip" aria-pressed={script === "roman"} onClick={() => setScript("roman")}>Roman</button>
        </div>
      </PageHeader>

      <Section title={t("paccayas24")}>
        <div className="mb-5">
          <p className="mb-2 text-sm text-muted">{t("chantUddesa")}</p>
          <PlayerBar p={player} />
        </div>
        <div className="scene grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PACCAYAS.map((p, i) => (
            <TiltCard key={p.pali} className={`p-5 ${player.playing && player.index === i ? "ring-2 ring-gold" : ""}`} max={12}>
              <button className="pop-sm block w-full text-left" onClick={() => player.start(i)}>
                <span className="text-3xl font-black text-gradient">{i + 1}</span>
                <p className="mt-2 text-lg font-bold pali-text">{renderPali(p.pali, script)}</p>
                <p className="mt-1 text-sm text-muted">{pick(p.meaning, lang)}</p>
              </button>
            </TiltCard>
          ))}
        </div>
      </Section>

      <Section title={t("videos")}>
        <VideoGrid keys={["patthana"]} search="පට්ඨාන දේශනාව" />
      </Section>
    </div>
  );
}

/* ── Rerukane Thero's books ─────────────────────────────── */
type Book = { id: number; slug: string; title: string; si: string; desc: string | null; descSi: string | null; cat: string; cover: string | null; pdf: string | null; pages: number | null; featured: boolean };
const BOOKS = (booksData as Book[]).slice().sort((a, b) => Number(b.featured) - Number(a.featured));

export function BooksView() {
  const { t, lang } = useApp();
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<Book | null>(null);
  const cats = [...new Set(BOOKS.map((b) => b.cat))];
  const shown = cat === "all" ? BOOKS : BOOKS.filter((b) => b.cat === cat);
  const speech = LANGS.find((l) => l.code === lang)!.speech;

  return (
    <div>
      <PageHeader icon="📖" title={t("books")} subtitle={t("booksIntro")}>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          <button className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            {t("all")} · {BOOKS.length}
          </button>
          {cats.map((c) => (
            <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((b) => {
          const desc = lang === "si" ? b.descSi || b.desc : b.desc || b.descSi;
          return (
            <TiltCard key={b.id} className="flex flex-col p-4" max={8}>
              <div className="pop-sm flex gap-4">
                {b.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.cover} alt="" loading="lazy" className="h-36 w-24 shrink-0 rounded-lg object-cover shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)]" />
                ) : (
                  <div className="grid h-36 w-24 shrink-0 place-items-center rounded-lg bg-card-2 text-3xl">📕</div>
                )}
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{lang === "si" ? b.si : b.title}</h3>
                  <p className="mt-0.5 text-sm text-gold">{lang === "si" ? b.title : b.si}</p>
                  <p className="mt-1 text-xs text-muted">
                    {b.cat}
                    {b.pages ? ` · ${b.pages} ${t("pages")}` : ""}
                  </p>
                </div>
              </div>
              {desc && <p className="mt-3 line-clamp-4 flex-1 text-sm text-muted">{desc}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {b.pdf && (
                  <button className="btn btn-gold px-3 py-1.5 text-sm" onClick={() => setOpen(b)}>
                    <BookOpenText className="h-4 w-4" /> {t("readBook")}
                  </button>
                )}
                {b.pdf && (
                  <a className="btn btn-ghost px-3 py-1.5 text-sm" href={`https://drive.google.com/uc?export=download&id=${b.pdf}`} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" /> {t("download")}
                  </a>
                )}
                {desc && <SpeakButton text={desc} lang={b.descSi && lang === "si" ? "si-LK" : speech} label={t("listenDesc")} />}
              </div>
            </TiltCard>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted">
        {t("booksVoiceNote")} ·{" "}
        <a className="underline" href="https://rerukanemahanahimi.lk/library.html" target="_blank" rel="noopener noreferrer">
          rerukanemahanahimi.lk
        </a>
      </p>

      <Section title={t("deshanaVideos")}>
        <VideoGrid keys={["rerukane"]} search="Rerukane Chandawimala Thero" />
      </Section>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur" role="dialog" aria-modal="true">
          <div className="flex items-center gap-3 p-3 text-white">
            <p className="min-w-0 flex-1 truncate font-semibold">{lang === "si" ? open.si : open.title}</p>
            <a className="btn btn-ghost px-3 py-1.5 text-sm" href={`https://drive.google.com/file/d/${open.pdf}/view`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> {t("openPdf")}
            </a>
            <button className="btn btn-ghost h-10 w-10 p-0" onClick={() => setOpen(null)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <iframe src={`https://drive.google.com/file/d/${open.pdf}/preview`} className="w-full flex-1 bg-white" allow="autoplay" title={open.title} />
        </div>
      )}
    </div>
  );
}

/* ── Dhamma talks ───────────────────────────────────────── */
export function DeshanaView() {
  const { t, lang } = useApp();
  const [topic, setTopic] = useState<string>("all");
  const all = useMemo(() => {
    const seen = new Set<string>();
    const out: Video[] = [];
    for (const k of Object.keys(VIDEOS)) for (const v of VIDEOS[k]) if (!seen.has(v.id)) (seen.add(v.id), out.push(v));
    return out;
  }, []);
  const videos = topic === "all" ? all : VIDEOS[topic] ?? [];
  return (
    <div>
      <PageHeader icon="🎧" title={t("deshana")} subtitle={t("deshanaDesc")}>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          <button className="chip" aria-pressed={topic === "all"} onClick={() => setTopic("all")}>
            {t("all")} · {all.length}
          </button>
          {VIDEO_TOPICS.map((tp) => (
            <button key={tp.key} className="chip" aria-pressed={topic === tp.key} onClick={() => setTopic(tp.key)}>
              {pick(tp.label, lang as Lang)}
            </button>
          ))}
        </div>
      </PageHeader>
      <VideoGrid key={topic} videos={videos} search={lang === "si" ? "බණ දේශනා" : "dhamma talk"} />
      <p className="mt-4 text-xs text-muted">{t("videoNoDownload")}</p>
    </div>
  );
}

/* ── Saved texts ───────────────────────────────────────── */
export function SavedView() {
  const { t, lang } = useApp();
  const [list, setList] = useState<SavedText[] | null>(null);
  const [reading, setReading] = useState<SavedText | null>(null);
  useEffect(() => {
    listSaved().then(setList);
  }, []);
  const remove = async (k: string) => {
    await removeSaved(k);
    setList(await listSaved());
  };
  if (reading) return <SavedReader s={reading} onClose={() => setReading(null)} />;
  return (
    <div>
      <PageHeader icon="🔖" title={t("saved")} subtitle={t("savedDesc")} />
      {list && !list.length && <p className="card3d p-6 text-muted">{t("noSaved")}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {list?.map((s) => (
          <div key={s.key} className="card3d flex items-center gap-3 p-4">
            <button className="min-w-0 flex-1 text-left" onClick={() => setReading(s)}>
              <p className="truncate font-bold">{lang === "si" ? paliToSinhala(s.title) : s.title}</p>
              <p className="truncate text-sm text-muted">
                {[s.subtitle, LANGS.find((l) => l.code === s.lang)?.label, s.author].filter(Boolean).join(" · ")}
              </p>
            </button>
            <Link href={`/read/${s.uid}`} className="btn btn-ghost h-10 w-10 p-0" aria-label={t("open")}>
              <BookOpenText className="h-4 w-4" />
            </Link>
            <button className="btn btn-ghost h-10 w-10 p-0" onClick={() => remove(s.key)} aria-label={t("remove")}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedReader({ s, onClose }: { s: SavedText; onClose: () => void }) {
  const { t, lang } = useApp();
  const speech = LANGS.find((l) => l.code === s.lang)?.speech ?? "en-US";
  const list = s.blocks.filter((b) => b.text || b.pali);
  const items = useMemo(() => list.map((b) => ({ text: b.text ?? b.pali ?? "", lang: b.text ? speech : "si-LK" })), [list, speech]);
  const p = usePlayer(items);
  return (
    <div className="mx-auto max-w-3xl">
      <button className="btn btn-ghost mb-4 text-sm" onClick={onClose}>
        ← {t("saved")}
      </button>
      <h1 className="text-center text-3xl font-bold">
        <span className="text-gradient">{lang === "si" ? paliToSinhala(s.title) : s.title}</span>
      </h1>
      <p className="mb-4 mt-2 flex items-center justify-center gap-1 text-xs text-gold">
        <WifiOff className="h-3 w-3" /> {t("offlineCopy")}
      </p>
      <div className="glass sticky top-[4.5rem] z-30 mb-6 rounded-2xl">
        <PlayerBar p={p} />
      </div>
      <div className="reading space-y-4 text-[1.15rem]">
        {list.map((b, i) => (
          <div key={b.id} className={`block ${p.playing && p.index === i ? "speaking" : ""}`}>
            {b.pali && <p className="pali-text">{paliToSinhala(b.pali)}</p>}
            {b.text && <p className={b.kind === "h" ? "text-center font-bold text-gold-2" : ""}>{b.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Install ───────────────────────────────────────────── */
export function InstallView() {
  const { t, lang } = useApp();
  const { canPrompt, standalone, prompt } = useInstall();
  const steps: { icon: React.ReactNode; title: string; body: Record<Lang, string> }[] = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Android",
      body: {
        si: "Chrome හි මෙම පිටුව විවෘත කර ⋮ මෙනුව → “Install app” / “Add to Home screen” ඔබන්න.",
        en: "Open this page in Chrome, tap ⋮ → “Install app” / “Add to Home screen”.",
        ta: "Chrome இல் இப்பக்கத்தைத் திறந்து ⋮ → “Install app” அழுத்தவும்.",
        es: "Abre esta página en Chrome, toca ⋮ → «Instalar app» / «Añadir a pantalla de inicio».",
      },
    },
    {
      icon: <Apple className="h-6 w-6" />,
      title: "iPhone / iPad",
      body: {
        si: "Safari හි විවෘත කර Share (⬆️) බොත්තම → “Add to Home Screen” → “Add” ඔබන්න.",
        en: "Open in Safari, tap Share (⬆️) → “Add to Home Screen” → “Add”.",
        ta: "Safari இல் திறந்து Share (⬆️) → “Add to Home Screen” → “Add”.",
        es: "Abre en Safari, toca Compartir (⬆️) → «Añadir a pantalla de inicio» → «Añadir».",
      },
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Windows",
      body: {
        si: "Edge හෝ Chrome හි ලිපින තීරුවේ ඇති ⊕ “Install” අයිකනය ඔබන්න, හෝ ඉහළ ඇති “ඇප් එක ස්ථාපනය” බොත්තම ඔබන්න. Start මෙනුවේ ඇප් එක දිස් වේ.",
        en: "In Edge or Chrome, click the ⊕ “Install” icon in the address bar (or the Install button at the top). The app appears in the Start menu.",
        ta: "Edge அல்லது Chrome இல் முகவரிப் பட்டியில் உள்ள ⊕ “Install” ஐ அழுத்தவும். Start மெனுவில் செயலி தோன்றும்.",
        es: "En Edge o Chrome, pulsa el icono ⊕ «Instalar» de la barra de direcciones. La app aparece en el menú Inicio.",
      },
    },
    {
      icon: <Apple className="h-6 w-6" />,
      title: "Mac",
      body: {
        si: "Safari: File → “Add to Dock”. Chrome/Edge: ලිපින තීරුවේ ⊕ Install ඔබන්න.",
        en: "Safari: File → “Add to Dock”. Chrome/Edge: click ⊕ Install in the address bar.",
        ta: "Safari: File → “Add to Dock”. Chrome/Edge: முகவரிப் பட்டியில் ⊕ Install.",
        es: "Safari: Archivo → «Añadir al Dock». Chrome/Edge: pulsa ⊕ Instalar en la barra de direcciones.",
      },
    },
  ];
  return (
    <div>
      <PageHeader icon="📲" title={t("install")} subtitle={t("installDesc")}>
        {standalone ? (
          <p className="text-gold-2">{t("installed")}</p>
        ) : canPrompt ? (
          <button className="btn btn-gold px-6 py-3" onClick={prompt}>
            <Download className="h-5 w-5" /> {t("installNow")}
          </button>
        ) : null}
      </PageHeader>
      <div className="grid gap-5 sm:grid-cols-2">
        {steps.map((s) => (
          <TiltCard key={s.title} className="p-6" max={6}>
            <div className="pop-sm">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-2 to-saffron text-[#1d1205]">{s.icon}</span>
                <h2 className="text-xl font-bold">{s.title}</h2>
              </div>
              <p className="text-muted">{s.body[lang]}</p>
            </div>
          </TiltCard>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 text-sm text-muted">
        <WifiOff className="h-4 w-4 text-gold" /> {t("offlineNote")}
      </p>
    </div>
  );
}
