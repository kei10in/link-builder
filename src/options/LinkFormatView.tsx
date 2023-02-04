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
  isEnabled: boolean;
  onChangeEnabled?: (id: string, isEnabled: boolean) => void;
  onSave?: (id: string, update: { name?: string; format?: string }) => void;
  onDelete?: (id: string) => void;
}

export const LinkFormatView: React.FC<Props> = (props) => {
  const { id, name, format, isEnabled, onChangeEnabled, onSave, onDelete } =
    props;

  const [isOpen, setIsOpen] = useState(false);

  const handleClickCheck = () => {
    onChangeEnabled?.(id, !isEnabled);
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
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center px-2">
          <div className="flex-none px-4">
            <button onClick={handleClickCheck}>
              {isEnabled ? (
                <MdCheckCircle className="h-6 w-6" />
              ) : (
                <MdOutlineCircle className="h-6 w-6" />
              )}
            </button>
          </div>

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
                  w-full p-4 flex items-center gap-2
                  hover:bg-slate-100 active:bg-blue-200
                "
                onClick={handleClickEdit}
              >
                <MdEdit className="h-6 w-6 text-slate-500" />
                <div className="text-slate-800">Edit Format</div>
              </button>
            </li>
            <li className="hover:bg-slate-100 flex items-center">
              <button
                className="
                  w-full p-4 flex items-center gap-2
                  hover:bg-slate-100 active:bg-blue-200
                "
                onClick={handleClickDelete}
              >
                <MdDelete className="h-6 w-6 text-slate-500" />
                <div className="text-slate-800">Delete</div>
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
