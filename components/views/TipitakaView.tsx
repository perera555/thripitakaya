"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, FolderOpen, ScrollText } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader, Spinner, TiltCard } from "@/components/ui";
import { pick } from "@/lib/i18n";
import { paliToSinhala } from "@/lib/pali";
import { findCollection, PITAKAS } from "@/lib/data/tipitaka";
import { getMenu, type MenuNode } from "@/lib/sc";

export function TipitakaView() {
  const { t, lang } = useApp();
  return (
    <div>
      <PageHeader icon="📚" title={t("tipitaka")} subtitle={t("tipitakaDesc")} />
      <div className="grid gap-6 lg:grid-cols-3">
        {PITAKAS.map((p, i) => (
          <div key={p.key} className="animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
            <TiltCard
              className="h-full p-6"
              max={6}
              style={{ background: `linear-gradient(160deg, hsl(${p.hue} 70% 55% / .2), transparent 50%), linear-gradient(160deg, var(--card-2), var(--card))` }}
            >
              <div className="pop-sm">
                <p className="text-sm font-semibold text-gold">{lang === "si" ? paliToSinhala(p.pali) : p.pali}</p>
                <h2 className="mt-1 text-2xl font-bold">{pick(p.name, lang)}</h2>
                <p className="mt-1 text-sm text-muted">{pick(p.desc, lang)}</p>
              </div>
              <ul className="mt-5 space-y-2">
                {p.collections.map((c) => (
                  <li key={c.uid}>
                    <Link href={`/tipitaka/${c.uid}`} className="group flex items-center gap-3 rounded-xl border border-line bg-bg/30 px-3 py-2.5 transition hover:border-gold/50 hover:bg-card-2">
                      <FolderOpen className="h-5 w-5 shrink-0 text-gold" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{pick(c.name, lang)}</span>
                        <span className="block truncate text-xs text-muted">{lang === "si" ? paliToSinhala(c.pali) : c.pali}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-gold" />
                    </Link>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrowseView({ uid }: { uid: string }) {
  const { t, lang } = useApp();
  const [node, setNode] = useState<MenuNode | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setNode(null);
    setError(false);
    getMenu(uid)
      .then((n) => live && setNode(n))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, [uid, attempt]);

  const known = findCollection(uid);
  const name = (n: MenuNode) => (lang === "si" ? paliToSinhala(n.root_name ?? n.uid) : n.root_name ?? n.uid);

  if (error)
    return (
      <div className="card3d p-8 text-center">
        <p className="mb-4">{t("loadError")}</p>
        <button className="btn btn-gold" onClick={() => setAttempt((a) => a + 1)}>
          {t("retry")}
        </button>
      </div>
    );
  if (!node) return <Spinner />;

  const children = node.children ?? [];
  return (
    <div>
      <PageHeader
        icon="📖"
        title={known ? pick(known.name, lang) : name(node)}
        subtitle={[node.translated_name?.trim(), node.blurb].filter(Boolean).join(" — ").slice(0, 400)}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c) => {
          const leaf = c.node_type === "leaf";
          return (
            <Link
              key={c.uid}
              href={leaf ? `/read/${c.uid}` : `/tipitaka/${c.uid}`}
              className="card3d tilt group flex items-center gap-3 p-4 transition hover:border-gold/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card-2 text-gold">
                {leaf ? <ScrollText className="h-5 w-5" /> : <FolderOpen className="h-5 w-5" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{name(c)}</span>
                <span className="block truncate text-sm text-muted">
                  {[c.acronym, c.translated_name?.trim(), c.child_range].filter(Boolean).join(" · ")}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-gold" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
