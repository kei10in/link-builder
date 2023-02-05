import { ReactComponent as Invertocat } from "../../public/github-mark.svg";
import { ReactComponent as Logo } from "../../public/icon.svg";
import { LinkFormatItem, newLinkFormatItem } from "../LinkFormat";
import { EditFormatDialog } from "./EditFormatDialog";
import { LinkFormatView } from "./LinkFormatView";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

interface Props {
  formats: LinkFormatItem[];
  onChangeFormats?: (formats: LinkFormatItem[]) => void;
}

export const OptionsApp: React.FC<Props> = (props: Props) => {
  const { formats, onChangeFormats } = props;

  const [isEditingNewFormat, setIsEditingNewFormat] = useState(false);

  const handleClickNewLinkFormat = () => {
    setIsEditingNewFormat(true);
  };

  const handleCancelNewLinkFormat = () => {
    setIsEditingNewFormat(false);
  };

  const handleSaveNewLinkFormat = (name: string, format: string) => {
    const newFormat = newLinkFormatItem({ name, format });
    const newFormats = [...formats, newFormat];
    onChangeFormats?.(newFormats);
    setIsEditingNewFormat(false);
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
      if (v.readonly || v.id != id) {
        return v;
      }
      return { ...v, ...update };
    });
    onChangeFormats?.(newFormats);
  };

  const handleDelete = (id: string) => {
    const newFormats = formats.filter((x) => x.readonly || x.id != id);
    onChangeFormats?.(newFormats);
  };

  const [movingFormats, setMovingFormats] = useState<
    LinkFormatItem[] | undefined
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
            Build a link and copy to the clipboard in various markup languages.
          </p>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-3xl text-slate-800">Link Formats</h2>

        <div className="w-full flex justify-end">
          <button
            className="btn normal-case gap-2"
            onClick={handleClickNewLinkFormat}
          >
            <MdAdd className="h-6 w-6" />
            Add New Format
          </button>
        </div>

        <ul className="mt-4">
          {currentFormats.map((item) => {
            return (
              <li key={item.id}>
                <LinkFormatView
                  {...item}
                  onChangeEnabled={handleChangeEnabled}
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onMoving={handleMoving}
                  onMoveEnd={handleMoveEnd}
                  onChangeOrder={handleChangeOrder}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {isEditingNewFormat && (
        <EditFormatDialog
          title={"New Link Format"}
          name=""
          format=""
          onCancel={handleCancelNewLinkFormat}
          onSave={handleSaveNewLinkFormat}
        />
      )}
    </div>
  );
};
