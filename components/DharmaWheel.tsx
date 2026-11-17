/** A golden Dhammacakka rendered in CSS 3D: stacked layers give it real thickness as it sways and turns. */
export function DharmaWheel({ size = 260, className = "" }: { size?: number; className?: string }) {
  const layers = [-7, -5, -3, -1, 1, 3, 5, 7];
  return (
    <div className={`scene relative ${className}`} style={{ width: size, height: size }} aria-hidden>
      <div className="absolute inset-[-18%] rounded-full animate-halo" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 45%, transparent) 0%, transparent 65%)", filter: "blur(10px)" }} />
      <div className="preserve-3d absolute inset-0" style={{ animation: "wheel-sway 14s ease-in-out infinite" }}>
        <div className="preserve-3d absolute inset-0" style={{ animation: "wheel-turn 60s linear infinite" }}>
          {layers.map((z, i) => (
            <div key={z} className="absolute inset-0" style={{ transform: `translateZ(${z}px)`, filter: i < layers.length - 1 ? `brightness(${0.45 + i * 0.07})` : "none" }}>
              <WheelSvg front={i === layers.length - 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WheelSvg({ front }: { front: boolean }) {
  const spokes = Array.from({ length: 8 }, (_, i) => i * 45);
  const id = front ? "wg-front" : "wg-back";
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0" stopColor="#fff1c2" />
          <stop offset="0.35" stopColor="#f6c453" />
          <stop offset="0.7" stopColor="#d48a12" />
          <stop offset="1" stopColor="#8a4f05" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeLinecap="round">
        <circle cx="100" cy="100" r="86" strokeWidth="9" />
        <circle cx="100" cy="100" r="74" strokeWidth="2.5" opacity="0.8" />
        <circle cx="100" cy="100" r="20" strokeWidth="7" />
        {spokes.map((a) => (
          <line key={a} x1="100" y1="80" x2="100" y2="28" strokeWidth="6" transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
      <g fill={`url(#${id})`}>
        <circle cx="100" cy="100" r="9" />
        {spokes.map((a) => (
          <circle key={a} cx="100" cy="6" r="6.5" transform={`rotate(${a + 22.5} 100 100)`} />
        ))}
        {spokes.map((a) => (
          <path key={`l${a}`} d="M100 30 q-6 -9 0 -16 q6 7 0 16z" transform={`rotate(${a + 22.5} 100 100)`} opacity="0.9" />
        ))}
      </g>
      {front && <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeDasharray="40 500" transform="rotate(-50 100 100)" />}
    </svg>
  );
}

/** Small flat logo mark. */
export function WheelMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden>
      <WheelSvg front />
    </span>
  );
}
