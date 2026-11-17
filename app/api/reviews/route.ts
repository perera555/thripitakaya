import { get, list, put } from "@vercel/blob";

/**
 * App reviews, stored as private JSON files in Vercel Blob (one file per review).
 *   GET  /api/reviews  → { reviews: Review[], average, count }
 *   POST /api/reviews  { name, rating, text, lang, website }  (website = spam trap, must be empty)
 */

export type Review = { id: string; name: string; rating: number; text: string; lang: string; at: string };

const PREFIX = "reviews/";
const hits = new Map<string, number[]>(); // best-effort per-instance rate limit

function clean(s: unknown, max: number) {
  return String(s ?? "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .replace(/\s+\n/g, "\n")
    .trim()
    .slice(0, max);
}

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ reviews: [], average: 0, count: 0 });
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
    const sorted = blobs.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt));
    const ratings = sorted.map((b) => Number(/-r(\d)\.json$/.exec(b.pathname)?.[1] ?? 0)).filter(Boolean);
    const latest = await Promise.all(
      sorted.slice(0, 60).map(async (b) => {
        try {
          const r = await get(b.pathname, { access: "private" });
          if (!r || r.statusCode !== 200 || !r.stream) return null;
          return (await new Response(r.stream).json()) as Review;
        } catch {
          return null;
        }
      }),
    );
    const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
    return Response.json(
      { reviews: latest.filter(Boolean), average: Math.round(average * 10) / 10, count: ratings.length },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch {
    return Response.json({ reviews: [], average: 0, count: 0, error: "unavailable" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: "Reviews are not set up" }, { status: 503 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true }); // bot filled the hidden field

  const name = clean(body.name, 40) || "—";
  const text = clean(body.text, 800);
  const rating = Math.round(Number(body.rating));
  const lang = ["si", "en", "ta", "es"].includes(String(body.lang)) ? String(body.lang) : "si";
  if (!(rating >= 1 && rating <= 5)) return Response.json({ error: "rating" }, { status: 400 });
  if (text.length < 3) return Response.json({ error: "text" }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "?";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (recent.length >= 5) return Response.json({ error: "Too many reviews, please try later" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const id = `${now.toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const review: Review = { id, name, rating, text, lang, at: new Date(now).toISOString() };
  await put(`${PREFIX}${id}-r${rating}.json`, JSON.stringify(review), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });
  return Response.json({ ok: true, review });
}
