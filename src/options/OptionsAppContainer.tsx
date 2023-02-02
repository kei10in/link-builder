import { formatLink, LinkFormat } from "../LinkFormat";
import { LinkFormatItemWithExample, OptionsApp } from "./OptionsApp";
import { useEffect, useState } from "react";

export const OptionsAppContainer: React.FC = () => {
  const [formats, setFormats] = useState<LinkFormatItemWithExample[]>([]);

  useEffect(() => {
    LinkFormat.load().then((loaded) => {
      setFormats(
        loaded.map((v) => ({
          ...v,
          example: formatLink(v, {
            title: "Page Title",
            url: "https://example.com",
          }),
        }))
      );
    });
  });

  return <OptionsApp formats={formats} />;
};
