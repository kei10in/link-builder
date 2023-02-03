import { LinkFormat, LinkFormatItem } from "../LinkFormat";
import { OptionsApp } from "./OptionsApp";
import { useEffect, useState } from "react";

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
  };

  return <OptionsApp formats={formats} onChangeFormats={handleChangeFormat} />;
};
