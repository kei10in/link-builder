import { FormatItem, renderFormat } from "./FormatItem.js";
import browser from "webextension-polyfill";

export const DEFAULT_FORMATS: FormatItem[] = [
  {
    type: "text",
    id: "markdown",
    name: "Markdown",
    format: "[{{title}}]({{url}})",
    enabled: true,
  },
  {
    type: "text",
    id: "textile",
    name: "Textile",
    format: '"{{title}}":{{url}}',
    enabled: false,
  },
  {
    type: "text",
    id: "html",
    name: "HTML",
    format: '<a href="{{url}}">{{title}}</a>',
    enabled: true,
  },
  {
    type: "html",
    id: "link",
    name: "Link",
    format: "[{{title}}]({{url}})",
    docFormat: "markdown",
    enabled: true,
  },
];

const storage = browser.storage.sync;

export const Format = {
  load: async (): Promise<FormatItem[]> => {
    const r = await storage.get({ linkFormats: DEFAULT_FORMATS });
    return r.linkFormats as FormatItem[];
  },

  save: async (linkFormats: FormatItem[]) => {
    await storage.set({ linkFormats });
  },

  upgrade: async (): Promise<void> => {
    // not implemented
  },

  reset: async (): Promise<FormatItem[]> => {
    await storage.clear();
    return await Format.load();
  },

  render: (item: FormatItem, data: { title: string; url: string }): string => {
    return renderFormat(item, data);
  },
};

export const EXAMPLE_DATA = {
  title: "Page Title",
  url: "https://example.com",
};
