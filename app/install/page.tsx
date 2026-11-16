import type { Metadata } from "next";
import { InstallView } from "@/components/views/MoreViews";

export const metadata: Metadata = { title: "ස්ථාපනය · Install" };

export default function Page() {
  return <InstallView />;
}
