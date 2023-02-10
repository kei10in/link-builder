import { TextFormatDialog } from "./TextFormatDialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/TextFormatDialog",
  component: TextFormatDialog,
} as ComponentMeta<typeof TextFormatDialog>;

const Template: ComponentStory<typeof TextFormatDialog> = (args) => (
  <TextFormatDialog {...args} />
);

const format: ComponentProps<typeof TextFormatDialog> = {
  title: "New Text Format",
  name: "format name",
  format: "[{{text}}]({{url}}",
};

export const Default = Template.bind({});
Default.args = { ...format };
