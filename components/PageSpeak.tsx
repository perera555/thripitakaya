"use client";

import { useState } from "react";
import { Pause, Volume2 } from "lucide-react";
import { useSpeech } from "@/lib/useSpeech";
import { LANGS } from "@/lib/i18n";
import { useApp } from "./providers";

/** Reads the visible text of the current page aloud, in the chosen language. */
export function PageSpeak() {
  const { t, lang } = useApp();
  const sp = useSpeech();
  const [busy, setBusy] = useState(false);
  if (!sp.supported) return null;

  const run = () => {
    if (sp.speaking) return sp.stop();
    setBusy(true);
    const main = document.querySelector("main");
    const lines = (main?.innerText ?? "")
      .split(/\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && /\p{L}/u.test(s));
    const unique = lines.filter((s, i) => lines.indexOf(s) === i).slice(0, 120);
    const speech = LANGS.find((l) => l.code === lang)!.speech;
    sp.speak(
      unique.map((text) => ({ text, lang: /[඀-෿]/.test(text) ? "si-LK" : /[஀-௿]/.test(text) ? "ta-IN" : speech })),
      0,
      { onDone: () => setBusy(false) },
    );
  };

  return (
    <button className="btn btn-ghost px-3 py-1.5 text-sm" onClick={run} aria-label={t("listen")}>
      {sp.speaking || (busy && sp.speaking) ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-gold" />}
      {sp.speaking ? t("stop") : `${t("listen")}`}
    </button>
  );
}
