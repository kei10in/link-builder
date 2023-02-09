import { DocumentFormat } from "../LinkFormatItem";
import { Variables } from "./Variables";
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
  documentFormat: DocumentFormat;
  format: string;

  onCancel?: () => void;
  onSave?: (
    name: string,
    documentFormat: DocumentFormat,
    format: string
  ) => void;
}

export const EditHtmlFormatDialog: React.FC<Props> = (props: Props) => {
  const { title, name, documentFormat, format, onCancel, onSave } = props;

  const [innerName, setInnerName] = useState<string>(name);
  const [innerDocumentFormat, setInnerDocumentFormat] =
    useState<DocumentFormat>(documentFormat);
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
    onSave?.(innerName.trim(), innerDocumentFormat, innerFormat.trim());
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

  const handleChangeDocumentFormat: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    if (event.currentTarget.value === "markdown") {
      setInnerDocumentFormat("markdown");
    } else {
      setInnerDocumentFormat("html");
    }
  };

  const handleChangeFormat: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInnerFormat(event.currentTarget.value);
  };

  return (
    <div className={"modal modal-open"} onClick={handleClickOverlay}>
      <div className="modal-box" onKeyDown={handleKeyDown} tabIndex={-1}>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <h1 className="text-2xl mb-6">{title}</h1>

            <div className="w-full">
              <div>
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
                <label htmlFor="documentForma" className="label">
                  Markup:
                </label>
                <select
                  id="documentFormat"
                  className="block select select-bordered w-full"
                  defaultValue={documentFormat}
                  onChange={handleChangeDocumentFormat}
                >
                  <option value="markdown">Markdown</option>
                  <option value="html">HTML</option>
                </select>
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
            </div>

            <Variables />
          </div>
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
