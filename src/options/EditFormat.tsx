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

      <h3 className="mt-10 mb-4">Variables:</h3>
      <p className="text-gray-500">
        You can use following variables in format.
      </p>
      <dl className="mt-4">
        <dt className="mt-2 font-mono font-semibold text-gray-500">
          {"{{title}}"}
        </dt>
        <dd className="pl-12 text-gray-500">Page title.</dd>
        <dt className="mt-2 font-mono font-semibold text-gray-500">
          {"{{url}}"}
        </dt>
        <dd className="pl-12 text-gray-500">Page URL.</dd>
      </dl>
    </div>
  );
};
