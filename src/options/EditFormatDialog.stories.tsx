import { EditFormatDialog } from "./EditFormatDialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/EditFormatDialog",
  component: EditFormatDialog,
} as ComponentMeta<typeof EditFormatDialog>;

const Template: ComponentStory<typeof EditFormatDialog> = (args) => (
  <EditFormatDialog {...args} />
);

const format: ComponentProps<typeof EditFormatDialog> = {
  title: "Edit Format",
  name: "format name",
  format: "[{{text}}]({{url}}",
};

export const Default = Template.bind({});
Default.args = { ...format };
