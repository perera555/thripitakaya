import { ImageResponse } from "next/og";
import { IconArt } from "@/lib/icon-art";

const KINDS: Record<string, { size: number; padding: number }> = {
  "icon-192": { size: 192, padding: 0.06 },
  "icon-512": { size: 512, padding: 0.06 },
  "maskable-512": { size: 512, padding: 0.2 },
};

export function generateStaticParams() {
  return Object.keys(KINDS).map((kind) => ({ kind }));
}

export async function GET(_req: Request, ctx: RouteContext<"/pwa/[kind]">) {
  const { kind } = await ctx.params;
  const k = KINDS[kind] ?? KINDS["icon-512"];
  return new ImageResponse(<IconArt size={k.size} padding={k.padding} />, { width: k.size, height: k.size });
}
