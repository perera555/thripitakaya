"use client";

import { useEffect, useState } from "react";
import { Send, Star } from "lucide-react";
import { useApp } from "@/components/providers";
import { PageHeader, Spinner } from "@/components/ui";
import { LANGS } from "@/lib/i18n";

type Review = { id: string; name: string; rating: number; text: string; lang: string; at: string };
type Data = { reviews: Review[]; average: number; count: number };

function Stars({ value, size = "h-5 w-5" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${size} ${n <= Math.round(value) ? "fill-gold text-gold" : "text-muted/40"}`} />
      ))}
    </span>
  );
}

export function ReviewsList({ limit }: { limit?: number }) {
  const { t, lang } = useApp();
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ reviews: [], average: 0, count: 0 }));
  }, []);
  if (!data) return <Spinner />;
  const list = limit ? data.reviews.slice(0, limit) : data.reviews;
  return (
    <div>
      {data.count > 0 && (
        <div className="mb-4 flex items-center gap-3">
          <span className="text-4xl font-black text-gradient">{data.average.toFixed(1)}</span>
          <div>
            <Stars value={data.average} />
            <p className="text-sm text-muted">
              {data.count} {t("reviewsCount")}
            </p>
          </div>
        </div>
      )}
      {!list.length && <p className="card3d p-5 text-muted">{t("noReviews")}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((r) => (
          <article key={r.id} className="card3d p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-semibold">{r.name}</p>
              <Stars value={r.rating} size="h-4 w-4" />
            </div>
            <p className="mt-2 whitespace-pre-line leading-relaxed">{r.text}</p>
            <p className="mt-2 text-xs text-muted">
              {new Date(r.at).toLocaleDateString(lang === "si" ? "si-LK" : lang)} · {LANGS.find((l) => l.code === r.lang)?.label}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ onDone }: { onDone: () => void }) {
  const { t, lang } = useApp();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 3) return;
    setState("sending");
    try {
      const r = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, text, lang, website: trap }),
      });
      if (!r.ok) throw new Error();
      setState("done");
      setText("");
      onDone();
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={submit} className="card3d space-y-4 p-5">
      <h2 className="text-lg font-semibold text-gold-2">{t("writeReview")}</h2>
      <div className="flex items-center gap-1" role="radiogroup" aria-label={t("yourRating")}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={rating === n} onClick={() => setRating(n)} className="p-1">
            <Star className={`h-8 w-8 transition ${n <= rating ? "fill-gold text-gold drop-shadow-[0_0_8px_rgba(244,185,66,0.6)]" : "text-muted/40"}`} />
          </button>
        ))}
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={40}
        placeholder={t("yourName")}
        className="w-full rounded-xl border border-line bg-bg/50 px-4 py-3 outline-none focus:border-gold"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={800}
        required
        rows={4}
        placeholder={t("yourReview")}
        className="w-full rounded-xl border border-line bg-bg/50 px-4 py-3 outline-none focus:border-gold"
      />
      {/* spam trap: hidden from people, bots fill it in */}
      <input value={trap} onChange={(e) => setTrap(e.target.value)} name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex items-center gap-3">
        <button className="btn btn-gold" disabled={state === "sending"}>
          <Send className="h-4 w-4" /> {state === "sending" ? t("loading") : t("sendReview")}
        </button>
        {state === "done" && <span className="text-sm text-gold-2">{t("reviewThanks")}</span>}
        {state === "error" && <span className="text-sm text-saffron">{t("reviewError")}</span>}
      </div>
    </form>
  );
}

export function ReviewsView() {
  const { t } = useApp();
  const [key, setKey] = useState(0);
  return (
    <div>
      <PageHeader icon="⭐" title={t("reviews")} subtitle={t("reviewsDesc")} />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <ReviewForm onDone={() => setTimeout(() => setKey((k) => k + 1), 500)} />
        <ReviewsList key={key} />
      </div>
    </div>
  );
}
