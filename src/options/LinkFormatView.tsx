import { EditFormatDialog } from "./EditFormatDialog";
import { LinkFormatMenus } from "./LinkFormatMenus";
import clsx from "clsx";
import { DragEventHandler, useState } from "react";
import { MdBookmark, MdBookmarkBorder, MdDragHandle } from "react-icons/md";

interface Props {
  id: string;
  name: string;
  format: string;
  enabled: boolean;
  readonly: boolean;
  onChangeEnabled?: (id: string, enabled: boolean) => void;
  onSave?: (id: string, update: { name?: string; format?: string }) => void;
  onDelete?: (id: string) => void;
  onMoving?: (movingId: string, hoveringId: string) => void;
  onMoveEnd?: () => void;
  onChangeOrder?: (movedId: string, droppedId: string) => void;
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
    onMoving,
    onMoveEnd,
    onChangeOrder,
  } = props;

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleClickCheck = () => {
    onChangeEnabled?.(id, !enabled);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClickEdit = () => setIsOpen(true);
  const handleClickDelete = () => onDelete?.(id);

  const handleSave = (name: string, format: string) =>
    onSave?.(id, { name, format });

  const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/plain", id);

    const x = event.pageX - event.currentTarget.offsetLeft;
    const y = event.pageY - event.currentTarget.offsetTop;
    event.dataTransfer.setDragImage(event.currentTarget, x, y);

    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrag: DragEventHandler<HTMLDivElement> = () => {
    setIsDragging(true);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = () => {
    onMoveEnd?.();
    setIsDragging(false);
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const movingId = event.dataTransfer.getData("text/plain");
    onMoving?.(movingId, id);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    const movingId = event.dataTransfer.getData("text/plain");
    onChangeOrder?.(movingId, id);
    event.preventDefault();
  };

  return (
    <div
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={clsx(
          "rounded-xl bg-white hover:bg-slate-100",
          isDragging && "invisible"
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
                <div className="text-xl text-slate-700">{name}</div>
                <div className="mt-1 flex items-center gap-1">
                  <pre className="font-mono text-slate-400">{format}</pre>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {readonly && (
                <div className={clsx("badge badge-primary badge-outline")}>
                  Predefined
                </div>
              )}
              <LinkFormatMenus
                readonly={readonly}
                onEdit={handleClickEdit}
                onDelete={handleClickDelete}
              />
            </div>
          </div>
          <div className="flex-none px-4">
            <div className="cursor-grab" draggable>
              <MdDragHandle className="h-8 w-8" />
            </div>
          </div>
        </div>
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
