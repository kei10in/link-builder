import clsx from "clsx";
import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TextFormatMenus: React.FC<Props> = (props: Props) => {
  const { onEdit, onDelete } = props;

  const handleClickEdit = () => onEdit?.();
  const handleClickDelete = () => onDelete?.();

  return (
    <div className={clsx("dropdown dropdown-end")}>
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <MdMoreHoriz className="h-8 w-8" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu drop-shadow bg-white w-64"
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
    </div>
  );
};
