import { TextFormatDialog } from "./TextFormatDialog.js";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComponentProps, useState } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/TextFormatDialog",
  component: TextFormatDialog,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof TextFormatDialog>;

const Template: ComponentStory<typeof TextFormatDialog> = (args) => (
  <div className="w-screen h-screen">
    <TextFormatDialog {...args} />
  </div>
);

const format: ComponentProps<typeof TextFormatDialog> = {
  title: "New Text Format",
  name: "format name",
  format: "[{{text}}]({{url}}",
  isOpen: true,
};

export const Default = Template.bind({});
Default.args = { ...format };

export const WithButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center">
      <button
        className="mx-auto px-3 py-1 rounded border border-gray-300 bg-gray-100"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      <TextFormatDialog
        title="Title"
        name=""
        format=""
        isOpen={open}
        onCancel={() => setOpen(false)}
        onSave={() => {
          console.log("hoge");
          setOpen(false);
        }}
      />
    </div>
  );
};
