import { nanoid } from "nanoid";

export type LinkFormatItem = TextLinkFormatItem | HtmlLinkFormatItem;

export interface TextLinkFormatItem {
  type: "text";
  id: string;
  name: string;
  format: string;
  readonly: boolean;
  enabled: boolean;
}

export type DocumentFormat = "markdown" | "html";

export const isDocumentFormat = (value: unknown): value is DocumentFormat => {
  return value === "markdown" || value === "html";
};

export interface HtmlLinkFormatItem {
  type: "html";
  id: string;
  name: string;
  format: string;
  docFormat: DocumentFormat;
  readonly: boolean;
  enabled: boolean;
}

export const newLinkFormatItem = (args: {
  name: string;
  format: string;
}): TextLinkFormatItem => {
  return {
    type: "text",
    id: nanoid(),
    ...args,
    readonly: false,
    enabled: true,
  };
};
