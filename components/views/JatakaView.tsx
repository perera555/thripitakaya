"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader } from "@/components/ui";
import { paliToSinhala } from "@/lib/pali";
import data from "@/lib/data/jataka.json";

type Tale = { n: number; p: string; e: string; b: number };
const TALES = data.tales as Tale[];
const BOOKS = data.books as { uid: string; pali: string; en: string }[];
const SI_TITLES = TALES.map((x) => paliToSinhala(x.p));

const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export function JatakaView() {
  const { t, lang } = useApp();
  const [q, setQ] = useState("");
  const [book, setBook] = useState<number | "all">("all");
  const [limit, setLimit] = useState(60);
  const dq = useDeferredValue(q);

  const list = useMemo(() => {
    const f = fold(dq.trim());
    return TALES.filter((x, i) => {
      if (book !== "all" && x.b !== book) return false;
      if (!f) return true;
      return String(x.n) === f || fold(x.p).includes(f) || fold(x.e).includes(f) || SI_TITLES[i].includes(dq.trim());
    });
  }, [dq, book]);

  return (
    <div>
      <PageHeader icon="🦚" title={t("jataka")} subtitle={t("jatakaDesc")}>
        <p className="mb-2 text-sm text-muted">{t("jatakaNote")}</p>
        <label className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
          <Search className="h-5 w-5 text-gold" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(60);
            }}
            placeholder={t("searchJataka")}
            className="w-full bg-transparent outline-none placeholder:text-muted"
          />
          <span className="shrink-0 text-sm text-muted">
            {list.length} {t("tales")}
          </span>
        </label>
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
          <button className="chip" aria-pressed={book === "all"} onClick={() => setBook("all")}>
            {t("all")} · 547
          </button>
          {BOOKS.map((b, i) => (
            <button key={b.uid} className="chip" aria-pressed={book === i} onClick={() => (setBook(i), setLimit(60))}>
              {i + 1}. {lang === "si" ? paliToSinhala(b.pali) : b.pali}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.slice(0, limit).map((x) => (
          <Link key={x.n} href={`/read/ja${x.n}`} className="card3d tilt group flex items-center gap-3 p-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-2/90 to-saffron/90 font-bold text-[#1d1205] shadow-[0_6px_20px_-6px_rgba(244,185,66,0.7)]">
              {x.n}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold">{lang === "si" ? SI_TITLES[x.n - 1] : x.p}</span>
              <span className="block truncate text-sm text-muted">{lang === "si" ? x.p : x.e}</span>
            </span>
          </Link>
        ))}
      </div>
      {list.length > limit && (
        <div className="mt-6 text-center">
          <button className="btn btn-ghost" onClick={() => setLimit((l) => l + 90)}>
            {t("showMore")} ({list.length - limit})
          </button>
        </div>
      )}
    </div>
  );
}
