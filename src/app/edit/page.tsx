"use client";

import dynamic from "next/dynamic";

const PdfRenderer = dynamic(
  () => import("@/components/ResumeRenderer").then((mod) => mod.PdfRenderer),
  {
    ssr: false,
  },
);

export default function Editor() {
  return (
    <main className="h-dvh flex w-screen items-stretch divide-x overflow-hidden">
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-semibold">Edit your resume</h1>
      </div>
      <div className="w-1/2">
        <PdfRenderer data={{}} />
      </div>
    </main>
  );
}
