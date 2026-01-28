"use client";

import { ResumeData } from "@/lib/types";
import { twj } from "@/lib/utils";
import { Document, Font, Page, Text } from "@react-pdf/renderer";

Font.register({
  family: "Computer Modern",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/computer-modern/fonts/cmu-serif-500-roman.ttf" },
    { src: "https://cdn.jsdelivr.net/npm/computer-modern/fonts/cmu-serif-500-italic.ttf", fontStyle: "italic" },
    { src: "https://cdn.jsdelivr.net/npm/computer-modern/fonts/cmu-serif-700-roman.ttf", fontWeight: 700 },
    { src: "https://cdn.jsdelivr.net/npm/computer-modern/fonts/cmu-serif-700-italic.ttf", fontStyle: "italic", fontWeight: 700 },
  ],
});
Font.registerEmojiSource({
  format: "png",
  url: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/",
});

export const ResumeDocument = ({ data }: { data: ResumeData }) => {
  return (
    <Document title="Resume">
      <Page
        size="LETTER"
        style={{
          ...twj("p-4 text-sm"),
          fontFamily: "Computer Modern",
        }}
      >
        <Text style={twj("text-3xl font-bold")}>{data.about.name}</Text>
      </Page>
    </Document>
  );
};
