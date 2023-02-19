import { Format } from "./Format.js";
import { createMessage } from "./Message.js";
import browser from "webextension-polyfill";

const buildContextMenu = async () => {
  const linkFormats = await Format.load();

  browser.contextMenus.create({
    id: "link-builder",
    title: "Build Link",
    contexts: ["page"],
  });

  for (const linkFormat of linkFormats) {
    if (!linkFormat.enabled) {
      continue;
    }

    try {
      browser.contextMenus.create({
        id: `link-builder--item--${linkFormat.id}`,
        parentId: "link-builder",
        title: linkFormat.name,
        contexts: ["page"],
      });
    } catch (e) {
      console.log({ error: e });
    }
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
  });
};

const updateContextMenu = async () => {
  await browser.contextMenus.removeAll();
  await buildContextMenu();
};

browser.runtime.onStartup.addListener(async () => {
  await buildContextMenu();
});

browser.runtime.onInstalled.addListener(async () => {
  await Format.upgrade();
  await updateContextMenu();
});

browser.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case "linkFormatUpdated":
      await updateContextMenu();
      break;
  }
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "link-builder--configure") {
    await browser.runtime.openOptionsPage();
  } else if (
    typeof info.menuItemId === "string" &&
    info.menuItemId.startsWith("link-builder--item--")
  ) {
    const linkFormats = await Format.load();

    const linkFormat = linkFormats.find((x) => info.menuItemId === `link-builder--item--${x.id}`);
    if (linkFormat === undefined) {
      return;
    }

    if (tab == undefined || tab.id == undefined || tab.title == undefined || tab.url == undefined) {
      return;
    }

    const url = tab.url;
    const title = tab.title;
    const data = { url, title };

    const message = createMessage(linkFormat, data);

    await browser.tabs.sendMessage(tab.id, message);
  }
});
