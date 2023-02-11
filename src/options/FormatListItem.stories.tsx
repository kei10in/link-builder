import { FormatListItem } from "./FormatListItem";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/FormatListItem",
  component: FormatListItem,
} as ComponentMeta<typeof FormatListItem>;

const Template: ComponentStory<typeof FormatListItem> = (args) => (
  <FormatListItem {...args} />
);

const format: ComponentProps<typeof FormatListItem> = {
  id: "key-1",
  type: "text",
  name: "Markdown",
  format: "[{{title}}]({{url}})",
  enabled: true,
  readonly: true,
};

const styledFormat: ComponentProps<typeof FormatListItem> = {
  id: "key-1",
  type: "html",
  name: "Markdown",
  format: "[{{title}}]({{url}})",
  enabled: true,
  readonly: true,
};

export const Default = Template.bind({});
Default.args = { ...format };

export const StyledFormat = Template.bind({});
StyledFormat.args = { ...styledFormat };

export const UserDefined = Template.bind({});
UserDefined.args = { ...format, readonly: true };

export const Disabled = Template.bind({});
Disabled.args = { ...format, enabled: false };
