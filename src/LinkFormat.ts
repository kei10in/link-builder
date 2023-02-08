import { LinkFormatItem } from "./LinkFormatItem";
import Mustache from "mustache";
import browser from "webextension-polyfill";

export const DEFAULT_LINK_FORMATS: LinkFormatItem[] = [
  {
    id: "markdown",
    name: "Markdown",
    format: "[{{title}}]({{url}})",
    docType: "text",
    readonly: true,
    enabled: true,
  },
  {
    id: "textile",
    name: "Textile",
    format: '"{{title}}":{{url}}',
    docType: "text",
    readonly: true,
    enabled: true,
  },
  {
    id: "html",
    name: "HTML",
    format: '<a href="{{url}}">{{title}}</a>',
    docType: "text",
    readonly: true,
    enabled: true,
  },
  {
    id: "rich-text",
    name: "Rich Text",
    format: "[{{title}}]({{url}})",
    docType: "markdown",
    readonly: true,
    enabled: true,
  },
];

const storage = browser.storage.sync;

export const LinkFormat = {
  load: async (): Promise<LinkFormatItem[]> => {
    return (
      await storage.get({
        linkFormats: DEFAULT_LINK_FORMATS,
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

export const EXAMPLE_DATA = {
  title: "Page Title",
  url: "https://example.com",
};
