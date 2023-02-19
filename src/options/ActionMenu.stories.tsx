import { ActionMenu } from "./ActionMenu.js";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/ActionMenu",
  component: ActionMenu,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ActionMenu>;

const Template: ComponentStory<typeof ActionMenu> = (args) => <ActionMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [{ content: "Item 1" }, { content: "Item 2" }, { content: "Item 3" }],
};
