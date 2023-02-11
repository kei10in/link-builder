import { ReactComponent as Invertocat } from "../../public/github-mark.svg";
import { ReactComponent as Logo } from "../../public/icon.svg";
import {
  FormatItem,
  newStyledTextFormatItem,
  newTextFormatItem,
} from "../FormatItem";
import { FormatListItem } from "./FormatListItem";
import { Ordering } from "./Ordering";
import { StyledTextFormatDialog } from "./StyledTextFormatDialog";
import { TextFormatDialog } from "./TextFormatDialog";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  formats: FormatItem[];
  onChangeFormats?: (formats: FormatItem[]) => void;
}

export const OptionsApp: React.FC<Props> = (props: Props) => {
  const { formats, onChangeFormats } = props;

  const [editingNewFormat, setEditingNewFormat] = useState<
    undefined | "text/plain" | "text/html"
  >();
  const handleClickNewTextFormat = () => {
    setEditingNewFormat("text/plain");
  };
  const handleClickNewHyperTextFormat = () => {
    setEditingNewFormat("text/html");
  };
  const handleCancelNewFormat = () => {
    setEditingNewFormat(undefined);
  };

  const handleSaveNewTextFormat = (name: string, format: string) => {
    const newFormat = newTextFormatItem({ name, format });
    const newFormats = [...formats, newFormat];
    onChangeFormats?.(newFormats);
    setEditingNewFormat(undefined);
  };

  const handleSaveNewHyperTextFormat = (name: string, format: string) => {
    const newFormat = newStyledTextFormatItem({ name, format });
    const newFormats = [...formats, newFormat];
    onChangeFormats?.(newFormats);
    setEditingNewFormat(undefined);
  };

  const handleChangeEnabled = (id: string, enabled: boolean) => {
    const newFormats = formats.map((v) => {
      if (v.id != id) {
        return v;
      }
      return { ...v, enabled };
    });
    onChangeFormats?.(newFormats);
  };

  const handleSave = (
    id: string,
    update: { name?: string; format?: string }
  ) => {
    const newFormats = formats.map((v) => {
      if (v.id != id) {
        return v;
      }
      return { ...v, ...update };
    });
    onChangeFormats?.(newFormats);
  };

  const handleDelete = (id: string) => {
    const newFormats = formats.filter((x) => x.id != id);
    onChangeFormats?.(newFormats);
  };

  const [movingFormats, setMovingFormats] = useState<
    FormatItem[] | undefined
  >();

  const handleMoving = (movingId: string, hoveringId: string) => {
    const xs = [...(movingFormats ?? formats)];
    const movingIndex = xs.findIndex((x) => x.id === movingId);
    const hoveringIndex = xs.findIndex((x) => x.id === hoveringId);
    xs.splice(hoveringIndex, 0, xs.splice(movingIndex, 1)[0]);
    setMovingFormats(xs);
  };

  const handleMoveEnd = () => {
    setMovingFormats(undefined);
  };

  const handleChangeOrder = () => {
    onChangeFormats?.(currentFormats);
  };

  const currentFormats = movingFormats ?? formats;

  return (
    <div className="h-screen max-w-4xl px-12 py-6 mx-auto">
      <div className="flex items-center gap-8 my-8">
        <div>
          <Logo className="w-32 mx-auto" />
        </div>
        <div>
          <h1 className="text-5xl">Link Builder</h1>
          <div className="mt-2">
            <a
              href="https://github.com/kei10in/link-builder"
              className="block w-8 h-8"
            >
              <Invertocat width={24} height={24} viewBox="0 0 96 96" />
            </a>
          </div>
          <p className="text-base text-slate-600">
            Build a link and copy to the clipboard in various formats.
          </p>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-3xl text-slate-800">Link Formats</h2>

        <div className="w-full flex justify-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn gap-2 normal-case">
              <MdAdd className="h-6 w-6" />
              Add New Format
            </label>
            <ul
              tabIndex={0}
              className="mt-2 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleClickNewTextFormat}>Text</a>
              </li>
              <li>
                <a onClick={handleClickNewHyperTextFormat}>Hyper Text</a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="mt-4">
          {currentFormats.map((item) => {
            return (
              <li key={item.id}>
                <Ordering
                  id={item.id}
                  onMoving={handleMoving}
                  onMoveEnd={handleMoveEnd}
                  onChangeOrder={handleChangeOrder}
                >
                  {(isDragging) => (
                    <FormatListItem
                      {...item}
                      dragging={isDragging}
                      onChangeEnabled={handleChangeEnabled}
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  )}
                </Ordering>
              </li>
            );
          })}
        </ul>
      </div>

      {editingNewFormat == "text/plain" && (
        <TextFormatDialog
          title={"New Text Format"}
          name=""
          format=""
          onCancel={handleCancelNewFormat}
          onSave={handleSaveNewTextFormat}
        />
      )}

      {editingNewFormat == "text/html" && (
        <StyledTextFormatDialog
          title={"New Hyper Text Format"}
          name=""
          format=""
          onCancel={handleCancelNewFormat}
          onSave={handleSaveNewHyperTextFormat}
        />
      )}
    </div>
  );
};
