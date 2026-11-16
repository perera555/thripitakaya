"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { useApp } from "./providers";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Captured once, globally, so any button can trigger the native install prompt.
let deferred: BIPEvent | null = null;
const subs = new Set<() => void>();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BIPEvent;
    subs.forEach((f) => f());
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    subs.forEach((f) => f());
  });
}
const subscribe = (f: () => void) => (subs.add(f), () => subs.delete(f));

export function useInstall() {
  const canPrompt = useSyncExternalStore(subscribe, () => !!deferred, () => false);
  const [standalone, setStandalone] = useState(false);
  useEffect(() => {
    setStandalone(window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
  }, []);
  const prompt = async () => {
    if (!deferred) return false;
    await deferred.prompt();
    await deferred.userChoice.catch(() => null);
    deferred = null;
    subs.forEach((f) => f());
    return true;
  };
  return { canPrompt, standalone, prompt };
}

/** Header install button: native prompt when available, otherwise the instructions page. */
export function InstallButton() {
  const { t } = useApp();
  const { canPrompt, standalone, prompt } = useInstall();
  if (standalone) return null;
  const cls = "btn btn-gold h-10 px-3 text-sm sm:px-4";
  if (canPrompt)
    return (
      <button className={cls} onClick={prompt}>
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">{t("install")}</span>
      </button>
    );
  return (
    <Link href="/install" className={cls} aria-label={t("install")}>
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">{t("install")}</span>
    </Link>
  );
}
