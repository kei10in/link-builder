import { isCopyHyperlinkMessage, isCopyTextLinkMessage } from "./Message";
import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (isCopyTextLinkMessage(message)) {
    copyTextLinkToClipboard(message.text);
  } else if (isCopyHyperlinkMessage(message)) {
    copyHyperlinkToClipboard(message.text, message.url);
  } else {
    console.log("Invalid message");
  }
  sendResponse();
  return;
});

const copyTextLinkToClipboard = (text: string) => {
  copyToClipboard({ "text/plain": text });
};

const copyHyperlinkToClipboard = (text: string, url: string) => {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.text = text;

  copyToClipboard({
    "text/plain": text,
    "text/html": a.outerHTML,
  });
};

interface ClipboardItems {
  [format: string]: string;
}

const copyToClipboard = (items: ClipboardItems) => {
  copyToClipboardHttp(items);

  // if (navigator.clipboard == undefined) {
  // } else {
  //   copyToClipboardHttps(items);
  // }
};

//
// Following code is not work on Firefox 109
//
// const copyToClipboardHttps = (items: SimpleClipboardItem[]) => {
//   console.log("copyToClipboardHttps");

//   const params: Record<string, string> = {};
//   items.forEach((item) => {
//     params[item.format] = item.data;
//   });

//   const clipboardItem = new ClipboardItem(params);
//   navigator.clipboard.write([clipboardItem]);
// };

const copyToClipboardHttp = (items: ClipboardItems) => {
  const oncopy = (event: ClipboardEvent) => {
    document.removeEventListener("copy", oncopy, true);

    event.stopImmediatePropagation();

    event.preventDefault();
    if (event.clipboardData == undefined) {
      return;
    }

    Object.entries(items).forEach(([format, data]) => {
      if (event.clipboardData == undefined) {
        return;
      }
      event.clipboardData.setData(format, data);
    });
  };

  document.addEventListener("copy", oncopy, true);
  document.execCommand("copy");
};
