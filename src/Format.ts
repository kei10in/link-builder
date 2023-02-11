import { FormatItem } from "./FormatItem";
import Mustache from "mustache";
import browser from "webextension-polyfill";

export const DEFAULT_LINK_FORMATS: FormatItem[] = [
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
    return (
      await storage.get({
        linkFormats: DEFAULT_LINK_FORMATS,
      })
    ).linkFormats as FormatItem[];
  },

  save: async (linkFormats: FormatItem[]) => {
    await storage.set({ linkFormats });
  },

  upgrade: async (): Promise<void> => {
    const formats = await Format.load();
    const newFormats = DEFAULT_LINK_FORMATS.filter(
      (x) => !formats.some((y) => x.id === y.id)
    );

    await Format.save([...formats, ...newFormats]);
  },

  render: (item: FormatItem, data: { title: string; url: string }): string => {
    return Mustache.render(item.format, data, {}, { escape: (s) => s });
  },
};

export const EXAMPLE_DATA = {
  title: "Page Title",
  url: "https://example.com",
};
