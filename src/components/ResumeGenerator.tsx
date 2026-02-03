"use client";

import { ResumeData } from "@/lib/types";
import { twj } from "@/lib/utils";
import { Document, Font, Link, Page, Text, View } from "@react-pdf/renderer";

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
          ...twj("p-8 text-sm flex flex-col gap-2"),
          fontFamily: "Computer Modern",
        }}
      >
        <Text style={twj("text-3xl text-center font-bold")}>{data.about.name}</Text>
        <View style={twj("flex flex-row gap-4 items-center justify-center -mt-2")}>
          {data.about.email && (
            <Link style={twj("text-black")} href={`mailto:${data.about.email}`}>
              {data.about.email}
            </Link>
          )}
          {data.about.linkedin && (
            <Link style={twj("text-black")} href={`https://linkedin.com/in/${data.about.linkedin}`}>
              linkedin.com/in/{data.about.linkedin}
            </Link>
          )}
          {data.about.github && (
            <Link style={twj("text-black")} href={`https://github.com/${data.about.github}`}>
              github.com/{data.about.github}
            </Link>
          )}
        </View>
      </Page>
    </Document>
  );
};
