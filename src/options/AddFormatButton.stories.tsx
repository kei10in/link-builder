import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddFormatButton } from "./AddFormatButton.js";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/AddFormatButton",
  component: AddFormatButton,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof AddFormatButton>;

const Template: ComponentStory<typeof AddFormatButton> = (args) => <AddFormatButton {...args} />;

export const Default = Template.bind({});
