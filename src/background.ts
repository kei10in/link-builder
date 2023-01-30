import browser from "webextension-polyfill";

browser.contextMenus.create({
  id: "link-builder--build-markdown-link",
  title: "Build Markdown Link",
  contexts: ["page"],
});

browser.contextMenus.onClicked.addListener(
  async (
    info: browser.Menus.OnClickData,
    tab: browser.Tabs.Tab | undefined
  ) => {
    if (tab == undefined) {
      return;
    }
    if (tab.id == undefined) {
      return;
    }

    if (info.menuItemId === "link-builder--build-markdown-link") {
      const url = tab.url;
      const title = tab.title;
      const linkText = `[${title}](${url})`;

      await browser.tabs.sendMessage(tab.id, { linkText });
    }
  }
);
