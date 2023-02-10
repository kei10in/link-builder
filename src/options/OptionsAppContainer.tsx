import { Format } from "../Format";
import { FormatItem } from "../FormatItem";
import { OptionsApp } from "./OptionsApp";
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

export const OptionsAppContainer: React.FC = () => {
  const [formats, setFormats] = useState<FormatItem[]>([]);

  useEffect(() => {
    Format.load().then((loaded) => {
      setFormats(loaded);
    });
  }, []);

  const handleChangeFormat = (formats: FormatItem[]) => {
    Format.save(formats);
    setFormats(formats);
    browser.runtime.sendMessage({ type: "linkFormatUpdated" });
  };

  return <OptionsApp formats={formats} onChangeFormats={handleChangeFormat} />;
};
