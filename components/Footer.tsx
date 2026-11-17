"use client";

import { useApp } from "./providers";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="mx-auto mb-20 w-full max-w-7xl px-4 py-8 text-center text-sm text-muted md:mb-0">
      <div className="card3d mx-auto mb-5 max-w-3xl p-4 text-left">
        <p className="font-bold text-gold-2">🪷 {t("dedicationTitle")}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/90">{t("dedication")}</p>
        <p className="mt-1 text-sm font-semibold text-gold">සාධු! සාධු! සාධු!</p>
      </div>
      <p className="text-gold-2">සබ්බදානං ධම්මදානං ජිනාති — The gift of Dhamma excels all gifts.</p>
      <p className="mt-2">{t("source")}</p>
      <p className="mt-3 font-semibold text-ink/80">© 2026 Porage Thamara Dhanushka Perera</p>
      <p className="mt-1 text-xs">{t("copyrightNote")}</p>
    </footer>
  );
}
