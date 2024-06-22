import { Meta } from "@storybook/react";
import { ActionMenu } from "./ActionMenu.js";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/ActionMenu",
  component: ActionMenu,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ActionMenu>;

export const Default = {
  args: {
    items: [{ content: "Item 1" }, { content: "Item 2" }, { content: "Item 3" }],
  },
};
