import { nanoid } from "nanoid";

export interface LinkFormatItem {
  id: string;
  name: string;
  format: string;
  readonly: boolean;
  enabled: boolean;
}

export const newLinkFormatItem = (args: {
  name: string;
  format: string;
}): LinkFormatItem => {
  return { id: nanoid(), ...args, readonly: false, enabled: true };
};
