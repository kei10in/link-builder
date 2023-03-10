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
    <ul className="mt-2 shadow bg-white rounded-md py-1.5 border border-gray-300">
      {items.map((item, index) => (
        <li key={index}>
          <button
            className="text-left w-full cursor-pointer px-4 py-1.5 hover:bg-blue-500 hover:text-white flex items-center"
            onClick={item.onClick}
          >
            {item.content}
          </button>
        </li>
      ))}
    </ul>
  );
};
