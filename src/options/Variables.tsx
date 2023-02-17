export const Variables: React.FC = () => {
  return (
    <div>
      <h3 className="mb-4 text-lg">Variables:</h3>
      <p className="text-gray-500">You can use following variables in format.</p>
      <dl className="mt-4">
        <dt className="mt-2 font-mono font-semibold text-gray-500">{"{{title}}"}</dt>
        <dd className="pl-12 text-gray-500">Page title.</dd>

        <dt className="mt-2 font-mono font-semibold text-gray-500">{"{{url}}"}</dt>
        <dd className="pl-12 text-gray-500">Page URL.</dd>

        <dt className="mt-2 font-mono font-semibold text-gray-500">{"{{url_pathname}}"}</dt>
        <dd className="pl-12 text-gray-500">Path part of the page URL.</dd>

        <dt className="mt-2 font-mono font-semibold text-gray-500">{"{{url_filename}}"}</dt>
        <dd className="pl-12 text-gray-500">Last path segments of the page URL.</dd>
      </dl>
    </div>
  );
};
