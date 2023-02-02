import Mustache from "mustache";
import { nanoid } from "nanoid";
import browser from "webextension-polyfill";

export interface LinkFormatItem {
  key: string;
  name: string;
  format: string;
}

export const newLinkFormatItem = (args: { name: string; format: string }) => {
  return { key: nanoid(), ...args };
};

const storage = browser.storage.local;

const defaultLinkFormats: LinkFormatItem[] = [
  {
    key: "markdown",
    name: "Markdown",
    format: "[{{title}}]({{url}})",
  },
  {
    key: "textile",
    name: "Textile",
    format: '"{{title}}":{{url}}',
  },
  {
    key: "html",
    name: "HTML",
    format: '<a href="{{url}}">{{title}}</a>',
  },
];

export const LinkFormat = {
  load: async (): Promise<LinkFormatItem[]> => {
    return (
      await storage.get({
        linkFormats: defaultLinkFormats,
      })
    ).linkFormats as LinkFormatItem[];
  },

  save: async (linkFormats: LinkFormatItem[]) => {
    await storage.set({ linkFormats });
  },
} as const;

export const formatLink = (
  item: LinkFormatItem,
  data: { title: string; url: string }
): string => {
  return Mustache.render(item.format, data, {}, { escape: (s) => s });
};
