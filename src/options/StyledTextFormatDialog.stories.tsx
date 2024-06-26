import { Meta, StoryFn } from "@storybook/react";
import { ComponentProps, useState } from "react";
import { StyledTextFormatDialog } from "./StyledTextFormatDialog.js";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/StyledTextFormatDialog",
  component: StyledTextFormatDialog,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof StyledTextFormatDialog>;

const Template: StoryFn<typeof StyledTextFormatDialog> = (args) => (
  <div className="h-screen w-screen">
    <StyledTextFormatDialog {...args} />
  </div>
);

const format: ComponentProps<typeof StyledTextFormatDialog> = {
  title: "New Styled Text Format",
  name: "format name",
  format: "[{{text}}]({{url}}",
  isOpen: true,
};

export const Default = {
  render: Template,
  args: { ...format },
};

export const WithButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center">
      <button
        className="mx-auto rounded border border-gray-300 bg-gray-100 px-3 py-1"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      <StyledTextFormatDialog
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
