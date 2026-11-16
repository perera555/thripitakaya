import type { Metadata } from "next";
import { MeditationList } from "@/components/views/MeditationView";

export const metadata: Metadata = { title: "භාවනා · Meditation" };

export default function Page() {
  return <MeditationList />;
}
