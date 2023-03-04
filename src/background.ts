import { Format } from "./Format.js";
import { FormatItem } from "./FormatItem.js";
import { createMessage } from "./Message.js";
import browser from "webextension-polyfill";

const MENU_PREFIX = "link-builder--item--";

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
        id: `${MENU_PREFIX}${linkFormat.id}`,
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

browser.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case "update":
      if (details.previousVersion == undefined) {
        return;
      }

      await Format.upgrade(details.previousVersion);
      await updateContextMenu();
      return;
  }
});

browser.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case "linkFormatUpdated":
      await updateContextMenu();
      break;
  }
});

browser.commands.onCommand.addListener(async (name) => {
  if (name === "copy-link") {
    const tabs = await browser.tabs.query({ active: true });
    if (tabs.length === 0) {
      return;
    }

    const tab = tabs[0];

    const item = await Format.findDefault();
    if (item == undefined) {
      return;
    }

    await copyFormatToClipboard(tab, item);
  }
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "link-builder--configure") {
    await browser.runtime.openOptionsPage();
  } else if (typeof info.menuItemId === "string" && info.menuItemId.startsWith(MENU_PREFIX)) {
    const id = info.menuItemId.substring(MENU_PREFIX.length);
    const item = await Format.findById(id);
    if (item == undefined) {
      return;
    }

    await copyFormatToClipboard(tab, item);
  }
});

const copyFormatToClipboard = async (tab: browser.Tabs.Tab | undefined, item: FormatItem) => {
  if (tab == undefined || tab.id == undefined || tab.title == undefined || tab.url == undefined) {
    return;
  }

  await setupContentsScript({ tabId: tab.id });

  const url = tab.url;
  const title = tab.title;
  const data = { url, title };

  const message = createMessage(item, data);

  await browser.tabs.sendMessage(tab.id, message);
};

const setupContentsScript = async (target: browser.Scripting.InjectionTarget) => {
  try {
    const response = await browser.tabs.sendMessage(target.tabId, { type: "ping" });

    if (response.type === "pong") {
      return;
    }
  } catch (ex) {
    // Do nothing
  }

  await browser.scripting.executeScript({ files: ["src/content.js"], target });
};
