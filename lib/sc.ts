/**
 * Client for the public SuttaCentral API (https://suttacentral.net).
 * Responses are memoised in memory and cached for offline use by the service worker.
 */

const API = "https://suttacentral.net/api";

const memo = new Map<string, Promise<unknown>>();

async function getJSON<T>(path: string): Promise<T> {
  const url = `${API}${path}`;
  const hit = memo.get(url);
  if (hit) return hit as Promise<T>;
  const p = fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json() as Promise<T>;
    })
    .catch((e) => {
      memo.delete(url);
      throw e;
    });
  memo.set(url, p);
  return p;
}

export type ScTranslation = {
  lang: string;
  lang_name: string;
  is_root: boolean;
  author: string;
  author_short: string;
  author_uid: string;
  segmented: boolean;
  title?: string | null;
};

export type Suttaplex = {
  uid: string;
  acronym: string | null;
  original_title: string;
  translated_title: string | null;
  blurb: string | null;
  type: "leaf" | "branch";
  translations: ScTranslation[];
};

export type MenuNode = {
  uid: string;
  root_name?: string;
  translated_name?: string;
  acronym?: string;
  blurb?: string;
  node_type: "root" | "branch" | "leaf";
  has_children?: boolean;
  child_range?: string | null;
  children?: MenuNode[];
};

export async function getSuttaplex(uid: string): Promise<Suttaplex | null> {
  const list = await getJSON<Suttaplex[]>(`/suttaplex/${encodeURIComponent(uid)}?language=en`);
  return list.find((x) => x.uid === uid) ?? list[0] ?? null;
}

export async function getMenu(uid: string): Promise<MenuNode | null> {
  const list = await getJSON<MenuNode[]>(`/menu/${encodeURIComponent(uid)}?language=en`);
  return list[0] ?? null;
}

/** A readable block of text (heading, paragraph or verse). */
export type Block = {
  id: string;
  kind: "h" | "p" | "verse" | "note";
  pali?: string;
  text?: string;
};

type Bilara = {
  keys_order: string[];
  html_text: Record<string, string>;
  root_text: Record<string, string>;
  translation_text?: Record<string, string>;
};

function stripTags(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function bilaraToBlocks(d: Bilara): Block[] {
  const blocks: Block[] = [];
  let cur: Block | null = null;
  let pali: string[] = [];
  let text: string[] = [];

  const flush = () => {
    if (!cur) return;
    const sep = cur.kind === "verse" ? "\n" : " ";
    const p = pali.join(sep).trim();
    const t = text.join(sep).trim();
    if (p || t) blocks.push({ ...cur, pali: p || undefined, text: t || undefined });
    cur = null;
    pali = [];
    text = [];
  };

  for (const key of d.keys_order) {
    const html = d.html_text[key] ?? "{}";
    const opens = /<(p|h\d|blockquote|li|dt|dd)[\s>]/i.test(html);
    if (opens || !cur) {
      flush();
      const kind: Block["kind"] = /<h\d/i.test(html) ? "h" : /verse-line|gatha/.test(html) ? "verse" : "p";
      cur = { id: key, kind };
    }
    const r = d.root_text[key];
    const t = d.translation_text?.[key];
    if (r) pali.push(stripTags(r).trim());
    if (t) text.push(stripTags(t).trim());
    if (/<\/(p|h\d|li|dd|dt)>/i.test(html)) flush();
  }
  flush();
  // Skip the leading collection label (e.g. "Sutta Nipāta 1.8") — the page shows its own title.
  return blocks;
}

export async function getSegmented(uid: string, author: string, lang: string): Promise<Block[]> {
  const d = await getJSON<Bilara>(
    `/bilarasuttas/${encodeURIComponent(uid)}/${encodeURIComponent(author)}?lang=${lang}`,
  );
  return bilaraToBlocks(d);
}

/** Pāli root text only (Mahāsaṅgīti edition). */
export async function getRoot(uid: string): Promise<Block[]> {
  const d = await getJSON<Bilara>(`/bilarasuttas/${encodeURIComponent(uid)}/ms?lang=pli`);
  return bilaraToBlocks({ ...d, translation_text: undefined });
}

type LegacyResponse = {
  translation?: {
    text?: string;
    title?: string;
    author?: string;
    previous?: { uid?: string; name?: string | null };
    next?: { uid?: string; name?: string | null };
  };
  root_text?: {
    previous?: { uid?: string; name?: string | null };
    next?: { uid?: string; name?: string | null };
  };
};

/** Parses a legacy (non-segmented) HTML translation into plain-text blocks. Runs in the browser. */
function legacyHtmlToBlocks(html: string): Block[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("a.ref, .ref, sup, script, style, header ul, .hgroup .division").forEach((n) => n.remove());
  const root = doc.querySelector("article") ?? doc.body;
  const blocks: Block[] = [];
  let n = 0;

  const textOf = (el: Element) => {
    const clone = el.cloneNode(true) as Element;
    clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
    return (clone.textContent ?? "")
      .replace(/[ \t\r]+/g, " ")
      .replace(/ *\n */g, "\n")
      .trim();
  };

  const walk = (el: Element, inVerse: boolean) => {
    for (const child of Array.from(el.children)) {
      const tag = child.tagName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        const t = textOf(child);
        if (t) blocks.push({ id: `l${n++}`, kind: "h", text: t });
      } else if (tag === "p" || tag === "li" || tag === "dd" || tag === "dt") {
        const t = textOf(child);
        if (t) blocks.push({ id: `l${n++}`, kind: inVerse || t.includes("\n") ? "verse" : "p", text: t });
      } else if (tag === "footer") {
        const t = Array.from(child.querySelectorAll("p")).map(textOf).filter(Boolean).join(" ");
        if (t) blocks.push({ id: `l${n++}`, kind: "note", text: t });
      } else if (tag === "blockquote") {
        walk(child, true);
      } else if (child.children.length) {
        walk(child, inVerse);
      } else {
        const t = textOf(child);
        if (t) blocks.push({ id: `l${n++}`, kind: "p", text: t });
      }
    }
  };
  walk(root, false);
  return blocks;
}

export type Neighbours = { prev?: { uid: string; name?: string | null }; next?: { uid: string; name?: string | null } };

export async function getLegacy(uid: string, author: string, lang: string): Promise<{ blocks: Block[]; nav: Neighbours }> {
  const d = await getJSON<LegacyResponse>(
    `/suttas/${encodeURIComponent(uid)}/${encodeURIComponent(author)}?lang=${lang}`,
  );
  const blocks = d.translation?.text ? legacyHtmlToBlocks(d.translation.text) : [];
  return { blocks, nav: navFrom(d) };
}

function navFrom(d: LegacyResponse): Neighbours {
  const src = d.translation ?? d.root_text;
  const prev = src?.previous?.uid ? { uid: src.previous.uid, name: src.previous.name } : undefined;
  const next = src?.next?.uid ? { uid: src.next.uid, name: src.next.name } : undefined;
  return { prev, next };
}

export async function getNeighbours(uid: string, author: string, lang: string): Promise<Neighbours> {
  try {
    const d = await getJSON<LegacyResponse>(
      `/suttas/${encodeURIComponent(uid)}/${encodeURIComponent(author)}?lang=${lang}`,
    );
    return navFrom(d);
  } catch {
    return {};
  }
}
