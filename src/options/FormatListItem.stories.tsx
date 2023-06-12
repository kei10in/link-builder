import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { FormatListItem } from "./FormatListItem.js";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/FormatListItem",
  component: FormatListItem,
} as ComponentMeta<typeof FormatListItem>;

const Template: ComponentStory<typeof FormatListItem> = (args) => (
  <div className="max-w-xl">
    <FormatListItem {...args} />
  </div>
);

const format: ComponentProps<typeof FormatListItem> = {
  id: "key-1",
  type: "text",
  name: "Markdown",
  format: "[{{title}}]({{url}})",
  enabled: true,
};

const styledFormat: ComponentProps<typeof FormatListItem> = {
  id: "key-1",
  type: "html",
  name: "Markdown",
  format: "[{{title}}]({{url}})",
  enabled: true,
};

export const PlainFormat = Template.bind({});
PlainFormat.args = { ...format };

export const StyledFormat = Template.bind({});
StyledFormat.args = { ...styledFormat };

export const DefaultPlainFormat = Template.bind({});
DefaultPlainFormat.args = { ...format, isDefault: true };

export const DefaultStyledFormat = Template.bind({});
DefaultStyledFormat.args = { ...styledFormat, isDefault: true };

export const Disabled = Template.bind({});
Disabled.args = { ...format, enabled: false };
