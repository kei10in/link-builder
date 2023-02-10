import { nanoid } from "nanoid";

export type FormatItem = TextFormatItem | StyledTextFormatItem;

export interface TextFormatItem {
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

export interface StyledTextFormatItem {
  type: "html";
  id: string;
  name: string;
  format: string;
  docFormat: DocumentFormat;
  readonly: boolean;
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
    readonly: false,
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
    readonly: false,
    enabled: true,
  };
};
