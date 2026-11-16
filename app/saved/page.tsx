import type { Metadata } from "next";
import { SavedView } from "@/components/views/MoreViews";

export const metadata: Metadata = { title: "සුරැකි පාඨ · Saved" };

export default function Page() {
  return <SavedView />;
}
