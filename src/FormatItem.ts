import Mustache from "mustache";
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

export const newTextFormatItem = (args: { name: string; format: string }): TextFormatItem => {
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

export const renderFormat = (item: FormatItem, data: { title: string; url: string }): string => {
  const url = new URL(data.url);
  const paths = url.pathname.split("/").reverse();
  const url_filename = paths[0] !== "" ? paths[0] : paths[1];

  return Mustache.render(
    item.format,
    {
      ...data,
      url_pathname: url.pathname,
      url_filename,
    },
    {},
    { escape: (s) => s }
  );
};
