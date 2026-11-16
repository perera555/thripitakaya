import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MeditationDetail } from "@/components/views/MeditationView";
import { getMeditation, MEDITATIONS } from "@/lib/data/meditations";

export function generateStaticParams() {
  return MEDITATIONS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/meditation/[slug]">): Promise<Metadata> {
  const m = getMeditation((await params).slug);
  return { title: m ? `${m.name.si} · ${m.name.en}` : "Meditation" };
}

export default async function Page({ params }: PageProps<"/meditation/[slug]">) {
  const m = getMeditation((await params).slug);
  if (!m) notFound();
  return <MeditationDetail m={m} />;
}
