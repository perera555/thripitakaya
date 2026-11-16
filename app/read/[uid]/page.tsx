import { Suspense } from "react";
import { Reader } from "@/components/Reader";
import { Spinner } from "@/components/ui";

export default function Page({ params }: PageProps<"/read/[uid]">) {
  return (
    <Suspense fallback={<Spinner />}>
      {params.then(({ uid }) => (
        <Reader key={uid} uid={decodeURIComponent(uid)} />
      ))}
    </Suspense>
  );
}
