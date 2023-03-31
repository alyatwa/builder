import React from "react";
import Button from './Button'

interface Props {
  text?: string;
  img?: string;
  onClick?: () => void;
}

const PropsMenu: React.FC<Props> = ({ 
    text,
    img,
    onClick
  }) => { 
  return (
<div className="border-solid border-l-[1px] border-neutral-75">
<div className="w-[252px] h-full overflow-auto">
<div className="font-medium px-4 mt-4 mb-6">Props</div>
<div className="flex flex-col space-y-4">
<div className="flex px-4 h-8 items-center flex-col">
    <label className="basis-40 flex items-center space-x-2"><span>text or img</span></label>
    <label className="basis-40 flex items-center space-x-2"><span>Color</span></label>
    <label className="basis-40 flex items-center space-x-2"><span>Text</span></label>
    <label className="basis-40 flex items-center space-x-2"><span>Image</span></label>
</div>

</div>
        </div>
             </div>

  );
}

export default PropsMenu;