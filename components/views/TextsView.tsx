"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader, Section, TiltCard } from "@/components/ui";
import { VideoGrid } from "@/components/Video";
import { pick } from "@/lib/i18n";
import { paliToSinhala } from "@/lib/pali";
import { PIRITH, SUTRAS, type TextItem } from "@/lib/data/texts";

function TextCard({ item, n }: { item: TextItem; n?: number }) {
  const { lang, t } = useApp();
  return (
    <TiltCard href={`/read/${item.uid}`} className="group p-5" max={8}>
      <div className="pop-sm flex items-start gap-4">
        {n !== undefined && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-2 to-saffron text-sm font-bold text-[#1d1205] shadow-[0_0_20px_rgba(244,185,66,0.35)]">
            {n}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold leading-snug">{pick(item.name, lang)}</h3>
          <p className="mt-0.5 text-sm text-gold">{lang === "si" ? paliToSinhala(item.pali) : item.pali}</p>
          {item.desc && <p className="mt-2 text-sm text-muted">{pick(item.desc, lang)}</p>}
          <div className="mt-3 flex items-center gap-3 text-xs text-muted">
            <span className="rounded-md bg-card-2 px-2 py-0.5 font-mono uppercase">{item.uid}</span>
            {item.videos && (
              <span className="flex items-center gap-1 text-gold">
                <PlayCircle className="h-3.5 w-3.5" /> {t("videos")}
              </span>
            )}
          </div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-gold" />
      </div>
    </TiltCard>
  );
}

export function SutrasView() {
  const { t } = useApp();
  return (
    <div>
      <PageHeader icon="📜" title={t("sutras")} subtitle={t("sutrasDesc")} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUTRAS.map((s) => (
          <TextCard key={s.uid} item={s} />
        ))}
      </div>
      <Section title={t("deshanaVideos")}>
        <VideoGrid keys={["dhammacakka", "anatta", "satipatthana", "mangala", "mettaSutta", "galigamuwe", "rerukane"]} search="ධර්ම දේශනා" />
      </Section>
    </div>
  );
}

export function PirithView() {
  const { t } = useApp();
  return (
    <div>
      <PageHeader icon="🪷" title={t("pirith")} subtitle={t("pirithIntro")} />
      <Section title={t("mahamevnawaPirith")}>
        <p className="-mt-2 mb-4 text-sm text-muted">{t("mahamevnawaNote")}</p>
        <VideoGrid keys={["mahamevnawa"]} search="Mahamevnawa pirith" />
      </Section>
      <Section title={`${t("pirith")} — ${t("paliText")} · ${t("sinhalaMeaning")}`}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PIRITH.map((p, i) => (
            <TextCard key={p.uid} item={p} n={i + 1} />
          ))}
        </div>
        <Link href="/gatha" className="btn btn-ghost mt-5">
          {t("gatha")} <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>
      <Section title={t("fullPirith")}>
        <VideoGrid keys={["pirithFull", "ratana", "atanatiya", "jayamangala"]} search="pirith sinhala" />
      </Section>
    </div>
  );
}
