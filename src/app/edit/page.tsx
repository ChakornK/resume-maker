"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ResumeData } from "@/lib/types";

const PdfRenderer = dynamic(() => import("@/components/ResumeRenderer"), {
  ssr: false,
});
const EditorForm = dynamic(() => import("@/components/EditorForm"), {
  ssr: false,
});

export default function Editor() {
  const [debouncedData, setDebouncedData] = useState<ResumeData>({} as ResumeData);

  return (
    <main className="h-dvh flex w-screen items-stretch divide-x overflow-hidden">
      <div className="flex w-1/2 flex-col">
        <h1 className="p-8 pb-4 text-3xl font-semibold">Edit your resume</h1>

        <div className="grow overflow-y-auto p-8">
          <EditorForm onDataChange={setDebouncedData} />
        </div>
      </div>
      <div className="w-1/2">
        <PdfRenderer data={debouncedData} />
      </div>
    </main>
  );
}
