import { nanoid } from "nanoid";

export type FormatItem = TextFormatItem | StyledTextFormatItem;

export interface TextFormatItem {
  type: "text";
  id: string;
  name: string;
  format: string;
  enabled: boolean;
}

export type DocumentFormat = "markdown" | "html";

export const isDocumentFormat = (value: unknown): value is DocumentFormat => {
  return value === "markdown" || value === "html";
};

export interface StyledTextFormatItem {
  type: "html";
  id: string;
  name: string;
  format: string;
  docFormat: DocumentFormat;
  enabled: boolean;
}

export const newTextFormatItem = (args: {
  name: string;
  format: string;
}): TextFormatItem => {
  return {
    type: "text",
    id: nanoid(),
    ...args,
    enabled: true,
  };
};

export const newStyledTextFormatItem = (args: {
  name: string;
  format: string;
}): StyledTextFormatItem => {
  return {
    type: "html",
    id: nanoid(),
    ...args,
    docFormat: "markdown",
    enabled: true,
  };
};
