import { formatLink, LinkFormat } from "./LinkFormat";
import browser from "webextension-polyfill";

const buildContextMenu = async () => {
  const linkFormats = await LinkFormat.load();

  browser.contextMenus.create({
    id: "link-builder",
    title: "Build Link",
    contexts: ["page"],
  });

  for (const linkFormat of linkFormats) {
    browser.contextMenus.create({
      id: `link-builder--item--${linkFormat.key}`,
      parentId: "link-builder",
      title: linkFormat.name,
      contexts: ["page"],
      onclick: async (info, tab) => {
        if (
          tab == undefined ||
          tab.id == undefined ||
          tab.title == undefined ||
          tab.url == undefined
        ) {
          return;
        }

        const url = tab.url;
        const title = tab.title;
        const data = { url, title };

        const linkText = formatLink(linkFormat, data);

        await browser.tabs.sendMessage(tab.id, { linkText });
      },
    });
  }

  browser.contextMenus.create({
    id: "link-builder--separator",
    type: "separator",
    parentId: "link-builder",
  });

  browser.contextMenus.create({
    id: "link-builder--configure",
    parentId: "link-builder",
    title: "Configure...",
    onclick: async () => {
      await browser.runtime.openOptionsPage();
    },
  });
};

buildContextMenu();
