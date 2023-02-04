import { ReactComponent as Logo } from "../../public/icon.svg";
import {
  EXAMPLE_DATA,
  formatLink,
  LinkFormatItem,
  newLinkFormatItem,
} from "../LinkFormat";
import { EditFormatDialog } from "./EditFormatDialog";
import { LinkFormatView } from "./LinkFormatView";
import { useState } from "react";
import { MdAdd, MdMoreHoriz } from "react-icons/md";

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

  return (
    <div className="h-screen max-w-5xl px-12 py-6">
      <div className="flex items-center gap-8">
        <div>
          <Logo className="w-32 mx-auto" />
        </div>
        <h1 className="text-6xl">Link Builder</h1>
      </div>

      <div className="mt-16 h-40">descriptions</div>

      <div className="w-full">
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
          {formats.map((item) => {
            return (
              <li key={item.id}>
                <LinkFormatView
                  {...item}
                  isEnabled={true}
                  onSave={handleSave}
                  onDelete={handleDelete}
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
