import { Variables } from "./Variables";

interface Props {
  title: string;
  name?: string;
  onChangeName?: (name: string) => void;
  format?: string;
  onChangeFormat?: (format: string) => void;
}

export const EditFormat: React.FC<Props> = (props: Props) => {
  const { title, name, onChangeName, format, onChangeFormat } = props;

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-6">{title}</h1>

      <div className="w-full">
        <label htmlFor="name" className="label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="input input-bordered w-full"
          autoFocus
          defaultValue={name}
          onChange={(e) => onChangeName?.(e.currentTarget.value)}
        />

        <label htmlFor="format" className="label mt-4">
          Format:
        </label>
        <textarea
          id="format"
          className="textarea textarea-bordered w-full h-36 text-base font-mono resize-none"
          defaultValue={format}
          onChange={(e) => onChangeFormat?.(e.currentTarget.value)}
        />
      </div>

      <Variables />
    </div>
  );
};
