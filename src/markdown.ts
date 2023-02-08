import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";

export const markdownToHtml = (text: string): string => {
  const r = remark()
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(text);
  return String(r);
};
