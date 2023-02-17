import { DragEventHandler, ReactNode, useState } from "react";

interface Props {
  id: string;
  children?: (isDragging: boolean) => ReactNode | undefined;
  onMoveStart?: (id: string) => void;
  onMoving?: (hoveringId: string) => void;
  onMoveEnd?: () => void;
  onChangeOrder?: (movedId: string, droppedId: string) => void;
}

export const Ordering: React.FC<Props> = (props: Props) => {
  const { id, onMoveStart, onMoving, onMoveEnd, onChangeOrder, children } = props;

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/plain", id);

    const x = event.pageX - event.currentTarget.offsetLeft;
    const y = event.pageY - event.currentTarget.offsetTop;
    const element = event.currentTarget;

    event.dataTransfer.setDragImage(element, x, y);
    event.dataTransfer.effectAllowed = "move";

    onMoveStart?.(id);
  };

  const handleDrag: DragEventHandler<HTMLDivElement> = () => {
    setIsDragging(true);
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = () => {
    onMoveEnd?.();
    setIsDragging(false);
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.dropEffect = "move";
    onMoving?.(id);
    event.preventDefault();
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
      {children?.(isDragging)}
    </div>
  );
};
