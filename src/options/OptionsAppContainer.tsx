import { LinkFormat } from "../LinkFormat";
import { LinkFormatItemWithExample, OptionsApp } from "./OptionsApp";
import Mustache from "mustache";
import { useEffect, useState } from "react";

export const OptionsAppContainer: React.FC = () => {
  const [formats, setFormats] = useState<LinkFormatItemWithExample[]>([]);

  useEffect(() => {
    LinkFormat.load().then((loaded) => {
      setFormats(
        loaded.map((v) => ({
          ...v,
          example: Mustache.render(
            v.format,
            {
              title: "Page Title",
              url: "https://example.com",
            },
            {},
            { escape: (s) => s }
          ),
        }))
      );
    });
  });

  return <OptionsApp formats={formats} />;
};
