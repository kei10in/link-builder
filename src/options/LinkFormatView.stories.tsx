import { LinkFormatView } from "./LinkFormatView";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/LinkFormatView",
  component: LinkFormatView,
} as ComponentMeta<typeof LinkFormatView>;

const Template: ComponentStory<typeof LinkFormatView> = (args) => (
  <LinkFormatView {...args} />
);

const format: ComponentProps<typeof LinkFormatView> = {
  id: "key-1",
  name: "Markdown",
  format: "[{{title}}]({{url}})",
  enabled: true,
  readonly: true,
};

export const Default = Template.bind({});
Default.args = { ...format };

export const UserDefined = Template.bind({});
UserDefined.args = { ...format, readonly: true };

export const Disabled = Template.bind({});
Disabled.args = { ...format, enabled: false };
