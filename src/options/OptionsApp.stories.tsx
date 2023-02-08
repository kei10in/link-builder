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
      id: "markdown",
      name: "Markdown",
      format: "[{{title}}]({{url}})",
      docType: "text",
      readonly: true,
      enabled: true,
    },
    {
      id: "textile",
      name: "Textile",
      format: '"{{title}}":{{url}}',
      docType: "text",
      readonly: true,
      enabled: false,
    },
    {
      id: "html",
      name: "HTML",
      format: '<a href="{{url}}">{{title}}</a>',
      docType: "text",
      readonly: true,
      enabled: true,
    },
    {
      id: "custom",
      name: "User Defined",
      format: '<a href="{{url}}">{{title}}</a>',
      docType: "text",
      readonly: false,
      enabled: true,
    },
  ],
};

export const Default = Template.bind({});
Default.args = { ...format };
