import { isCopyHyperTextMessage, isCopyTextMessage } from "./Message";
import { markdownToHtml } from "./markdown";
import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (isCopyTextMessage(message)) {
    copyTextToClipboard(message.text);
  } else if (isCopyHyperTextMessage(message)) {
    copyHyperTextToClipboard(message.text);
  } else {
    console.log("Invalid message");
  }
  sendResponse();
  return;
});

const copyTextToClipboard = (text: string) => {
  copyToClipboard({ "text/plain": text });
};

const copyHyperTextToClipboard = (text: string) => {
  const html = markdownToHtml(text);
  const div = document.createElement("div");
  div.innerHTML = html;

  copyToClipboard({
    "text/html": html,
    "text/plain": div.innerText,
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
