"use client";

import { useEffect } from "react";

/** Friendly error screen (instead of a blank "Application error"), with the detail shown for reporting. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="card3d mx-auto mt-10 max-w-md p-6 text-center">
      <p className="text-5xl">🪷</p>
      <h1 className="mt-3 text-xl font-bold text-gold-2">සමාවන්න, දෝෂයක් ඇති විය · Something went wrong</h1>
      <p className="mt-2 text-sm text-muted">
        කරුණාකර නැවත උත්සාහ කරන්න. ගැටලුව දිගටම පවතී නම්, පහත පණිවිඩයේ screenshot එකක් එවන්න.
        <br />
        Please try again. If it keeps happening, send a screenshot of the message below.
      </p>
      <pre className="mt-3 max-h-32 overflow-auto whitespace-pre-wrap rounded-xl bg-bg/60 p-3 text-left text-xs text-muted">
        {String(error?.message || error)}
        {error?.digest ? `\n#${error.digest}` : ""}
      </pre>
      <div className="mt-5 flex justify-center gap-3">
        <button className="btn btn-gold" onClick={() => reset()}>
          නැවත උත්සාහ කරන්න · Retry
        </button>
        <button className="btn btn-ghost" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    </div>
  );
}
