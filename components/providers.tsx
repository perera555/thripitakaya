"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { DEFAULT_LANG, LANGS, translate, type Lang, type StringKey } from "@/lib/i18n";

type Theme = "dark" | "light";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

/** A tiny localStorage-backed store usable with useSyncExternalStore. */
function createStore<T extends string>(key: string, fallback: T, valid: (v: string) => v is T) {
  const listeners = new Set<() => void>();
  let cached: T | null = null;
  const read = (): T => {
    if (cached) return cached;
    const v = safeGet(key);
    cached = v && valid(v) ? v : fallback;
    return cached;
  };
  return {
    get: read,
    server: () => fallback,
    set(v: T) {
      cached = v;
      safeSet(key, v);
      listeners.forEach((l) => l());
    },
    subscribe(l: () => void) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

const langStore = createStore<Lang>("tp.lang", DEFAULT_LANG, (v): v is Lang => LANGS.some((l) => l.code === v));
const themeStore = createStore<Theme>("tp.theme", "dark", (v): v is Theme => v === "dark" || v === "light");

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: StringKey, vars?: Record<string, string>) => string;
};

const AppContext = createContext<Ctx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(langStore.subscribe, langStore.get, langStore.server);
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.get, themeStore.server);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const t = useCallback((key: StringKey, vars?: Record<string, string>) => translate(key, lang, vars), [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang: langStore.set, theme, setTheme: themeStore.set, t }),
    [lang, theme, t],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <Providers>");
  return ctx;
}

/** Small client component for translated text inside server components. */
export function T({ k }: { k: StringKey }) {
  const { t } = useApp();
  return <>{t(k)}</>;
}
