import React, { MouseEventHandler, ReactNode } from "react";

interface Props {
  items: {
    content: ReactNode;
    onClick?: MouseEventHandler;
  }[];
}

export const ActionMenu: React.FC<Props> = (props: Props) => {
  const { items } = props;
  return (
    <ul className="mt-2 rounded-md border border-gray-300 bg-white py-1.5 shadow">
      {items.map((item, index) => (
        <li key={index}>
          <button
            className="flex w-full cursor-pointer items-center px-4 py-1.5 text-left hover:bg-blue-500 hover:text-white"
            onClick={item.onClick}
          >
            {item.content}
          </button>
        </li>
      ))}
    </ul>
  );
};
