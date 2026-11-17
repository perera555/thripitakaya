import type { Metadata } from "next";
import { ReviewsView } from "@/components/views/ReviewsView";

export const metadata: Metadata = { title: "අදහස් · Reviews" };

export default function Page() {
  return <ReviewsView />;
}
