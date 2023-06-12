import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import ReactModal from "react-modal";
import { Variables } from "./Variables.js";

interface Props {
  title: string;
  name: string;
  format: string;
  isOpen: boolean;

  onCancel?: () => void;
  onSave?: (name: string, format: string) => void;
}

export const StyledTextFormatDialog: React.FC<Props> = (props: Props) => {
  const { title, name, format, isOpen, onCancel, onSave } = props;

  const [innerName, setInnerName] = useState<string>(name);
  const [innerFormat, setInnerFormat] = useState<string>(format);

  const canSave = innerName.trim().length != 0 && innerFormat.trim().length != 0;

  const handleRequestClose: MouseEventHandler = () => {
    onCancel?.();
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSave?.(innerName.trim(), innerFormat.trim());
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInnerName(event.currentTarget.value);
  };

  const handleChangeFormat: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInnerFormat(event.currentTarget.value);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      overlayClassName="ReactModal__Overlay w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-25 flex items-center"
      className="ReactModal__Content mx-auto max-w-4xl rounded-md border border-gray-300 bg-white p-8 shadow-xl"
    >
      <div className="flex items-stretch gap-8">
        <div className="basis-1/2">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-6 text-2xl">{title}</h1>
            <div className="w-full">
              <div>
                <p className="mb-8">
                  Styled Text Format allows you to create decorated text such as bold and italic as
                  well as link text and copy that text to the clipboard.
                </p>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded border border-gray-300 px-2.5 py-1"
                  autoFocus
                  defaultValue={name}
                  onChange={handleChangeName}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="format">Format:</label>
                <textarea
                  id="format"
                  className="h-36 w-full resize-none rounded border border-gray-300 px-2.5 py-1 font-mono"
                  defaultValue={format}
                  onChange={handleChangeFormat}
                />
                <p className="px-1 text-sm text-zinc-400">Styling with Markdown</p>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button className="btn" onClick={onCancel}>
                  Cancel
                </button>
                <button className="btn-primary" type="submit" disabled={!canSave}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="basis-1/2">
          <div className="h-full bg-neutral-100 p-6">
            <Variables />
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
