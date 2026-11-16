/** Dhamma wheel artwork for generated PNG icons (rendered by next/og). */
export function IconArt({ size, padding = 0.14 }: { size: number; padding?: number }) {
  const inner = size * (1 - padding * 2);
  const spokes = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 40%, #3a1f4f 0%, #160f2b 55%, #0b0915 100%)",
      }}
    >
      <svg width={inner} height={inner} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1c2" />
            <stop offset="0.4" stopColor="#f6c453" />
            <stop offset="1" stopColor="#c27410" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="84" fill="none" stroke="url(#g)" strokeWidth="11" />
        <circle cx="100" cy="100" r="22" fill="none" stroke="url(#g)" strokeWidth="9" />
        <circle cx="100" cy="100" r="9" fill="url(#g)" />
        {spokes.map((a) => (
          <line key={a} x1="100" y1="78" x2="100" y2="22" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" transform={`rotate(${a} 100 100)`} />
        ))}
        {spokes.map((a) => (
          <circle key={`k${a}`} cx="100" cy="8" r="7" fill="url(#g)" transform={`rotate(${a + 22.5} 100 100)`} />
        ))}
      </svg>
    </div>
  );
}
