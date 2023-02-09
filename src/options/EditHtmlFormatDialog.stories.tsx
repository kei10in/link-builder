import { EditHtmlFormatDialog } from "./EditHtmlFormatDialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/EditHtmlFormatDialog",
  component: EditHtmlFormatDialog,
} as ComponentMeta<typeof EditHtmlFormatDialog>;

const Template: ComponentStory<typeof EditHtmlFormatDialog> = (args) => (
  <EditHtmlFormatDialog {...args} />
);

const format: ComponentProps<typeof EditHtmlFormatDialog> = {
  title: "Edit Format",
  name: "format name",
  documentFormat: "markdown",
  format: "[{{text}}]({{url}}",
};

export const Default = Template.bind({});
Default.args = { ...format };
