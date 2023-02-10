import { HyperTextFormatDialog } from "./HyperTextFormatDialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/HyperTextFormatDialog",
  component: HyperTextFormatDialog,
} as ComponentMeta<typeof HyperTextFormatDialog>;

const Template: ComponentStory<typeof HyperTextFormatDialog> = (args) => (
  <HyperTextFormatDialog {...args} />
);

const format: ComponentProps<typeof HyperTextFormatDialog> = {
  title: "Edit Format",
  name: "format name",
  format: "[{{text}}]({{url}}",
};

export const Default = Template.bind({});
Default.args = { ...format };
