import { describe, expect, test } from "vitest";
import { renderFormat } from "./FormatItem.js";

describe("FormatItem", () => {
  test("renderFormat should render title", () => {
    const format = "{{title}}";
    const data = {
      title: "title",
      url: "https://example.com",
    };
    const result = renderFormat(format, data);
    expect(result).toBe("title");
  });

  test("renderFormat should render url", () => {
    const format = "{{url}}";
    const data = {
      title: "title",
      url: "https://example.com",
    };
    const result = renderFormat(format, data);
    expect(result).toBe("https://example.com");
  });

  test("renderFormat should render url_pathname", () => {
    const format = "{{url_pathname}}";
    const data = { title: "title", url: "https://example.com/path" };

    const result = renderFormat(format, data);
    expect(result).toBe("/path");
  });

  test.each([
    ["https://example.com/", ""],
    ["https://example.com/path", "path"],
    ["https://example.com/path/", "path"],
  ])('renderFormat should render "%s" as url_filename gets "%s"', (url, expected) => {
    const format = "{{url_filename}}";
    const data = { title: "title", url };
    const result = renderFormat(format, data);
    expect(result).toBe(expected);
  });
});
