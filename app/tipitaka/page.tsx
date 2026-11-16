import type { Metadata } from "next";
import { TipitakaView } from "@/components/views/TipitakaView";

export const metadata: Metadata = { title: "ත්‍රිපිටකය · Tipiṭaka" };

export default function Page() {
  return <TipitakaView />;
}
