"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import {
  BookOpen, Bookmark, Download, Star, Flower2, Home, Library, Menu, Moon, Music2, ScrollText, Sparkles, Sun, Video, X, Landmark, Network,
} from "lucide-react";
import { LANGS, type StringKey } from "@/lib/i18n";
import { useApp } from "./providers";
import { WheelMark } from "./DharmaWheel";
import { InstallButton } from "./Install";

type NavItem = { href: string; key: StringKey; icon: React.ComponentType<{ className?: string }> };

export const NAV: NavItem[] = [
  { href: "/", key: "home", icon: Home },
  { href: "/tipitaka", key: "tipitaka", icon: Library },
  { href: "/sutras", key: "sutras", icon: ScrollText },
  { href: "/pirith", key: "pirith", icon: Music2 },
  { href: "/gatha", key: "gatha", icon: Landmark },
  { href: "/jataka", key: "jataka", icon: BookOpen },
  { href: "/meditation", key: "meditation", icon: Flower2 },
  { href: "/patthana", key: "patthana", icon: Network },
  { href: "/books", key: "books", icon: Sparkles },
  { href: "/deshana", key: "deshana", icon: Video },
  { href: "/reviews", key: "reviews", icon: Star },
  { href: "/saved", key: "saved", icon: Bookmark },
  { href: "/install", key: "install", icon: Download },
];

const BOTTOM = ["/", "/tipitaka", "/pirith", "/jataka", "/meditation"];

function isActive(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useApp();
  return (
    <div role="radiogroup" aria-label={t("language")} className="flex rounded-full border border-line bg-card-2/60 p-0.5">
      {LANGS.map((l) => (
        <button
          key={l.code}
          role="radio"
          aria-checked={lang === l.code}
          onClick={() => setLang(l.code)}
          className={`rounded-full px-2.5 py-1 text-sm font-semibold transition ${lang === l.code ? "bg-gradient-to-br from-gold-2 to-gold text-[#1d1205] shadow" : "text-muted hover:text-ink"}`}
          title={l.label}
        >
          {compact ? l.short : l.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t, theme, setTheme } = useApp();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // close the drawer when this view is hidden/navigated
  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <>
      <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <WheelMark className="h-9 w-9 drop-shadow-[0_0_10px_rgba(244,185,66,0.5)]" />
            <span className="text-lg font-bold">
              <span className="text-gradient">{t("appName")}</span>
            </span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 2xl:flex">
            {NAV.slice(1, 10).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${isActive(path, n.href) ? "bg-card-2 text-gold-2" : "text-muted hover:text-ink"}`}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <InstallButton />
            <div className="hidden sm:block">
              <LanguageSwitcher compact />
            </div>
            <button
              className="btn-ghost btn h-10 w-10 p-0"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t("theme")}
              title={theme === "dark" ? t("light") : t("dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="btn-ghost btn h-10 w-10 p-0" onClick={() => setOpen(true)} aria-label={t("menu")}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-center px-4 pb-2 sm:hidden">
          <LanguageSwitcher compact />
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close" onClick={() => setOpen(false)} />
          <aside className="glass absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col p-5 animate-rise">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-gold-2">{t("menu")}</span>
              <button className="btn-ghost btn h-10 w-10 p-0" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            <nav className="no-scrollbar -mx-2 flex-1 overflow-y-auto">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${isActive(path, n.href) ? "bg-card-2 text-gold-2" : "hover:bg-card-2/60"}`}
                >
                  <n.icon className="h-5 w-5 text-gold" />
                  <span>{t(n.key)}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export function BottomNav() {
  const { t } = useApp();
  const path = usePathname();
  return (
    <nav className="glass safe-bottom fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {NAV.filter((n) => BOTTOM.includes(n.href)).map((n) => {
          const active = isActive(path, n.href);
          return (
            <Link key={n.href} href={n.href} className={`flex flex-col items-center gap-0.5 py-2 text-[11px] ${active ? "text-gold-2" : "text-muted"}`}>
              <n.icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_8px_rgba(244,185,66,0.7)]" : ""}`} />
              <span className="max-w-full truncate px-1">{t(n.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
