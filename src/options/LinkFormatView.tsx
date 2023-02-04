import { EditFormatDialog } from "./EditFormatDialog";
import { useState } from "react";
import {
  MdCheckCircle,
  MdDelete,
  MdDragHandle,
  MdEdit,
  MdMoreHoriz,
  MdOutlineCircle,
} from "react-icons/md";

interface Props {
  id: string;
  name: string;
  format: string;
  enabled: boolean;
  readonly: boolean;
  onChangeEnabled?: (id: string, enabled: boolean) => void;
  onSave?: (id: string, update: { name?: string; format?: string }) => void;
  onDelete?: (id: string) => void;
}

export const LinkFormatView: React.FC<Props> = (props: Props) => {
  const {
    id,
    name,
    format,
    enabled,
    readonly,
    onChangeEnabled,
    onSave,
    onDelete,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleClickCheck = () => {
    onChangeEnabled?.(id, !enabled);
  };

  const handleClickEdit = () => setIsOpen(true);
  const handleClickDelete = () => onDelete?.(id);

  const handleSave = (name: string, format: string) => {
    setIsOpen(false);
    onSave?.(id, { name, format });
  };

  return (
    <div
      className="
        rounded-xl flex items-center justify-between
        bg-white hover:bg-slate-100 text-slate-800
        "
    >
      <div className="group flex items-center justify-between flex-1">
        <div
          className="flex items-center px-2 aria-disabled:opacity-50"
          aria-disabled={!enabled}
        >
          <button onClick={handleClickCheck} className="flex-none p-2 mx-2">
            {enabled ? (
              <MdCheckCircle className="h-6 w-6" />
            ) : (
              <MdOutlineCircle className="h-6 w-6" />
            )}
          </button>

          <div className="py-4">
            <div className="text-xl text-slate-700">{name}</div>
            <div className="mt-1 flex items-center gap-1">
              <div className="font-mono text-slate-500">{format}</div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <MdMoreHoriz className="h-8 w-8" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow w-52 bg-white"
          >
            <li>
              <button
                className="
                  group w-full p-4 flex items-center gap-2
                  hover:bg-slate-100 active:bg-blue-200
                  text-slate-800 disabled:text-slate-300
                "
                onClick={handleClickEdit}
                disabled={readonly}
              >
                <MdEdit className="h-6 w-6 text-slate-500 group-disabled:text-slate-300" />
                <div>Edit Format</div>
              </button>
            </li>
            <li className="hover:bg-slate-100 flex items-center">
              <button
                className="
                  group w-full p-4 flex items-center gap-2
                  hover:bg-slate-100 active:bg-blue-200
                  text-slate-800 disabled:text-slate-300
                "
                onClick={handleClickDelete}
                disabled={readonly}
              >
                <MdDelete className="h-6 w-6 text-slate-500 group-disabled:text-slate-300" />
                <div>Delete</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none px-4">
        <MdDragHandle className="h-8 w-8" />
      </div>

      {isOpen && (
        <EditFormatDialog
          title={"Edit Link Format"}
          name={name}
          format={format}
          onCancel={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
