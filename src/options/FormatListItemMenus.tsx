import { ActionMenu } from "./ActionMenu.js";
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { Fragment, useState } from "react";
import { MdContentCopy, MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";

interface Props {
  onSetAsShortcut?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const FormatListItemMenus: React.FC<Props> = (props: Props) => {
  const { onSetAsShortcut, onEdit, onDelete } = props;

  const [open, setOpen] = useState(false);

  const handleClickSetAsShortcut = () => {
    onSetAsShortcut?.();
    setOpen(false);
  };
  const handleClickEdit = () => {
    onEdit?.();
    setOpen(false);
  };
  const handleClickDelete = () => {
    onDelete?.();
    setOpen(false);
  };

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
      <button ref={refs.setReference} {...getReferenceProps()} className="btn px-2 py-1">
        <MdMoreHoriz className="h-5 w-5" />
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
                {
                  content: (
                    <Fragment>
                      <MdContentCopy className="h-5 w-5" />
                      <div className="px-2">Set as Default</div>
                    </Fragment>
                  ),
                  onClick: handleClickSetAsShortcut,
                },
                {
                  content: (
                    <Fragment>
                      <MdEdit className="h-5 w-5" /> <div className="px-2">Edit</div>
                    </Fragment>
                  ),
                  onClick: handleClickEdit,
                },
                {
                  content: (
                    <Fragment>
                      <MdDelete className="h-5 w-5" /> <div className="px-2">Delete</div>
                    </Fragment>
                  ),
                  onClick: handleClickDelete,
                },
              ]}
            />
          </div>
        )}
      </FloatingPortal>
    </div>
  );
};
