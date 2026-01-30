"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { ResumeData } from "@/lib/types";
import { useDebounce } from "@uidotdev/usehooks";
import useLocalStorageJson from "@/hooks/useLocalStorageJson";

type FormTemplate = {
  title: string;
  description: string;
  type: "map" | "list";
  fields: Record<string, { label: string; type: string; placeholder?: string }>;
};
const formTemplate: Record<string, FormTemplate> = {
  about: {
    title: "About you",
    description: "Basic information about you.",
    type: "map",
    fields: {
      name: {
        label: "Name",
        type: "text",
        placeholder: "John Doe",
      },
      email: {
        label: "Email",
        type: "email",
        placeholder: "hello@example.com",
      },
      linkedin: {
        label: "Linkedin",
        type: "text",
        placeholder: "johndoe-123456",
      },
      github: {
        label: "Github",
        type: "text",
        placeholder: "johndoe",
      },
    },
  },
  experience: {
    title: "Experience",
    description: "Your work experience.",
    type: "list",
    fields: {
      company: {
        label: "Company",
        type: "text",
        placeholder: "Google",
      },
      title: {
        label: "Title",
        type: "text",
        placeholder: "Software Engineer",
      },
      startDate: {
        label: "Start date",
        type: "date",
      },
      endDate: {
        label: "End date",
        type: "date",
      },
      description: {
        label: "Description",
        type: "text",
        placeholder: "Description",
      },
    },
  },
  education: {
    title: "Education",
    description: "Your educational background.",
    type: "list",
    fields: {
      institute: {
        label: "Institute",
        type: "text",
        placeholder: "MIT",
      },
      degree: {
        label: "Degree",
        type: "text",
        placeholder: "Bachelor of Science",
      },
      startDate: {
        label: "Start date",
        type: "date",
      },
      endDate: {
        label: "End date",
        type: "date",
      },
    },
  },
  skills: {
    title: "Skills",
    description: "Your technical skills.",
    type: "list",
    fields: {
      title: {
        label: "Skill",
        type: "text",
        placeholder: "React",
      },
      content: {
        label: "Description",
        type: "text",
        placeholder: "Description",
      },
    },
  },
};

export default function EditorForm({ onDataChange }: { onDataChange: (data: ResumeData) => void }) {
  const [data, setData] = useLocalStorageJson<ResumeData>("resume-data", {
    about: {
      name: "",
      email: "",
      linkedin: "",
      github: "",
    },
    experience: [],
    education: [],
    skills: [],
  });
  const debouncedData = useDebounce(data, 300);

  useEffect(() => {
    onDataChange(debouncedData);
  }, [debouncedData, onDataChange]);

  return (
    <FieldGroup>
      {(Object.entries(formTemplate) as [keyof ResumeData, FormTemplate][]).map(([sectionKey, { title, description, type, fields }], index) => (
        <Fragment key={title}>
          {index > 0 && <FieldSeparator key={`${title}-sep`} />}
          <FieldSet key={title}>
            <FieldLegend>{title}</FieldLegend>
            <FieldDescription>{description}</FieldDescription>
            <FieldGroup>
              {type === "map" ? (
                <FormMapSection {...{ sectionKey, fields, data, setData }} />
              ) : type === "list" ? (
                <FormListSection {...{ sectionKey, fields, data, setData }} />
              ) : null}
            </FieldGroup>
          </FieldSet>
        </Fragment>
      ))}
    </FieldGroup>
  );
}

function FormMapSection({
  sectionKey,
  fields,
  data,
  setData,
}: {
  sectionKey: keyof ResumeData;
  fields: FormTemplate["fields"];
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
}) {
  return (
    <>
      {Object.entries(fields).map(([fieldKey, { label, type, placeholder }]) => (
        <Field key={fieldKey}>
          <FieldLabel>{label}</FieldLabel>
          <Input
            placeholder={placeholder}
            value={data[sectionKey as keyof ResumeData][fieldKey as never]}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey as keyof ResumeData],
                  [fieldKey]: e.target.value,
                },
              }));
            }}
          />
        </Field>
      ))}
    </>
  );
}

function FormListSection({
  sectionKey,
  fields,
  data,
  setData,
}: {
  sectionKey: keyof ResumeData;
  fields: FormTemplate["fields"];
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
}) {
  return (
    <>
      {Array.from(
        {
          length: Math.max((data[sectionKey as keyof ResumeData] as never[]).length, 1),
        },
        (_, index) => (
          <Fragment key={index}>
            {index > 0 && <FieldSeparator key={`${index}-sep`} />}
            <FieldGroup>
              {Object.entries(fields).map(([fieldKey, { label, type, placeholder }]) => (
                <Field key={fieldKey}>
                  <FieldLabel>{label}</FieldLabel>
                  <FormInput {...{ sectionKey, fieldKey, type, placeholder, index, data, setData }} />
                </Field>
              ))}
            </FieldGroup>
          </Fragment>
        ),
      )}
      <div className="flex w-full gap-2">
        <Button onClick={() => setData((prev) => ({ ...prev, [sectionKey]: [...(prev[sectionKey as keyof ResumeData] as never[]), {}] }))}>Add</Button>
        {(data[sectionKey as keyof ResumeData] as never[]).length > 1 && (
          <Button
            variant="secondary"
            onClick={() => setData((prev) => ({ ...prev, [sectionKey]: (prev[sectionKey as keyof ResumeData] as never[]).slice(0, -1) }))}
          >
            Remove
          </Button>
        )}
      </div>
    </>
  );
}

function FormInput({
  sectionKey,
  fieldKey,
  type,
  placeholder,
  index,
  data,
  setData,
}: {
  sectionKey: keyof ResumeData;
  fieldKey: string;
  type: string;
  placeholder?: string;
  index: number;
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
}) {
  return (
    <>
      {type === "text" ? (
        <Input
          placeholder={placeholder}
          value={((data[sectionKey as keyof ResumeData] as never[])[index] || {})[fieldKey as never] || ""}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              [sectionKey]: (prev[sectionKey as keyof ResumeData] as Record<string, unknown>[]).map((item, i) => {
                if (i === index) {
                  return {
                    ...item,
                    [fieldKey]: e.target.value,
                  };
                }
                return item;
              }),
            }));
          }}
        />
      ) : type === "date" ? (
        <DatePicker
          mode="single"
          captionLayout="dropdown"
          selected={((data[sectionKey as keyof ResumeData] as never[])[index] || {})[fieldKey as never] || new Date()}
          onSelect={(date) => {
            setData((prev) => {
              const targetField = prev[sectionKey as keyof ResumeData] as Record<string, unknown>[];
              while (targetField.length <= index) {
                targetField.push({});
              }
              return {
                ...prev,
                [sectionKey]: targetField.map((item, i) => {
                  if (i === index) {
                    return {
                      ...item,
                      [fieldKey]: date,
                    };
                  }
                  return item;
                }),
              };
            });
          }}
        />
      ) : null}
    </>
  );
}
