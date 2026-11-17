"use client";

import type { Block } from "./sc";

const memo = new Map<string, Promise<string>>();

function pieces(text: string, max = 1400): string[] {
  if (text.length <= max) return [text];
  const out: string[] = [];
  let buf = "";
  for (const s of text.split(/(?<=[.!?;:”"])\s+/)) {
    if ((buf + " " + s).length > max && buf) {
      out.push(buf);
      buf = s;
    } else buf = buf ? `${buf} ${s}` : s;
  }
  if (buf) out.push(buf);
  return out;
}

function translateOne(q: string, to: string): Promise<string> {
  const key = `${to}|${q}`;
  let p = memo.get(key);
  if (!p) {
    p = fetch(`/api/translate?${new URLSearchParams({ to, q })}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { t?: string }) => d.t || q)
      .catch((e) => {
        memo.delete(key);
        throw e;
      });
    memo.set(key, p);
  }
  return p;
}

/** Machine-translates the text of each block (Pāli is kept as is). */
export async function translateBlocks(blocks: Block[], to: string, onProgress?: (done: number, total: number) => void): Promise<Block[]> {
  const jobs: { bi: number; parts: string[] }[] = blocks
    .map((b, bi) => ({ bi, parts: b.text && b.kind !== "note" ? pieces(b.text) : [] }))
    .filter((j) => j.parts.length);
  const total = jobs.reduce((n, j) => n + j.parts.length, 0);
  const results = new Map<number, string[]>();
  let done = 0;
  const queue = jobs.flatMap((j) => j.parts.map((q, pi) => ({ bi: j.bi, pi, q })));
  let next = 0;
  const worker = async () => {
    while (next < queue.length) {
      const job = queue[next++];
      let t = job.q;
      try {
        t = await translateOne(job.q, to);
      } catch {}
      const arr = results.get(job.bi) ?? [];
      arr[job.pi] = t;
      results.set(job.bi, arr);
      onProgress?.(++done, total);
    }
  };
  await Promise.all(Array.from({ length: 5 }, worker));
  return blocks.map((b, bi) => (results.has(bi) ? { ...b, text: results.get(bi)!.join(" ") } : b));
}
