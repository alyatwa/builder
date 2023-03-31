import React from "react";
import Button from './Button'

interface Props {
  text?: string;
  img?: string;
  onClick: () => void;
}

const Header: React.FC<Props> = ({ 
    text,
    img,
    onClick
  }) => { 
  return (

<div className="sticky w-full flex justify-end bg-white border-b border-b-neutral-100 h-[52px] basis-[52px] shrink-0 grow-0 z-[3] top-0 align-center">
         
        <div className="flex items-center  space-x-2 mr-4"> 
        <Button text="Save" onClick={onClick}/>
        </div>
        </div>
             

  );
}

export default Header;