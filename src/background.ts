import { formatLink, LinkFormat } from "./LinkFormat";
import { CopyTextLinkMessage } from "./Message";
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

        const linkText = formatLink(linkFormat, data);

        const message: CopyTextLinkMessage = {
          type: "copyTextLink",
          text: linkText,
        };

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

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "linkFormatUpdated":
      browser.contextMenus.removeAll();
      buildContextMenu();
      break;
  }
});

buildContextMenu();
