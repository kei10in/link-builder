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
  defaultFormat: string | undefined;
  restore?: () => Promise<void>;
  onChangeFormats?: (formats: FormatItem[], shortcutFormat: string | undefined) => void;
}

export const OptionsApp: React.FC<Props> = (props: Props) => {
  const { formats, defaultFormat, restore, onChangeFormats } = props;

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
    onChangeFormats?.(newFormats, defaultFormat);
    setEditingNewFormat(undefined);
  };

  const handleSaveNewHyperTextFormat = (name: string, format: string) => {
    const newFormat = newStyledTextFormatItem({ name, format });
    const newFormats = [...formats, newFormat];
    onChangeFormats?.(newFormats, defaultFormat);
    setEditingNewFormat(undefined);
  };

  const handleChangeEnabled = (id: string, enabled: boolean) => {
    const newFormats = formats.map((v) => {
      if (v.id != id) {
        return v;
      }
      return { ...v, enabled };
    });
    onChangeFormats?.(newFormats, defaultFormat);
  };

  const handleClickSetAsShortcut = (id: string) => {
    console.log(id);
    onChangeFormats?.(formats, id);
  };

  const handleSave = (id: string, update: { name?: string; format?: string }) => {
    const newFormats = formats.map((v) => {
      if (v.id != id) {
        return v;
      }
      return { ...v, ...update };
    });
    onChangeFormats?.(newFormats, defaultFormat);
  };

  const handleDelete = (id: string) => {
    const newFormats = formats.filter((x) => x.id != id);
    onChangeFormats?.(newFormats, id == defaultFormat ? undefined : defaultFormat);
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
    onChangeFormats?.(currentFormats, defaultFormat);
  };

  const currentFormats = movingFormats ?? formats;

  return (
    <div className="mx-auto h-screen max-w-2xl px-12 py-6">
      <div className="my-8 flex items-center gap-8">
        <div>
          <Logo className="mx-auto w-28" />
        </div>
        <div>
          <h1 className="text-4xl">Link Builder</h1>
          <div className="mt-2">
            <a href="https://github.com/kei10in/link-builder" className="block h-8 w-8">
              <Invertocat width={24} height={24} viewBox="0 0 96 96" />
            </a>
          </div>
          <p className="text-base text-slate-600">
            Build a link and copy to the clipboard in various formats.
          </p>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl text-slate-800">Formats</h2>

        <div className="flex w-full justify-end">
          <AddFormatButton
            onClickNewTextFormat={handleClickNewTextFormat}
            onClickNewHyperTextFormat={handleClickNewHyperTextFormat}
          />
        </div>

        <div className="mt-4">
          {currentFormats.length === 0 && (
            <div className="w-full rounded-md border border-gray-300 py-4">
              <div className="mx-auto w-fit">
                <button className="btn my-12" onClick={handleClickRestore} disabled={isRestoring}>
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
                          isDefault={item.id === defaultFormat}
                          dragging={isDragging}
                          onChangeEnabled={handleChangeEnabled}
                          onClickSetAsShortcut={handleClickSetAsShortcut}
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

      <div className="mt-8 w-full">
        <h2 className="my-4 text-2xl text-slate-800">Default Format</h2>

        <p className="px-4">Default format is used when a shortcut is activated.</p>
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
