import React from "react";
import Button from './Button'

interface propsMenu {
	ZPos: number;
	XPos: number;
	rotation: number;
	glbURL: string;
	img: string;
	text: string;
	id: string;
	UseIMG: boolean;
};

const PropsMenu: React.FC<propsMenu | any> = ({propsMenu}) => { 
  return (
<div className="border-solid border-l-[1px] border-neutral-75">
<div className="w-[252px] h-full overflow-auto">
<div className="font-medium px-4 mt-4 mb-3">Props {propsMenu.text}</div>
<div className="flex flex-col  px-4 space-y-3 mx-2">

<div className="flex h-8 items-center">
  <div className="basis-36 shrink-0 flex items-center space-x-2  text-sm">
    <span>Rotation</span>
    </div>
    <div className="relative flex items-center w-full text-neutral-800 bg-white border-neutral-200 border border-solid overflow-hidden px-1.5 h-8 rounded-md">
  <input className="placeholder-neutral-300 outline-none font-input w-full" role="input" type="number" max="360" min="0" value={propsMenu.rotation}/></div></div>

<div className="flex flex-col font-normal">
  <label className="mb-2 text-sm" htmlFor="text">Text</label>
  <div className="relative flex items-center w-full text-neutral-800 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md  border-error-default">
  <input className="placeholder-neutral-300 select-none font-input w-full" role="input" name="text" value={propsMenu.text}/></div>
</div>

<div className="flex h-8 items-center">
  <label className="basis-40 flex items-center space-x-2 text-sm">
    <span>Color</span>
    </label>
    <div className="h-6 w-6 border border-solid border-neutral-75 rounded-full shadow-xs hover:cursor-pointer hover:shadow-sm transition-shadow ml-auto"></div>
    </div>
 

    <div className="flex h-8 items-center font-normal">
<div className="shrink-0 flex grow items-center space-x-2  text-sm">
    <span>Use Img</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label></div>

    <div className="flex flex-col font-normal">
  <label className="mb-2 text-sm" htmlFor="img">Image</label>
  <div className="relative flex items-center w-full text-neutral-800 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md  border-error-default">
  <input className="placeholder-neutral-300 select-none font-input w-full" role="input" name="img" value={propsMenu.img}/></div>
</div>



<div className="flex h-8 items-center font-normal">
<div className="basis-1/2 shrink-0 flex items-center space-x-2 text-sm">
    <span>XPos</span>
    </div>
  <div className="relative flex items-center w-full text-neutral-800 disabled:opacity-75 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md bg-gray-50 ">
  <input className="placeholder-neutral-300 select-none font-input w-full" disabled role="input" name="xpos" value={propsMenu.XPos}/>
  </div>
  </div>

  <div className="flex h-8 items-center font-normal">
<div className="basis-1/2 shrink-0 flex items-center space-x-2 text-sm">
    <span>YPos</span>
    </div>
  <div className="relative flex items-center w-full text-neutral-800 disabled:opacity-75 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md bg-gray-50 ">
  <input className="placeholder-neutral-300 select-none font-input w-full" disabled role="input" name="zpos" value={propsMenu.ZPos}/>
  </div>
  </div>


</div>
        </div>
             </div>

  );
}

export default PropsMenu;