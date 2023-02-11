import { StyledTextFormatDialog } from "./StyledTextFormatDialog.js";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/StyledTextFormatDialog",
  component: StyledTextFormatDialog,
} as ComponentMeta<typeof StyledTextFormatDialog>;

const Template: ComponentStory<typeof StyledTextFormatDialog> = (args) => (
  <StyledTextFormatDialog {...args} />
);

const format: ComponentProps<typeof StyledTextFormatDialog> = {
  title: "New Styled Text Format",
  name: "format name",
  format: "[{{text}}]({{url}}",
};

export const Default = Template.bind({});
Default.args = { ...format };
