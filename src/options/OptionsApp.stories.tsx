import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { OptionsApp } from "./OptionsApp.js";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/OptionsApp",
  component: OptionsApp,
} as ComponentMeta<typeof OptionsApp>;

const Template: ComponentStory<typeof OptionsApp> = (args) => <OptionsApp {...args} />;

const format: ComponentProps<typeof OptionsApp> = {
  formats: [
    {
      type: "text",
      id: "markdown",
      name: "Markdown",
      format: "[{{title}}]({{url}})",
      enabled: true,
    },
    {
      type: "text",
      id: "textile",
      name: "Textile",
      format: '"{{title}}":{{url}}',
      enabled: true,
    },
    {
      type: "text",
      id: "restructured-text",
      name: "reStructuredText",
      format: "`{{title}} <{{url}}>`_",
      enabled: false,
    },
    {
      type: "text",
      id: "html",
      name: "HTML",
      format: '<a href="{{url}}">{{title}}</a>',
      enabled: true,
    },
    {
      type: "html",
      id: "rich-text",
      name: "Rich Text",
      format: "[{{title}}]({{url}})",
      docFormat: "markdown",
      enabled: true,
    },
  ],
  defaultFormat: "markdown",
};

export const Default = Template.bind({});
Default.args = { ...format };

export const NoFormats = Template.bind({});
NoFormats.args = {
  formats: [],
  restore: () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  },
};
