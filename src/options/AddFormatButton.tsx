import { ActionMenu } from "./ActionMenu.js";
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  onClickNewTextFormat?: () => void;
  onClickNewHyperTextFormat?: () => void;
}

export const AddFormatButton: React.FC<Props> = (props: Props) => {
  const { onClickNewTextFormat, onClickNewHyperTextFormat } = props;

  const [open, setOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    placement: "bottom-end",
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <div>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex items-center bg-black text-white rounded-md px-2 py-1.5 hover:opacity-80 transition-transform active:scale-95"
      >
        <MdAdd className="h-6 w-6" />
        <div className="px-1">Add</div>
      </button>

      <FloatingPortal>
        {open && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            }}
          >
            <ActionMenu
              items={[
                { content: "Text", onClick: onClickNewTextFormat },
                { content: "Styled Text", onClick: onClickNewHyperTextFormat },
              ]}
            />
          </div>
        )}
      </FloatingPortal>
    </div>
  );
};
