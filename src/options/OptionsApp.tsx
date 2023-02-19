import { ReactComponent as Invertocat } from "../../public/github-mark.svg";
import { ReactComponent as Logo } from "../../public/icon.svg";
import { FormatItem, newStyledTextFormatItem, newTextFormatItem } from "../FormatItem.js";
import { AddFormatButton } from "./AddFormatButton.js";
import { FormatListItem } from "./FormatListItem.js";
import { Ordering } from "./Ordering.js";
import { StyledTextFormatDialog } from "./StyledTextFormatDialog.js";
import { TextFormatDialog } from "./TextFormatDialog.js";
import { useState } from "react";

interface Props {
  formats: FormatItem[];
  restore?: () => Promise<void>;
  onChangeFormats?: (formats: FormatItem[]) => void;
}

export const OptionsApp: React.FC<Props> = (props: Props) => {
  const { formats, restore, onChangeFormats } = props;

  const [isRestoring, setIsRestoring] = useState(false);

  const handleClickRestore = async () => {
    setIsRestoring(true);
    await restore?.();
  };

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

  const handleSave = (id: string, update: { name?: string; format?: string }) => {
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

  const [movingId, setMovingId] = useState<string>();
  const [movingFormats, setMovingFormats] = useState<FormatItem[] | undefined>();

  const handleMoveStart = (id: string) => setMovingId(id);

  const handleMoving = (hoveringId: string) => {
    if (movingId === undefined || movingId === hoveringId) {
      return;
    }
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
            <a href="https://github.com/kei10in/link-builder" className="block w-8 h-8">
              <Invertocat width={24} height={24} viewBox="0 0 96 96" />
            </a>
          </div>
          <p className="text-base text-slate-600">
            Build a link and copy to the clipboard in various formats.
          </p>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-3xl text-slate-800">Formats</h2>

        <div className="w-full flex justify-end">
          <AddFormatButton
            onClickNewTextFormat={handleClickNewTextFormat}
            onClickNewHyperTextFormat={handleClickNewHyperTextFormat}
          />
        </div>

        <div className="mt-4">
          {currentFormats.length === 0 && (
            <div className="w-full py-4 rounded-md border border-gray-300">
              <div className="mx-auto w-fit">
                <button
                  className="my-12 flex items-center bg-gray-100 text-gray-800 rounded-md border border-gray-300 px-4 py-1.5 hover:opacity-80 transition-transform active:scale-95"
                  onClick={handleClickRestore}
                  disabled={isRestoring}
                >
                  Restore
                </button>
              </div>
            </div>
          )}

          {currentFormats.length > 0 && (
            <ul>
              {currentFormats.map((item) => {
                return (
                  <li key={item.id} className="my-2 first:mt-0 last:mb-0">
                    <Ordering
                      id={item.id}
                      onMoveStart={handleMoveStart}
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
          )}
        </div>
      </div>

      {editingNewFormat == "text/plain" && (
        <TextFormatDialog
          title={"New Text Format"}
          name=""
          format=""
          isOpen={true}
          onCancel={handleCancelNewFormat}
          onSave={handleSaveNewTextFormat}
        />
      )}

      {editingNewFormat == "text/html" && (
        <StyledTextFormatDialog
          title={"New Hyper Text Format"}
          name=""
          format=""
          isOpen={true}
          onCancel={handleCancelNewFormat}
          onSave={handleSaveNewHyperTextFormat}
        />
      )}
    </div>
  );
};
