import type { Metadata } from "next";
import { SutrasView } from "@/components/views/TextsView";

export const metadata: Metadata = { title: "සූත්‍ර · Suttas" };

export default function Page() {
  return <SutrasView />;
}
