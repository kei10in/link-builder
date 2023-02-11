import { newTextFormatItem, renderFormat } from "./FormatItem.js";
import test from "ava";

const makeFormat = (format: string) => {
  return newTextFormatItem({ name: "test", format });
};

test("renderFormat should render title", (t) => {
  const item = makeFormat("{{title}}");
  const data = {
    title: "title",
    url: "https://example.com",
  };
  const result = renderFormat(item, data);
  t.is(result, "title");
});

test("renderFormat should render url", (t) => {
  const item = makeFormat("{{url}}");
  const data = {
    title: "title",
    url: "https://example.com",
  };
  const result = renderFormat(item, data);
  t.is(result, "https://example.com");
});

test("renderFormat should render url_pathname", (t) => {
  const format = "{{url_pathname}}";
  const data = { title: "title", url: "https://example.com/path" };

  const item = makeFormat(format);
  const result = renderFormat(item, data);
  t.is(result, "/path");
});

const renderUrlFilenameLastMacro = test.macro(
  (t, url: string, expected: string) => {
    const item = makeFormat("{{url_filename}}");
    const data = { title: "title", url };
    const result = renderFormat(item, data);
    t.is(result, expected);
  }
);

test(
  "renderFormat should render url_filename as empty",
  renderUrlFilenameLastMacro,
  "https://example.com/",
  ""
);

test(
  "renderFormat should render url_filename",
  renderUrlFilenameLastMacro,
  "https://example.com/path",
  "path"
);

test(
  "renderFormat should render url_filename that ends with path delimiter",
  renderUrlFilenameLastMacro,
  "https://example.com/path/",
  "path"
);
