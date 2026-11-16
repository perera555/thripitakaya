/**
 * Same-origin proxy for the public SuttaCentral API, so texts load even where the
 * browser can't reach suttacentral.net directly. Responses are cached at the CDN.
 */

const ALLOWED = /^(suttaplex|menu|bilarasuttas|suttas)\//;

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const sub = path.map(encodeURIComponent).join("/");
  if (!ALLOWED.test(sub + "/")) return new Response("Not allowed", { status: 400 });

  const search = new URL(req.url).search;
  try {
    const res = await fetch(`https://suttacentral.net/api/${sub}${search}`, {
      headers: { Accept: "application/json", "User-Agent": "tripitaka-app (+https://thripitakaya.vercel.app)" },
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return new Response(`Upstream ${res.status}`, { status: res.status === 404 ? 404 : 502 });
    return new Response(res.body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch {
    return new Response("Upstream unavailable", { status: 504 });
  }
}
