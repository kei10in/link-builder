import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  navigator.clipboard.writeText(message.linkText as string);
  sendResponse();
  return;
});
