import { DocumentFormat } from "./FormatItem.js";
import { rehype } from "rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";

export const textToHtml = (text: string, docFormat: DocumentFormat): string => {
  if (docFormat === "markdown") {
    return markdownToHtml(text);
  } else {
    return sanitizeHtml(text);
  }
};

export const markdownToHtml = (text: string): string => {
  const r = remark()
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(text);
  return String(r);
};

export const sanitizeHtml = (text: string): string => {
  const r = rehype().use(rehypeSanitize).use(rehypeStringify).processSync(text);
  return String(r);
};
