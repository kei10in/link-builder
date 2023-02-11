import { StyledTextFormatDialog } from "./StyledTextFormatDialog";
import { TextFormatDialog } from "./TextFormatDialog";
import { TextFormatMenus } from "./TextFormatMenus";
import clsx from "clsx";
import { useState } from "react";
import { MdBookmark, MdBookmarkBorder, MdDragHandle } from "react-icons/md";

interface Props {
  id: string;
  type: "text" | "html";
  name: string;
  format: string;
  enabled: boolean;
  dragging?: boolean;
  onChangeEnabled?: (id: string, enabled: boolean) => void;
  onSave?: (id: string, update: { name?: string; format?: string }) => void;
  onDelete?: (id: string) => void;
}

export const FormatListItem: React.FC<Props> = (props: Props) => {
  const {
    id,
    type,
    name,
    format,
    enabled,
    dragging = false,
    onChangeEnabled,
    onSave,
    onDelete,
  } = props;

  const handleClickCheck = () => {
    onChangeEnabled?.(id, !enabled);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClickEdit = () => setIsOpen(true);
  const handleClickDelete = () => onDelete?.(id);

  const handleCancel = () => setIsOpen(false);
  const handleSave = (name: string, format: string) =>
    onSave?.(id, { name, format });

  return (
    <>
      <div
        className={clsx(
          "rounded-xl bg-white hover:bg-slate-100",
          dragging && "invisible"
        )}
      >
        <div className="flex items-center justify-between text-slate-800">
          <div className="group flex items-center justify-between flex-1">
            <div
              className="flex items-start px-6 py-4 aria-disabled:opacity-50 gap-4"
              aria-disabled={!enabled}
            >
              <button onClick={handleClickCheck} className="flex-none my-1">
                {enabled ? (
                  <MdBookmark className="h-6 w-6" />
                ) : (
                  <MdBookmarkBorder className="h-6 w-6" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xl text-slate-700">{name}</div>
                  {type === "html" && (
                    <div className="badge badge-primary badge-sm">Styled</div>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <pre className="font-mono text-slate-400">{format}</pre>
                </div>
              </div>
            </div>

            <TextFormatMenus
              onEdit={handleClickEdit}
              onDelete={handleClickDelete}
            />
          </div>
          <div className="flex-none px-4">
            <div className="cursor-grab" draggable>
              <MdDragHandle className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {isOpen && type === "text" && (
        <TextFormatDialog
          title={"Edit Text Format"}
          name={name}
          format={format}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}

      {isOpen && type === "html" && (
        <StyledTextFormatDialog
          title={"Edit Styled Text Format"}
          name={name}
          format={format}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </>
  );
};
