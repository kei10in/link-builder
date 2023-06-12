import browser from "webextension-polyfill";
import { textToHtml } from "./document.js";
import { DocumentFormat, renderFormat } from "./FormatItem.js";
import { isCopyHyperTextMessage, isCopyTextMessage, isHeartbeatMessage } from "./Message.js";

browser.runtime.onMessage.addListener((message) => {
  if (isCopyTextMessage(message)) {
    const text = renderContent(message.format);
    copyTextToClipboard(text);
    return;
  } else if (isCopyHyperTextMessage(message)) {
    const text = renderContent(message.format);
    copyHtmlToClipboard(text, message.docFormat);
    return;
  } else if (isHeartbeatMessage(message)) {
    return Promise.resolve({ type: "pong" });
  } else {
    console.log("Invalid message");
    return;
  }
});

const renderContent = (format: string) => {
  const data = {
    title: document.title,
    url: location.href,
  };

  return renderFormat(format, data);
};

const copyTextToClipboard = (text: string) => {
  copyToClipboard({ "text/plain": text });
};

const copyHtmlToClipboard = (text: string, docFormat: DocumentFormat) => {
  const html = textToHtml(text, docFormat);
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
