import type { Metadata } from "next";
import { PirithView } from "@/components/views/TextsView";

export const metadata: Metadata = { title: "පිරිත් · Pirith" };

export default function Page() {
  return <PirithView />;
}
