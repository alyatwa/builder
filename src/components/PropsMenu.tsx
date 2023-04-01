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
  <div className="basis-36 shrink-0 flex items-center space-x-2">
    <span>Rotation</span><a></a></div>
    <div className="relative flex items-center w-full text-neutral-800 bg-white border-neutral-200 border border-solid overflow-hidden px-1.5 h-8 rounded-md">
  <input className="placeholder-neutral-300 outline-none font-input w-full" role="input" type="number" max="360" min="0" value={propsMenu.rotation}/></div></div>

<div className="flex flex-col font-normal">
  <label className="mb-2 text-sm" htmlFor="text">Text</label>
  <div className="relative flex items-center w-full text-neutral-800 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md  border-error-default">
  <input className="placeholder-neutral-300 select-none font-input w-full" role="input" name="text" value={propsMenu.text}/></div>
</div>

<div className="flex h-8 items-center">
  <label className="basis-40 flex items-center space-x-2">
    <span>Color</span><a></a></label>
    <div className="h-6 w-6 border border-solid border-neutral-75 rounded-full shadow-xs hover:cursor-pointer hover:shadow-sm transition-shadow ml-auto"></div>
    </div>

    <div className="flex flex-col font-normal">
  <label className="mb-2 text-sm" htmlFor="img">Image</label>
  <div className="relative flex items-center w-full text-neutral-800 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md  border-error-default">
  <input className="placeholder-neutral-300 select-none font-input w-full" role="input" name="img" value={propsMenu.img}/></div>
</div>

<div className="flex flex-col font-normal">
  <label className="mb-2 text-sm" htmlFor="xpos">XPos</label>
  <div className="relative flex items-center w-full text-neutral-800  disabled:opacity-75 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md bg-gray-50 border-error-default">
  <input className="placeholder-neutral-300 select-none  font-input w-full" disabled role="input" name="xpos" value={propsMenu.XPos}/></div>
</div>

<div className="flex flex-col font-normal">
  <label className="mb-2 text-sm" htmlFor="xpos">YPos</label>
  <div className="relative flex items-center w-full text-neutral-800  disabled:opacity-75 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md bg-gray-50 border-error-default">
  <input className="placeholder-neutral-300 select-none font-input w-full" disabled role="input" name="zpos" value={propsMenu.ZPos}/></div>
</div>

</div>
        </div>
             </div>

  );
}

export default PropsMenu;