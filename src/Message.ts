import { formatLink } from "./LinkFormat";
import { LinkFormatItem } from "./LinkFormatItem";

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
  type: "copyHyperText";
  text: string;
  docType: "markdown";
}

export const isCopyHyperTextMessage = (
  value: unknown
): value is CopyHyperTextMessage => {
  return (
    isObject(value) &&
    value.type === "copyHyperText" &&
    typeof value.text === "string" &&
    value.docType === "markdown"
  );
};

export type RequestMessage = CopyTextMessage | CopyHyperTextMessage;

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value != undefined && typeof value === "object";
};

export const createMessage = (
  linkFormat: LinkFormatItem,
  data: { title: string; url: string }
): RequestMessage => {
  const linkText = formatLink(linkFormat, data);

  switch (linkFormat.docType) {
    case "text":
    default:
      return {
        type: "copyText",
        text: linkText,
      };
    case "markdown":
      return {
        type: "copyHyperText",
        text: linkText,
        docType: "markdown",
      };
  }
};
