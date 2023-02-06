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
      id: "key-1",
      name: "Markdown",
      format: "[{{title}}]({{url}})",
      enabled: true,
      readonly: true,
    },
  ],
};

export const Default = Template.bind({});
Default.args = { ...format };
