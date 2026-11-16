"use client";

import { useApp } from "./providers";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="mx-auto mb-20 w-full max-w-7xl px-4 py-8 text-center text-sm text-muted md:mb-0">
      <p className="text-gold-2">සබ්බදානං ධම්මදානං ජිනාති — The gift of Dhamma excels all gifts.</p>
      <p className="mt-2">
        {t("source")} ·{" "}
        <a className="underline" href="https://suttacentral.net" target="_blank" rel="noopener noreferrer">
          suttacentral.net
        </a>
      </p>
      <p className="mt-3 font-semibold text-ink/80">© 2026 Porage Thamara Dhanushka Perera</p>
      <p className="mt-1 text-xs">{t("copyrightNote")}</p>
    </footer>
  );
}
