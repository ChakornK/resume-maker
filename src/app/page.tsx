import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-dvh flex w-screen flex-col items-center justify-center gap-2 overflow-hidden bg-black text-white">
      <h1 className="text-4xl font-semibold">Resume maker</h1>
      <Button>Get started</Button>
    </main>
  );
}
