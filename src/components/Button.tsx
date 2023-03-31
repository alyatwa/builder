import React from "react";

interface Props {
  text: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ 
    text,
    onClick
  }) => { 
  return (
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center" type="button"
      onClick={onClick}
    >
    <span className="flex h-full items-center whitespace-nowrap">{text}</span>
    </button>
  );
}

export default Button;