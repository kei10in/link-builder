import browser from "webextension-polyfill";
import { FormatItem } from "./FormatItem.js";

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
  load: async (): Promise<{ linkFormats: FormatItem[]; defaultLinkFormat: string | undefined }> => {
    const r = await storage.get({ linkFormats: DEFAULT_FORMATS, defaultLinkFormat: "" });
    const defaultLinkFormat = r.defaultLinkFormat as string;
    return {
      linkFormats: r.linkFormats as FormatItem[],
      defaultLinkFormat: defaultLinkFormat === "" ? undefined : defaultLinkFormat,
    };
  },

  save: async (linkFormats: FormatItem[], defaultLinkFormat: string | undefined) => {
    await storage.set({ linkFormats, defaultLinkFormat: defaultLinkFormat ?? "" });
  },

  install: async () => {
    await storage.set({
      linkFormats: DEFAULT_FORMATS,
      defaultLinkFormat: DEFAULT_FORMATS[0].id,
    });
  },

  upgrade: async (previousVersion: string): Promise<void> => {
    if (previousVersion === "0.1.0" || previousVersion === "0.1.1") {
      const items = await Format.load();
      const item = items.linkFormats[0];
      if (item != undefined) {
        await storage.set({ defaultLinkFormat: item.id });
      }
    }
  },

  reset: async (): Promise<FormatItem[]> => {
    await storage.clear();
    await Format.install();
    return (await Format.load()).linkFormats;
  },

  findById: async (id: string): Promise<FormatItem | undefined> => {
    const items = await Format.load();
    const item = items.linkFormats.find((x) => x.id === id);
    return item;
  },

  findDefault: async (): Promise<FormatItem | undefined> => {
    const r = await storage.get({ defaultLinkFormat: "" });
    const defaultLinkFormat = r.defaultLinkFormat as string;
    if (defaultLinkFormat === "") {
      return undefined;
    }

    return Format.findById(defaultLinkFormat);
  },
};

export const EXAMPLE_DATA = {
  title: "Page Title",
  url: "https://example.com",
};
