"use client";

import type { Block } from "./sc";

/** Texts saved for offline reading, stored in IndexedDB on this device. */
export type SavedText = {
  key: string; // uid|lang|author
  uid: string;
  title: string;
  subtitle?: string;
  lang: string;
  author?: string;
  blocks: Block[];
  rootBlocks?: Block[];
  savedAt: number;
};

const DB = "tripitaka";
const STORE = "saved";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "key" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const r = fn(db.transaction(STORE, mode).objectStore(STORE));
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

export const savedKey = (uid: string, lang: string, author?: string) => `${uid}|${lang}|${author ?? ""}`;

export async function saveText(t: SavedText) {
  await tx("readwrite", (s) => s.put(t));
}
export async function listSaved(): Promise<SavedText[]> {
  try {
    const all = await tx<SavedText[]>("readonly", (s) => s.getAll() as IDBRequest<SavedText[]>);
    return all.sort((a, b) => b.savedAt - a.savedAt);
  } catch {
    return [];
  }
}
export async function getSaved(key: string): Promise<SavedText | undefined> {
  try {
    return await tx<SavedText | undefined>("readonly", (s) => s.get(key) as IDBRequest<SavedText | undefined>);
  } catch {
    return undefined;
  }
}
export async function findSavedByUid(uid: string): Promise<SavedText | undefined> {
  return (await listSaved()).find((s) => s.uid === uid);
}
export async function removeSaved(key: string) {
  await tx("readwrite", (s) => s.delete(key));
}

/** Download text as a .txt file. */
export function downloadText(filename: string, title: string, blocks: Block[], withPali: boolean, toScript: (s: string) => string) {
  const lines = [title, "=".repeat(Math.min(title.length, 60)), ""];
  for (const b of blocks) {
    if (withPali && b.pali) lines.push(toScript(b.pali));
    if (b.text) lines.push(b.text);
    lines.push("");
  }
  lines.push("— Source: SuttaCentral (suttacentral.net)");
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
