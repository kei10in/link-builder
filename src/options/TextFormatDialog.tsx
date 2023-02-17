import { Variables } from "./Variables.js";
import {
  ChangeEventHandler,
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

  const canSave = innerName.trim().length != 0 && innerFormat.trim().length != 0;

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

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInnerName(event.currentTarget.value);
  };

  const handleChangeFormat: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInnerFormat(event.currentTarget.value);
  };

  return (
    <div className={"modal modal-open"} onClick={handleClickOverlay}>
      <div className="modal-box max-w-3xl" onKeyDown={handleKeyDown} tabIndex={-1}>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex items-stretch gap-8">
            <div className="basis-3/5">
              <h1 className="text-2xl mb-6">{title}</h1>
              <div className="w-full">
                <div>
                  <p className="mb-8">
                    Text Format allows you to create plain text and copy to the clipboard.
                  </p>
                  <label htmlFor="name" className="label">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input input-bordered w-full"
                    autoFocus
                    defaultValue={name}
                    onChange={handleChangeName}
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="format" className="label">
                    Format:
                  </label>
                  <textarea
                    id="format"
                    className="textarea textarea-bordered w-full h-36 text-base font-mono resize-none"
                    defaultValue={format}
                    onChange={handleChangeFormat}
                  />
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={onCancel}>
                    Cancel
                  </button>
                  <button className="btn" type="submit" disabled={!canSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="basis-2/5">
              <div className="bg-neutral-100 h-full p-6">
                <Variables />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
