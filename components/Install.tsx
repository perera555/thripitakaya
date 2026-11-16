"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, PlusSquare, Share, X } from "lucide-react";
import { useApp } from "./providers";
import { WheelMark } from "./DharmaWheel";
import type { Lang } from "@/lib/i18n";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Captured once, globally, so any button can trigger the native install prompt (Chrome/Edge/Android).
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

// Apple guide open/close state shared by the header button and the install page.
let guideOpen = false;
const guideSubs = new Set<() => void>();
export function openAppleGuide(open = true) {
  guideOpen = open;
  guideSubs.forEach((f) => f());
}
const subscribeGuide = (f: () => void) => (guideSubs.add(f), () => guideSubs.delete(f));

export type Platform = "ios" | "mac-safari" | "other";
function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const iOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (iOS) return "ios";
  if (/Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox/.test(ua)) return "mac-safari";
  return "other";
}

export function useInstall() {
  const canPrompt = useSyncExternalStore(subscribe, () => !!deferred, () => false);
  const [standalone, setStandalone] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");
  useEffect(() => {
    setStandalone(window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
    setPlatform(detectPlatform());
  }, []);
  const prompt = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice.catch(() => null);
      deferred = null;
      subs.forEach((f) => f());
      return true;
    }
    openAppleGuide();
    return false;
  };
  return { canPrompt, standalone, platform, prompt };
}

/** Header install button: native prompt where supported, otherwise the on-screen install guide. */
export function InstallButton() {
  const { t } = useApp();
  const { standalone, prompt } = useInstall();
  if (standalone) return null;
  return (
    <button className="btn btn-gold h-10 px-3 text-sm sm:px-4" onClick={prompt} aria-label={t("install")}>
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">{t("install")}</span>
    </button>
  );
}

const STEPS: Record<"ios" | "mac-safari" | "other", Record<Lang, string[]>> = {
  ios: {
    si: ["පහළ (iPad හි ඉහළ) ඇති Share බොත්තම ඔබන්න", "පහළට ගොස් “Add to Home Screen” ඔබන්න", "දකුණු පස ඉහළ “Add” ඔබන්න — ඇප් එක Home Screen හි දිස් වේ"],
    en: ["Tap the Share button at the bottom (top on iPad)", "Scroll down and tap “Add to Home Screen”", "Tap “Add” at the top right — the app appears on your Home Screen"],
    ta: ["கீழே (iPad இல் மேலே) உள்ள Share பொத்தானை அழுத்தவும்", "கீழே சென்று “Add to Home Screen” அழுத்தவும்", "மேலே வலதுபுறம் “Add” அழுத்தவும்"],
    es: ["Toca el botón Compartir abajo (arriba en iPad)", "Desplázate y toca «Añadir a pantalla de inicio»", "Toca «Añadir» arriba a la derecha"],
  },
  "mac-safari": {
    si: ["මෙනු තීරුවේ “File” ඔබන්න", "“Add to Dock…” තෝරන්න", "“Add” ඔබන්න — ඇප් එක Dock හි සහ Launchpad හි දිස් වේ"],
    en: ["Click “File” in the menu bar", "Choose “Add to Dock…”", "Click “Add” — the app appears in the Dock and Launchpad"],
    ta: ["மெனு பட்டியில் “File” அழுத்தவும்", "“Add to Dock…” தேர்வு செய்யவும்", "“Add” அழுத்தவும்"],
    es: ["Haz clic en «Archivo» en la barra de menús", "Elige «Añadir al Dock…»", "Haz clic en «Añadir»"],
  },
  other: {
    si: ["බ්‍රව්සරයේ මෙනුව (⋮ හෝ ⋯) විවෘත කරන්න", "“Install app” / “Add to Home screen” තෝරන්න", "“Install” ඔබන්න"],
    en: ["Open the browser menu (⋮ or ⋯)", "Choose “Install app” / “Add to Home screen”", "Tap “Install”"],
    ta: ["உலாவி மெனுவை (⋮) திறக்கவும்", "“Install app” தேர்வு செய்யவும்", "“Install” அழுத்தவும்"],
    es: ["Abre el menú del navegador (⋮)", "Elige «Instalar app»", "Toca «Instalar»"],
  },
};

const TITLE: Record<Lang, string> = {
  si: "ඇප් එක ස්ථාපනය කරන්න",
  en: "Install the app",
  ta: "செயலியை நிறுவுங்கள்",
  es: "Instala la app",
};
const NOT_SAFARI: Record<Lang, string> = {
  si: "iPhone/iPad හි මෙය Safari (හෝ Chrome හි ⬆️ Share) හරහා පමණක් කළ හැක.",
  en: "On iPhone/iPad this works from Safari (or the ⬆️ Share button in Chrome).",
  ta: "iPhone/iPad இல் Safari மூலம் மட்டுமே இது செயல்படும்.",
  es: "En iPhone/iPad funciona desde Safari (o el botón ⬆️ Compartir en Chrome).",
};

/** On-screen guide for Apple devices (and browsers without an install prompt). Shown once automatically on iPhone/iPad. */
export function AppleInstallGuide() {
  const { lang } = useApp();
  const open = useSyncExternalStore(subscribeGuide, () => guideOpen, () => false);
  const { standalone, platform } = useInstall();

  useEffect(() => {
    if (standalone || platform !== "ios") return;
    let seen = false;
    try {
      seen = !!localStorage.getItem("tp.iosGuide");
      localStorage.setItem("tp.iosGuide", "1");
    } catch {}
    if (!seen) {
      const id = setTimeout(() => openAppleGuide(), 4000);
      return () => clearTimeout(id);
    }
  }, [standalone, platform]);

  if (!open || standalone) return null;
  const steps = STEPS[platform][lang];
  const icons = platform === "ios" ? [<Share key="s" className="h-5 w-5" />, <PlusSquare key="p" className="h-5 w-5" />, <span key="a" className="text-sm font-bold">Add</span>] : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close" onClick={() => openAppleGuide(false)} />
      <div className="card3d relative m-3 w-full max-w-md p-6 animate-rise" style={{ marginBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}>
        <button className="btn btn-ghost absolute right-3 top-3 h-9 w-9 p-0" onClick={() => openAppleGuide(false)} aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <div className="mb-5 flex items-center gap-3">
          <WheelMark className="h-12 w-12" />
          <div>
            <p className="text-lg font-bold text-gradient">{TITLE[lang]}</p>
            <p className="text-xs text-muted">{platform === "ios" ? "iPhone · iPad" : platform === "mac-safari" ? "Mac · Safari" : ""}</p>
          </div>
        </div>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-2 to-saffron text-[#1d1205]">
                {icons ? icons[i] : <span className="font-bold">{i + 1}</span>}
              </span>
              <span className="text-[15px] leading-snug">{s}</span>
            </li>
          ))}
        </ol>
        {platform === "ios" && <p className="mt-5 text-xs text-muted">{NOT_SAFARI[lang]}</p>}
        {platform === "ios" && (
          <div className="pointer-events-none mt-4 flex justify-center text-gold sm:hidden" aria-hidden>
            <span className="animate-bounce text-2xl">⬇</span>
          </div>
        )}
      </div>
    </div>
  );
}
