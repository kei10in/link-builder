import { DocumentFormat, FormatItem, isDocumentFormat } from "./FormatItem.js";

export interface CopyTextMessage {
  type: "copyText";
  format: string;
}

export const isCopyTextMessage = (value: unknown): value is CopyTextMessage => {
  return isObject(value) && value.type === "copyText" && typeof value.format === "string";
};

export interface CopyHyperTextMessage {
  type: "copyHtml";
  format: string;
  docFormat: DocumentFormat;
}

export const isCopyHyperTextMessage = (value: unknown): value is CopyHyperTextMessage => {
  return (
    isObject(value) &&
    value.type === "copyHtml" &&
    typeof value.format === "string" &&
    isDocumentFormat(value.docFormat)
  );
};

export type RequestMessage = CopyTextMessage | CopyHyperTextMessage;

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value != undefined && typeof value === "object";
};

export const createMessage = (format: FormatItem): RequestMessage => {
  switch (format.type) {
    case "text":
    default:
      return {
        type: "copyText",
        format: format.format,
      };
    case "html":
      return {
        type: "copyHtml",
        format: format.format,
        docFormat: format.docFormat,
      };
  }
};

export interface HeartbeatMessage {
  type: "ping";
}

export const isHeartbeatMessage = (value: unknown): value is HeartbeatMessage => {
  return isObject(value) && value.type === "ping";
};
