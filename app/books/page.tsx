import type { Metadata } from "next";
import { BooksView } from "@/components/views/MoreViews";

export const metadata: Metadata = { title: "රේරුකානේ හිමියන්ගේ පොත් · Books" };

export default function Page() {
  return <BooksView />;
}
