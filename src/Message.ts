import { Format } from "./Format";
import { DocumentFormat, isDocumentFormat, FormatItem } from "./FormatItem";

export interface CopyTextMessage {
  type: "copyText";
  text: string;
}

export const isCopyTextMessage = (value: unknown): value is CopyTextMessage => {
  return (
    isObject(value) &&
    value.type === "copyText" &&
    typeof value.text === "string"
  );
};

export interface CopyHyperTextMessage {
  type: "copyHtml";
  text: string;
  docFormat: DocumentFormat;
}

export const isCopyHyperTextMessage = (
  value: unknown
): value is CopyHyperTextMessage => {
  return (
    isObject(value) &&
    value.type === "copyHtml" &&
    typeof value.text === "string" &&
    isDocumentFormat(value.docFormat)
  );
};

export type RequestMessage = CopyTextMessage | CopyHyperTextMessage;

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value != undefined && typeof value === "object";
};

export const createMessage = (
  format: FormatItem,
  data: { title: string; url: string }
): RequestMessage => {
  const linkText = Format.render(format, data);

  switch (format.type) {
    case "text":
    default:
      return {
        type: "copyText",
        text: linkText,
      };
    case "html":
      return {
        type: "copyHtml",
        text: linkText,
        docFormat: format.docFormat,
      };
  }
};
