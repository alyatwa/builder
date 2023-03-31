import React from "react";


interface Props {
  text: string;
  img: string;
  onClick: () => void;
}

const RoomCard: React.FC<Props> = ({ 
    text,
    img,
    onClick
  }) => { 
  return (
<div onClick={onClick} className="mx-1 pl-2.5 h-[58px] flex items-center transition-all rounded-md hover:cursor-pointer hover:bg-neutral-50">
    <span className="w-12 h-12 mr-3">
    <img src={img} className="w-12 h-12 mb-3 rounded-xl" />
    </span>

    <span className="text-xs">{text}</span>
    </div>
  );
}

export default RoomCard;