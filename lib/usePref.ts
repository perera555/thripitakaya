"use client";

import { useCallback, useEffect, useState } from "react";

/** A per-device preference stored in localStorage (falls back to memory). */
export function usePref<T extends string | number>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`tp.${key}`);
      if (raw !== null) setValue((typeof initial === "number" ? Number(raw) : raw) as T);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (v: T) => {
      setValue(v);
      try {
        localStorage.setItem(`tp.${key}`, String(v));
      } catch {}
    },
    [key],
  );
  return [value, set];
}
