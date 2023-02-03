import { LinkFormat, LinkFormatItem } from "../LinkFormat";
import { OptionsApp } from "./OptionsApp";
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

export const OptionsAppContainer: React.FC = () => {
  const [formats, setFormats] = useState<LinkFormatItem[]>([]);

  useEffect(() => {
    LinkFormat.load().then((loaded) => {
      setFormats(loaded);
    });
  }, []);

  const handleChangeFormat = (formats: LinkFormatItem[]) => {
    LinkFormat.save(formats);
    setFormats(formats);
    browser.runtime.sendMessage({ type: "linkFormatUpdated" });
  };

  return <OptionsApp formats={formats} onChangeFormats={handleChangeFormat} />;
};
