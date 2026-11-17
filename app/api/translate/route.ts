/**
 * Machine translation of a short passage (used to give full Jātaka stories, and texts
 * with no human translation, in Sinhala / Tamil / Spanish). Uses Google's free
 * translate endpoint (unofficial — may change). Results are CDN-cached.
 *
 *   GET /api/translate?to=si&q=…  → { t: "…" }
 */

const TARGETS = new Set(["si", "ta", "es", "en"]);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to") ?? "si";
  const from = url.searchParams.get("from") ?? "en";
  const q = (url.searchParams.get("q") ?? "").slice(0, 2000);
  if (!TARGETS.has(to) || !q.trim()) return Response.json({ error: "bad request" }, { status: 400 });

  const params = new URLSearchParams({ client: "gtx", sl: from, tl: to, dt: "t", q });
  try {
    const r = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36" },
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return Response.json({ error: `upstream ${r.status}` }, { status: 502 });
    const data = (await r.json()) as [Array<[string, ...unknown[]]>];
    const t = (data?.[0] ?? []).map((s) => s?.[0] ?? "").join("");
    return Response.json({ t }, { headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" } });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 504 });
  }
}
