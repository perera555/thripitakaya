import { Suspense } from "react";
import { BrowseView } from "@/components/views/TipitakaView";
import { Spinner } from "@/components/ui";

export default function Page({ params }: PageProps<"/tipitaka/[uid]">) {
  return (
    <Suspense fallback={<Spinner />}>
      {params.then(({ uid }) => (
        <BrowseView uid={decodeURIComponent(uid)} />
      ))}
    </Suspense>
  );
}
