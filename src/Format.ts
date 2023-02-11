import { FormatItem } from "./FormatItem.js";
import Mustache from "mustache";
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
    enabled: true,
  },
  {
    type: "text",
    id: "restructured-text",
    name: "reStructuredText",
    format: "`{{title}} <{{url}}>`_",
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
    id: "rich-text",
    name: "Rich Text",
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
    return Mustache.render(item.format, data, {}, { escape: (s) => s });
  },
};

export const EXAMPLE_DATA = {
  title: "Page Title",
  url: "https://example.com",
};
