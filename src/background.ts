import { LinkFormat } from "./LinkFormat";
import { createMessage } from "./Message";
import browser from "webextension-polyfill";

const buildContextMenu = async () => {
  const linkFormats = await LinkFormat.load();

  browser.contextMenus.create({
    id: "link-builder",
    title: "Build Link",
    contexts: ["page"],
  });

  for (const linkFormat of linkFormats) {
    if (!linkFormat.enabled) {
      continue;
    }

    browser.contextMenus.create({
      id: `link-builder--item--${linkFormat.id}`,
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

        const message = createMessage(linkFormat, data);

        await browser.tabs.sendMessage(tab.id, message);
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

const updateContextMenu = async () => {
  await browser.contextMenus.removeAll();
  await buildContextMenu();
};

browser.runtime.onInstalled.addListener(async () => {
  await browser.storage.sync.clear();
  await LinkFormat.upgrade();
  await updateContextMenu();
});

browser.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case "linkFormatUpdated":
      await updateContextMenu();
      break;
  }
});

buildContextMenu();
