import { nanoid } from "nanoid";

export interface LinkFormatItem {
  id: string;
  name: string;
  format: string;
  docType: "text" | "markdown";
  readonly: boolean;
  enabled: boolean;
}

export const newLinkFormatItem = (args: {
  name: string;
  format: string;
}): LinkFormatItem => {
  return {
    id: nanoid(),
    ...args,
    docType: "markdown",
    readonly: false,
    enabled: true,
  };
};
