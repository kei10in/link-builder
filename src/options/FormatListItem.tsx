import { FormatListItemMenus } from "./FormatListItemMenus.js";
import { StyledTextFormatDialog } from "./StyledTextFormatDialog.js";
import { TextFormatDialog } from "./TextFormatDialog.js";
import { clsx } from "clsx";
import { useState } from "react";
import { MdBookmark, MdBookmarkBorder, MdDragIndicator } from "react-icons/md";

interface Props {
  id: string;
  type: "text" | "html";
  name: string;
  format: string;
  enabled: boolean;
  dragging?: boolean;
  isDefault?: boolean;
  onChangeEnabled?: (id: string, enabled: boolean) => void;
  onClickSetAsShortcut?: (id: string) => void;
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
    isDefault = false,
    onChangeEnabled,
    onClickSetAsShortcut,
    onSave,
    onDelete,
  } = props;

  const handleClickCheck = () => {
    onChangeEnabled?.(id, !enabled);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleSetAsShortcut = () => {
    onClickSetAsShortcut?.(id);
  };
  const handleClickEdit = () => setIsOpen(true);
  const handleClickDelete = () => onDelete?.(id);

  const handleCancel = () => setIsOpen(false);
  const handleSave = (name: string, format: string) => {
    onSave?.(id, { name, format });
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={clsx(
          "rounded-md bg-white hover:bg-gray-50 hover:shadow-md",
          dragging && "invisible"
        )}
      >
        <div className="flex items-center justify-between text-gray-700">
          <div className="group flex items-center justify-between flex-1">
            <div
              className="flex items-start px-2 py-2 aria-disabled:opacity-50 gap-2 pl-4"
              aria-disabled={!enabled}
            >
              <button onClick={handleClickCheck} className="flex-none my-2">
                {enabled ? (
                  <MdBookmark className="h-4 w-4" />
                ) : (
                  <MdBookmarkBorder className="h-4 w-4" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg">{name}</div>
                  <div className="flex items-center gap-1">
                    {type === "text" && (
                      <div className="text-xs rounded-full bg-blue-500 text-white px-2">Plain</div>
                    )}
                    {type === "html" && (
                      <div className="text-xs rounded-full bg-blue-500 text-white px-2">Styled</div>
                    )}
                    {isDefault && (
                      <div className="text-xs rounded-full bg-green-500 text-white px-2">
                        Default
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <pre className="text-sm font-mono text-gray-400">{format}</pre>
                </div>
              </div>
            </div>

            <FormatListItemMenus
              onSetAsShortcut={handleSetAsShortcut}
              onEdit={handleClickEdit}
              onDelete={handleClickDelete}
            />
          </div>
          <div className="flex-none px-4">
            <div className="cursor-grab" draggable>
              <MdDragIndicator className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {isOpen && type === "text" && (
        <TextFormatDialog
          title={"Edit Text Format"}
          name={name}
          format={format}
          isOpen={true}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}

      {isOpen && type === "html" && (
        <StyledTextFormatDialog
          title={"Edit Styled Text Format"}
          name={name}
          format={format}
          isOpen={true}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </>
  );
};
