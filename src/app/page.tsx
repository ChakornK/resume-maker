"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-dvh flex w-screen flex-col items-center justify-center gap-2 overflow-hidden">
      <h1 className="text-4xl font-semibold">Resume maker</h1>
      <Button onClick={() => router.push("/edit")}>Get started</Button>
    </main>
  );
}
