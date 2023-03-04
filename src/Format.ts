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

  upgrade: async (previousVersion: string): Promise<void> => {
    if (previousVersion === "0.1.0" || previousVersion === "0.1.1") {
      const items = await Format.load();
      const item = items[0];
      if (item != undefined) {
        await storage.set({ defaultLinkFormat: item.id });
      }
    }
  },

  reset: async (): Promise<FormatItem[]> => {
    await storage.clear();
    return await Format.load();
  },

  findById: async (id: string): Promise<FormatItem | undefined> => {
    const items = await Format.load();
    const item = items.find((x) => x.id === id);
    return item;
  },

  findDefault: async (): Promise<FormatItem | undefined> => {
    const r = await storage.get({ defaultLinkFormat: undefined });
    if (typeof r.defaultLinkFormat != "string") {
      return undefined;
    }

    return Format.findById(r.defaultLinkFormat);
  },

  render: (item: FormatItem, data: { title: string; url: string }): string => {
    return renderFormat(item, data);
  },
};

export const EXAMPLE_DATA = {
  title: "Page Title",
  url: "https://example.com",
};
