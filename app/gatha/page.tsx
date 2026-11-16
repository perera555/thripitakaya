import type { Metadata } from "next";
import { GathaView } from "@/components/views/GathaView";

export const metadata: Metadata = { title: "වන්දනා ගාථා · Vandanā & Gāthā" };

export default function Page() {
  return <GathaView />;
}
