import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { clsx } from "clsx";
import { useState } from "react";
import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const FormatListItemMenus: React.FC<Props> = (props: Props) => {
  const { onEdit, onDelete } = props;

  const [open, setOpen] = useState(false);

  const handleClickEdit = () => onEdit?.();
  const handleClickDelete = () => onDelete?.();

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
        className="hover:bg-slate-300 rounded-full p-2 active:scale-95 transition-all"
      >
        <MdMoreHoriz className="h-8 w-8" />
      </button>

      <FloatingPortal>
        {open && (
          <ul
            ref={refs.setFloating}
            {...getFloatingProps}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            }}
            className={clsx("bg-white shadow-lg w-48")}
          >
            <li className={clsx("hover:bg-slate-100 active:bg-blue-200")}>
              <button
                className="group w-full p-4 flex items-center gap-2 disabled:opacity-25"
                onClick={handleClickEdit}
              >
                <MdEdit className="h-6 w-6 text-slate-500" />
                <div className="text-slate-800">Edit</div>
              </button>
            </li>
            <li
              className={clsx(
                "hover:bg-slate-100 active:bg-blue-200",
                "text-slate-800 disabled:text-slate-300"
              )}
            >
              <button
                className="group w-full p-4 flex items-center gap-2 disabled:opacity-25"
                onClick={handleClickDelete}
              >
                <MdDelete className="h-6 w-6 text-slate-500" />
                <div className="text-slate-800">Delete</div>
              </button>
            </li>
          </ul>
        )}
      </FloatingPortal>
    </div>
  );
};
