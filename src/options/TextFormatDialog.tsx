import { EditFormat } from "./EditFormat";
import {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from "react";

interface Props {
  title: string;
  name: string;
  format: string;

  onCancel?: () => void;
  onSave?: (name: string, format: string) => void;
}

export const TextFormatDialog: React.FC<Props> = (props: Props) => {
  const { title, name, format, onCancel, onSave } = props;

  const [innerName, setInnerName] = useState<string>(name);
  const [innerFormat, setInnerFormat] = useState<string>(format);

  const canSave =
    innerName.trim().length != 0 && innerFormat.trim().length != 0;

  const handleClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      onCancel?.();
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSave?.(innerName.trim(), innerFormat.trim());
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case "Esc":
      case "Escape":
        onCancel?.();
        break;
    }
  };

  return (
    <div className={"modal modal-open"} onClick={handleClickOverlay}>
      <div className="modal-box" onKeyDown={handleKeyDown} tabIndex={-1}>
        <form onSubmit={handleSubmit}>
          <EditFormat
            title={title}
            name={name}
            onChangeName={setInnerName}
            format={format}
            onChangeFormat={setInnerFormat}
          />
          <div className="modal-action">
            <button className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn" type="submit" disabled={!canSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
