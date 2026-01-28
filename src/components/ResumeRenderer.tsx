"use client";

import { pdf } from "@react-pdf/renderer";
import { Document as DocumentViewer, Page as PageViewer, pdfjs } from "react-pdf";
import { JSX, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ResumeData } from "@/lib/types";
import { ResumeDocument } from "./ResumeGenerator";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export const PdfRenderer = ({ data }: { data: ResumeData }) => {
  const [resumePdf, setResumePdf] = useState<JSX.Element | null>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    (async () => {
      setResumePdf(<ResumeDocument data={data} />);
    })();
  }, [data]);

  useEffect(() => {
    (async () => {
      if (resumePdf) {
        const blob = await pdf(resumePdf).toBlob();
        setUrl(URL.createObjectURL(blob));
      }
    })();

    return () => {
      if (url) {
        for (const iframe of document.querySelectorAll(`iframe[src="${url}"]`)) {
          iframe.remove();
        }
        URL.revokeObjectURL(url);
      }
    };
  }, [resumePdf]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const observer = new ResizeObserver((entries) => {
        setContainerWidth(entries[0].contentRect.width);
      });
      observer.observe(container);
      return () => {
        observer.disconnect();
      };
    }
  }, [containerRef]);

  return (
    <div className="flex h-full w-full flex-col items-stretch">
      <div className="flex items-center justify-end gap-2 border-b px-8 py-4">
        <Button
          variant={"outline"}
          onClick={() => {
            const existing: HTMLIFrameElement | null = document.querySelector(`iframe[src="${url}"]`);
            if (existing) {
              existing.contentWindow?.print();
              return;
            }
            const iframe = document.createElement("iframe");
            iframe.src = url;
            iframe.style.display = "none";
            iframe.addEventListener("load", () => {
              iframe.contentWindow?.print();
            });
            document.body.appendChild(iframe);
          }}
          disabled={!url}
        >
          Print
        </Button>
        <Button
          onClick={() => {
            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.pdf";
            a.click();
          }}
          disabled={!url}
        >
          Download PDF
        </Button>
      </div>
      <div className="grow overflow-auto p-8" ref={containerRef}>
        <DocumentViewer className="mx-auto w-fit" file={url} scale={containerWidth / 612}>
          <PageViewer pageIndex={0} />
        </DocumentViewer>
      </div>
    </div>
  );
};
