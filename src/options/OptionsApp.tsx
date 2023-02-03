import { ReactComponent as Logo } from "../../public/icon.svg";
import {
  EXAMPLE_DATA,
  formatLink,
  LinkFormatItem,
  newLinkFormatItem,
} from "../LinkFormat";
import { EditFormatDialog } from "./EditFormatDialog";
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

  const [editingLinkFormat, setEditingLinkFormat] = useState<
    LinkFormatItem | undefined
  >(undefined);

  const handleClickEditMenuItem = (linkFormat: LinkFormatItem) => {
    setEditingLinkFormat(linkFormat);
  };

  const handleCancelEditingLinkFormat = () => {
    setEditingLinkFormat(undefined);
  };

  const handleSaveEditingLinkFormat = (name: string, format: string) => {
    const newFormats = formats.map((v) => {
      if (v.key != editingLinkFormat?.key) {
        return v;
      }

      return { ...v, name, format };
    });
    onChangeFormats?.(newFormats);
    setEditingLinkFormat(undefined);
  };

  const handleDeleteLinkFormat = (linkFormat: LinkFormatItem) => {
    const newFormats = formats.filter((x) => x.key != linkFormat.key);
    onChangeFormats?.(newFormats);
  };

  return (
    <div className="h-screen max-w-7xl px-12 py-6">
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

        <table className="table w-full mt-4 drop-shadow">
          <thead>
            <tr>
              <th className="normal-case">Name</th>
              <th className="normal-case">Format</th>
              <th className="normal-case">Example</th>
              <th className="normal-case"></th>
            </tr>
          </thead>
          <tbody>
            {formats.map((item) => {
              const { key, name, format } = item;
              const example = formatLink(item, EXAMPLE_DATA);
              return (
                <tr key={key}>
                  <td>{name}</td>
                  <td className="font-mono">{format}</td>
                  <td className="font-mono">{example}</td>
                  <td className="text-right">
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <MdMoreHoriz className="h-6 w-6" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button onClick={() => handleClickEditMenuItem(item)}>
                            Edit Format
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleDeleteLinkFormat(item)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

      {editingLinkFormat != undefined && (
        <EditFormatDialog
          title={"Edit Link Format"}
          name={editingLinkFormat?.name ?? ""}
          format={editingLinkFormat?.format ?? ""}
          onCancel={handleCancelEditingLinkFormat}
          onSave={handleSaveEditingLinkFormat}
        />
      )}
    </div>
  );
};
