import { LinkFormatView } from "./LinkFormatView";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/LinkFormatView",
  component: LinkFormatView,
} as ComponentMeta<typeof LinkFormatView>;

const Template: ComponentStory<typeof LinkFormatView> = (args) => (
  <LinkFormatView {...args} />
);

const format = {
  id: "key-1",
  name: "Markdown",
  format: "[{{title}}]({{url}})",
  isEnabled: true,
};

export const Default = Template.bind({});
Default.args = { ...format };
