"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function useLocalStorageJson<T>(key: string, defaultValue: T) {
  if (typeof window === "undefined") return [defaultValue, () => {}] as const;

  const [persistData, setPersistData] = useLocalStorage<string>(key, JSON.stringify(defaultValue));
  const [data, setData] = useState<T>(JSON.parse(persistData));
  useEffect(() => {
    setPersistData(JSON.stringify(data));
  }, [data, setPersistData]);

  return [data, setData] as const;
}
