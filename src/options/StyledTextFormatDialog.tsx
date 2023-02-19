import { Variables } from "./Variables.js";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import ReactModal from "react-modal";

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
      className="ReactModal__Content bg-white max-w-4xl mx-auto p-8 rounded-md shadow-xl border border-gray-300"
    >
      <div className="flex items-stretch gap-8">
        <div className="basis-1/2">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl mb-6">{title}</h1>
            <div className="w-full">
              <div>
                <p className="mb-8">
                  Styled Text Format allows you to create decorated text such as bold and italic as
                  well as link text and copy that text to the clipboard.
                </p>
                <label htmlFor="name" className="label">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-2.5 py-1 rounded border border-gray-300"
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
                  className="w-full px-2.5 py-1 rounded border border-gray-300 h-36 font-mono resize-none"
                  defaultValue={format}
                  onChange={handleChangeFormat}
                />
                <p className="text-sm text-zinc-400 px-1">Styling with Markdown</p>
              </div>

              <div className="mt-6 flex gap-2 justify-end">
                <button
                  className="flex items-center bg-gray-100 text-gray-800 rounded-md border border-gray-300 px-4 py-1.5 hover:opacity-80 transition-transform active:scale-95"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-green-600 text-white rounded-md border border-green-700 px-4 py-1.5 hover:opacity-80 transition-transform active:scale-95 disabled:opacity-50"
                  type="submit"
                  disabled={!canSave}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="basis-1/2">
          <div className="bg-neutral-100 h-full p-6">
            <Variables />
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
