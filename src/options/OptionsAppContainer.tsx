import { Format } from "../Format.js";
import { FormatItem } from "../FormatItem.js";
import { OptionsApp } from "./OptionsApp.js";
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

export const OptionsAppContainer: React.FC = () => {
  const [formats, setFormats] = useState<FormatItem[]>([]);
  const [defaultLinkFormat, setDefaultLinkFormat] = useState<string | undefined>();

  useEffect(() => {
    Format.load().then((loaded) => {
      setFormats(loaded.linkFormats);
      setDefaultLinkFormat(loaded.defaultLinkFormat);
    });
  }, []);

  const handleRestore = async () => {
    const formats = await Format.reset();
    setFormats(formats);
  };

  const handleChangeFormat = async (
    formats: FormatItem[],
    defaultLinkFormat: string | undefined
  ) => {
    await Format.save(formats, defaultLinkFormat);
    setFormats(formats);
    setDefaultLinkFormat(defaultLinkFormat);
    browser.runtime.sendMessage({ type: "linkFormatUpdated" });
  };

  return (
    <OptionsApp
      formats={formats}
      defaultFormat={defaultLinkFormat}
      restore={handleRestore}
      onChangeFormats={handleChangeFormat}
    />
  );
};
