"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpenText, ChevronDown, Play } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader, Section } from "@/components/ui";
import { PlayerBar, usePlayer } from "@/components/Player";
import { VideoGrid } from "@/components/Video";
import { LANGS, pick } from "@/lib/i18n";
import { paliToSinhala, renderPali } from "@/lib/pali";
import { usePref } from "@/lib/usePref";
import { paliSpeech, useCloudVoice } from "@/lib/useSpeech";
import { GATHA_GROUPS, GATHAS as BASE, type Gatha } from "@/lib/data/gatha";
import { DEITY_GATHAS } from "@/lib/data/deities";

const GATHAS: Gatha[] = [...BASE, ...DEITY_GATHAS];

function GathaCard({ g }: { g: Gatha }) {
  const { lang, t } = useApp();
  const [script, setScript] = usePref<"sinhala" | "roman">("script", lang === "si" ? "sinhala" : "roman");
  const [open, setOpen] = useState(false);
  const [what, setWhat] = useState<"pali" | "meaning">(g.pali.length ? "pali" : "meaning");
  const speech = LANGS.find((l) => l.code === lang)!.speech;

  const cloud = useCloudVoice();
  const items = useMemo(() => {
    if (what === "meaning") return [{ text: pick(g.meaning, lang), lang: speech }];
    const voices = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices() : [];
    const pv = paliSpeech(voices, cloud);
    return g.pali.map((v) => ({ text: pv.sinhala ? paliToSinhala(v) : v, lang: pv.lang }));
  }, [what, g, lang, speech, cloud]);
  const p = usePlayer(items);

  return (
    <article id={g.slug} className="card3d scroll-mt-24 p-5 sm:p-6">
      <button className="flex w-full items-start gap-4 text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card-2 text-2xl shadow-[0_0_25px_rgba(244,185,66,0.25)]">{g.icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold leading-snug">{pick(g.title, lang)}</span>
          {g.pali[0] && <span className="mt-1 block truncate text-sm text-gold">{renderPali(g.pali[0].split("\n")[0], script)}</span>}
        </span>
        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-5 animate-rise">
          {g.pali.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              <button className="chip" aria-pressed={script === "sinhala"} onClick={() => setScript("sinhala")}>සිංහල</button>
              <button className="chip" aria-pressed={script === "roman"} onClick={() => setScript("roman")}>Roman</button>
              <span className="mx-1 h-6 w-px bg-line" />
              <button className="chip" aria-pressed={what === "pali"} onClick={() => setWhat("pali")}>
                <Play className="h-3 w-3" /> {t("pali")}
              </button>
              <button className="chip" aria-pressed={what === "meaning"} onClick={() => setWhat("meaning")}>
                <Play className="h-3 w-3" /> {t("meaning")}
              </button>
            </div>
          )}
          <div className="reading space-y-4 text-[1.15rem]">
            {g.pali.map((v, i) => (
              <p key={i} className={`pali-text verse block ${what === "pali" && p.playing && p.index === i ? "speaking" : ""}`}>
                {renderPali(v, script)}
              </p>
            ))}
          </div>
          <div className={`mt-5 rounded-2xl border border-line bg-bg/40 p-4 ${what === "meaning" && p.playing ? "ring-1 ring-gold/50" : ""}`}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">{lang === "si" ? t("sinhalaMeaning") : t("meaning")}</p>
            <p className="reading whitespace-pre-line">{pick(g.meaning, lang)}</p>
          </div>
          {g.note && <p className="mt-3 text-xs text-muted">{pick(g.note, lang)}</p>}
          <div className="mt-4">
            <PlayerBar p={p} />
          </div>
          {g.readUid && (
            <Link href={`/read/${g.readUid}`} className="btn btn-ghost mt-4 text-sm">
              <BookOpenText className="h-4 w-4" /> {t("readFull")}
            </Link>
          )}
          {g.videos && (
            <div className="mt-6">
              <VideoGrid keys={g.videos} />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export function GathaView() {
  const { t, lang } = useApp();
  return (
    <div>
      <PageHeader icon="🛕" title={t("gatha")} subtitle={t("gathaDesc")}>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {GATHA_GROUPS.map((g) => (
            <a key={g.key} href={`#grp-${g.key}`} className="chip">
              {pick(g.name, lang)}
            </a>
          ))}
        </div>
      </PageHeader>
      {GATHA_GROUPS.map((grp) => (
        <Section key={grp.key} title={<span id={`grp-${grp.key}`} className="scroll-mt-24">{pick(grp.name, lang)}</span>}>
          <div className="grid gap-4 lg:grid-cols-2">
            {GATHAS.filter((g) => g.group === grp.key).map((g) => (
              <GathaCard key={g.slug} g={g} />
            ))}
          </div>
        </Section>
      ))}
      <Section title={t("videos")}>
        <VideoGrid keys={["bodhiPuja", "ruwanweli", "jayamangala", "atanatiya", "navagraha"]} search="බෝධි පූජා ගාථා" />
      </Section>
    </div>
  );
}
