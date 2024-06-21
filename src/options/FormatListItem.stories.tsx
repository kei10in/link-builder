import { Meta, StoryFn } from "@storybook/react";
import { ComponentProps } from "react";
import { FormatListItem } from "./FormatListItem.js";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/FormatListItem",
  component: FormatListItem,
} as Meta<typeof FormatListItem>;

const Template: StoryFn<typeof FormatListItem> = (args) => (
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

export const PlainFormat = {
  render: Template,
  args: { ...format },
};

export const StyledFormat = {
  render: Template,
  args: { ...styledFormat },
};

export const DefaultPlainFormat = {
  render: Template,
  args: { ...format, isDefault: true },
};

export const DefaultStyledFormat = {
  render: Template,
  args: { ...styledFormat, isDefault: true },
};

export const Disabled = {
  render: Template,
  args: { ...format, enabled: false },
};
