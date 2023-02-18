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

export const TextFormatMenus: React.FC<Props> = (props: Props) => {
  const { onEdit, onDelete } = props;

  const [open, setOpen] = useState(false);

  const handleClickEdit = () => onEdit?.();
  const handleClickDelete = () => onDelete?.();

  const { x, y, strategy, refs, context } = useFloating({
    placement: "bottom-end",
    open,
    onOpenChange: (v) => {
      setOpen(v);
    },
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="peer btn btn-ghost btn-circle"
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
            className={clsx(
              "bg-white drop-shadow-lg w-48",
              "hover:block peer-focus:block focus-within:block",
              "absolute right-0"
            )}
          >
            <li
              className={clsx(
                "hover:bg-slate-100 active:bg-blue-200",
                "text-slate-800 disabled:text-slate-300"
              )}
            >
              <button
                className="group w-full p-4 flex items-center gap-2"
                onClick={handleClickEdit}
              >
                <MdEdit className="h-6 w-6 text-slate-500 group-disabled:text-slate-300" />
                <div>Edit</div>
              </button>
            </li>
            <li
              className={clsx(
                "hover:bg-slate-100 active:bg-blue-200",
                "text-slate-800 disabled:text-slate-300"
              )}
            >
              <button
                className="group w-full p-4 flex items-center gap-2"
                onClick={handleClickDelete}
              >
                <MdDelete className="h-6 w-6 text-slate-500 group-disabled:text-slate-300" />
                <div>Delete</div>
              </button>
            </li>
          </ul>
        )}
      </FloatingPortal>
    </div>
  );
};
