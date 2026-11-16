/**
 * Downloads texts from SuttaCentral into public/sc/ so they ship inside the app.
 * The files mirror the exact API requests the reader makes (see lib/sc.ts → mirrorName).
 *
 *   node scripts/bundle-texts.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "sc");
const API = "https://suttacentral.net/api";
const LANGS = new Set(["si", "en", "ta", "es"]);

export const mirrorName = (p) => p.replace(/^\//, "").replace(/[^a-zA-Z0-9.-]+/g, "_") + ".json";

async function uidsToBundle() {
  const src = await readFile(path.join(ROOT, "lib", "data", "texts.ts"), "utf8");
  const gatha = await readFile(path.join(ROOT, "lib", "data", "gatha.ts"), "utf8");
  const med = await readFile(path.join(ROOT, "lib", "data", "meditations.ts"), "utf8");
  const uids = new Set();
  for (const s of [src, gatha, med]) for (const m of s.matchAll(/(?:uid|readUid): "([a-z0-9.-]+)"/g)) uids.add(m[1]);
  for (const u of ["patthana1.1", "snp1.8", "kp5", "kp6"]) uids.add(u);
  for (let n = 1; n <= 547; n++) uids.add(`ja${n}`);
  return [...uids];
}

async function get(p, tries = 3) {
  for (let t = 1; t <= tries; t++) {
    try {
      const r = await fetch(API + p, { headers: { "User-Agent": "tripitaka-app bundler" } });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) {
      if (t === tries) throw e;
      await new Promise((res) => setTimeout(res, 1000 * t));
    }
  }
}

const saved = [];
async function save(p) {
  const file = path.join(OUT, mirrorName(p));
  if (!existsSync(file)) {
    const body = await get(p);
    if (body === null) return null;
    await writeFile(file, body);
  }
  saved.push(p);
  return JSON.parse(await readFile(file, "utf8"));
}

async function bundle(uid) {
  const plexPath = `/suttaplex/${uid}?language=en`;
  const plex = await save(plexPath);
  const item = plex?.find?.((x) => x.uid === uid) ?? plex?.[0];
  if (!item) return;
  const hasRoot = item.translations.some((t) => t.is_root && t.lang === "pli");
  if (hasRoot) await save(`/bilarasuttas/${uid}/ms?lang=pli`);
  const trs = item.translations.filter((t) => !t.is_root && LANGS.has(t.lang));
  for (const t of trs) {
    if (t.segmented) await save(`/bilarasuttas/${uid}/${t.author_uid}?lang=${t.lang}`);
    await save(`/suttas/${uid}/${t.author_uid}?lang=${t.lang}`);
  }
  if (!trs.length) await save(`/suttas/${uid}/ms?lang=pli`);
}

async function pool(items, n, fn) {
  let i = 0, done = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const it = items[i++];
        try {
          await fn(it);
        } catch (e) {
          console.warn("skip", it, e.message);
        }
        if (++done % 50 === 0) console.log(`${done}/${items.length}`);
      }
    }),
  );
}

await mkdir(OUT, { recursive: true });
const uids = await uidsToBundle();
console.log(`Bundling ${uids.length} texts…`);
await pool(uids, 6, bundle);
saved.sort();
await writeFile(path.join(OUT, "index.json"), JSON.stringify([...new Set(saved)]));
console.log(`Done: ${saved.length} files.`);
