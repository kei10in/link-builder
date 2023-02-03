import { EditFormat } from "./EditFormat";
import { MouseEventHandler, useState } from "react";

interface Props {
  title: string;
  name: string;
  format: string;

  onCancel?: () => void;
  onSave?: (name: string, format: string) => void;
}

export const EditFormatDialog: React.FC<Props> = (props: Props) => {
  const { title, name, format, onCancel, onSave } = props;

  const [innerName, setInnerName] = useState<string>(name);
  const [innerFormat, setInnerFormat] = useState<string>(format);

  const handleClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      onCancel?.();
    }
  };

  return (
    <div className={"modal modal-open"} onClick={handleClickOverlay}>
      <div className="modal-box">
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
          <button
            className="btn"
            onClick={() => onSave?.(innerName, innerFormat)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
