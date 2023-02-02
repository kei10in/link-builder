import { ReactComponent as Logo } from "../../public/icon.svg";
import { LinkFormatItem } from "../LinkFormat";
import { EditFormat } from "./EditFormat";
import { MdAdd, MdMoreHoriz } from "react-icons/md";

export type LinkFormatItemWithExample = LinkFormatItem & { example: string };

interface Props {
  formats: LinkFormatItemWithExample[];
}

export const OptionsApp: React.FC<Props> = (props: Props) => {
  const { formats } = props;

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
          <label htmlFor="add-new-format" className="btn normal-case gap-2">
            <MdAdd className="h-6 w-6" />
            Add New Format
          </label>
          <input type="checkbox" id="add-new-format" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <EditFormat title="New Format" />
              <div className="modal-action">
                <label htmlFor="add-new-format" className="btn">
                  Cancel
                </label>
                <label htmlFor="add-new-format" className="btn">
                  Save
                </label>
              </div>
            </div>
          </div>
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
              const { key, name, format, example } = item;
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
                          <div>
                            <label htmlFor={`edit-${key}`}>Edit Format</label>
                          </div>
                        </li>
                        <li>
                          <a>Delete</a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={`edit-${key}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <EditFormat
                            title="Edit Format"
                            name={name}
                            format={format}
                          />
                          <div className="modal-action">
                            <label htmlFor={`edit-${key}`} className="btn">
                              Cancel
                            </label>
                            <label htmlFor={`edit-${key}`} className="btn">
                              Save
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
