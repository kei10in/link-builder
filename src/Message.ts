export interface CopyTextLinkMessage {
  type: "copyTextLink";
  text: string;
}

export const isCopyTextLinkMessage = (
  value: unknown
): value is CopyTextLinkMessage => {
  return (
    isObject(value) &&
    value.type === "copyTextLink" &&
    typeof value.text === "string"
  );
};

export interface CopyHyperlinkMessage {
  type: "copyHyperlink";
  text: string;
  url: string;
}

export const isCopyHyperlinkMessage = (
  value: unknown
): value is CopyHyperlinkMessage => {
  return (
    isObject(value) &&
    value.type === "copyHyperlink" &&
    typeof value.text === "string" &&
    typeof value.url === "string"
  );
};

export type RequestMessage = CopyTextLinkMessage | CopyHyperlinkMessage;

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value != undefined && typeof value === "object";
};
