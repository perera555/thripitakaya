import type { Metadata } from "next";
import { DeshanaView } from "@/components/views/MoreViews";

export const metadata: Metadata = { title: "ධර්ම දේශනා · Dhamma Talks" };

export default function Page() {
  return <DeshanaView />;
}
