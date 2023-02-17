import { Format } from "../Format.js";
import { FormatItem } from "../FormatItem.js";
import { OptionsApp } from "./OptionsApp.js";
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

export const OptionsAppContainer: React.FC = () => {
  const [formats, setFormats] = useState<FormatItem[]>([]);

  useEffect(() => {
    Format.load().then((loaded) => {
      setFormats(loaded);
    });
  }, []);

  const handleRestore = async () => {
    const formats = await Format.reset();
    setFormats(formats);
  };

  const handleChangeFormat = (formats: FormatItem[]) => {
    Format.save(formats);
    setFormats(formats);
    browser.runtime.sendMessage({ type: "linkFormatUpdated" });
  };

  return (
    <OptionsApp formats={formats} restore={handleRestore} onChangeFormats={handleChangeFormat} />
  );
};
