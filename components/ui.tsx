"use client";

import Link from "next/link";
import { useRef } from "react";
import { PageSpeak } from "./PageSpeak";

/** A card that tilts in 3D toward the pointer, with a soft glare. */
export function TiltCard({
  href,
  className = "",
  children,
  max = 10,
  style,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
  max?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement & HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const cls = `tilt card3d block overflow-hidden ${className}`;
  const inner = (
    <>
      {children}
      <span className="glare" />
    </>
  );
  if (href)
    return (
      <Link ref={ref} href={href} className={cls} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
        {inner}
      </Link>
    );
  return (
    <div ref={ref} className={cls} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
      {inner}
    </div>
  );
}

export function PageHeader({ icon, title, subtitle, children }: { icon?: React.ReactNode; title: React.ReactNode; subtitle?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="relative mb-8 animate-rise">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl card3d" style={{ boxShadow: "var(--shadow), var(--glow)" }}>
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            <span className="text-gradient">{title}</span>
          </h1>
          {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
          <div className="mt-3">
            <PageSpeak />
          </div>
        </div>
      </div>
      {children && <div className="mt-5">{children}</div>}
    </header>
  );
}

export function Section({ title, children, className = "" }: { title?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`mt-10 ${className}`}>
      {title && <h2 className="mb-4 text-xl font-semibold text-gold-2">{title}</h2>}
      {children}
    </section>
  );
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16" role="status">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-gold" />
    </div>
  );
}
