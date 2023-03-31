import React from "react";
import Button from './Button'

interface Props {
  text: string;
  img: string;
  onClick: () => void;
}

const MashCard: React.FC<Props> = ({ 
    text,
    img,
    onClick
  }) => { 
  return (

<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img className=" rounded-t-lg" src={img} />
    <div className="p-2">
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-900">{text}</span>
            <Button text='Add' onClick={onClick}/>
        </div>
    </div>
</div>

  );
}

export default MashCard;