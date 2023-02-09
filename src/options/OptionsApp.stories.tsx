import { OptionsApp } from "./OptionsApp";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/OptionsApp",
  component: OptionsApp,
} as ComponentMeta<typeof OptionsApp>;

const Template: ComponentStory<typeof OptionsApp> = (args) => (
  <OptionsApp {...args} />
);

const format: ComponentProps<typeof OptionsApp> = {
  formats: [
    {
      type: "text",
      id: "markdown",
      name: "Markdown",
      format: "[{{title}}]({{url}})",
      readonly: true,
      enabled: true,
    },
    {
      type: "text",
      id: "textile",
      name: "Textile",
      format: '"{{title}}":{{url}}',
      readonly: true,
      enabled: true,
    },
    {
      type: "text",
      id: "restructured-text",
      name: "reStructuredText",
      format: "`{{title}} <{{url}}>`_",
      readonly: true,
      enabled: false,
    },
    {
      type: "text",
      id: "html",
      name: "HTML",
      format: '<a href="{{url}}">{{title}}</a>',
      readonly: true,
      enabled: true,
    },
    {
      type: "html",
      id: "rich-text",
      name: "Rich Text",
      format: "[{{title}}]({{url}})",
      docFormat: "markdown",
      readonly: true,
      enabled: true,
    },
  ],
};

export const Default = Template.bind({});
Default.args = { ...format };
