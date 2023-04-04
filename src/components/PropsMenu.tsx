import React, { useState } from "react";
import Button from "./Button";
import { IMesh } from "../Types/interfaces";
import { SketchPicker } from "react-color";

type IMeshType = {
	propsMenu: IMesh;
	delMesh: (id: string) => void;
	updateMesh: (
		meshId: string,
		rotation: number,
		text: string,
		color: string,
		matImg: string,
		useIMG: boolean
	) => void;
};
const PropsMenu: React.FC<IMeshType> = ({ propsMenu, updateMesh, delMesh }) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isMenuActive, setMenu] = useState<boolean>(false);

	const [rot, setRot] = useState<number | null>(null);
	const [text, setText] = useState<string| null>(null);
	const [color, setColor] = useState<string| null>(null);
	const [matImg, setMatImg] = useState<string | null>(null);
	const [useImg, setUseImg] = useState<boolean| null>(null);

	React.useEffect(() => {
		if (!propsMenu) {return;} else setMenu(true);
		setRot(propsMenu.rotation);
		setText(propsMenu.text);
		setColor(propsMenu.text);
		setMatImg(propsMenu.matImg);
		setUseImg(propsMenu.useIMG);
	}, [propsMenu]);

	const updateRotation = (e: any) => {
		setRot(e.target.value);
		updateMesh(propsMenu.id, e.target.value, text!, color!, matImg!, useImg!);
	};
	const updateText = (e: any) => {
		setText(e.target.value);
		updateMesh(propsMenu.id, rot!, e.target.value, color!, matImg!, useImg!);
	};

	const updateColor = (color: any) => {
		setColor(color.hex);
		updateMesh(propsMenu.id, rot!, text!, color.hex, matImg!, useImg!);
	};

	const updateMatimg = (e: any) => {
		setMatImg(e.target.value);
		updateMesh(propsMenu.id, rot!, text!, color!, e.target.value, useImg!);
	};

	const updateUseimg = (e: any) => {
		setUseImg(!useImg);
		updateMesh(propsMenu.id, rot!, text!, color!, matImg!, e.target.checked);
	};

	return (
		<div className="border-solid border-l-[1px] border-neutral-75">
			<div className="w-[252px] h-full overflow-auto">
        {isMenuActive && <>
				<div className="font-medium px-4 mt-4 mb-3">Props {propsMenu.text}</div>

				<div className="flex flex-col  px-4 space-y-3 mx-2">
					<div className="flex h-8 items-center">
						<div className="basis-36 shrink-0 flex items-center space-x-2  text-sm">
							<span>Rotation</span>
						</div>
						<div className="relative flex items-center w-full text-neutral-800 bg-white border-neutral-200 border border-solid overflow-hidden px-1.5 h-8 rounded-md">
							<input
								onChange={updateRotation}
								className="placeholder-neutral-300 outline-none font-input w-full"
								role="input"
								type="number"
								max="360"
								min="0"
								value={rot!}
							/>
						</div>
					</div>

					<div className="flex flex-col font-normal">
						<label className="mb-2 text-sm" htmlFor="text">
							Text
						</label>
						<div className="relative flex items-center w-full text-neutral-800 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md  border-error-default">
							<input
								onChange={updateText}
								className="placeholder-neutral-300 select-none font-input w-full"
								role="input"
								name="text"
								value={text!}
							/>
						</div>
					</div>

					<div className="flex h-8 items-center">
						<label className="basis-40 flex items-center space-x-2 text-sm">
							<span>Color</span>
						</label>
						<div
							onClick={() => setOpen(!isOpen)}
							style={{ backgroundColor: color! }}
							className="h-6 w-6 border border-solid border-neutral-75 rounded-full shadow-xs hover:cursor-pointer hover:shadow-sm transition-shadow ml-auto"
						></div>
					</div>

					{isOpen && (
						<SketchPicker color={color!} onChangeComplete={updateColor} />
					)}

					<div className="flex h-8 items-center font-normal">
						<div className="shrink-0 flex grow items-center space-x-2  text-sm">
							<span>Use Img</span>
						</div>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								onChange={updateUseimg}
								checked={useImg!}
								type="checkbox"
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
						</label>
					</div>

					<div className="flex flex-col font-normal">
						<label className="mb-2 text-sm" htmlFor="img">
							Image
						</label>
						<div className="relative flex items-center w-full text-neutral-800 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md  border-error-default">
							<input
								onChange={updateMatimg}
								className="placeholder-neutral-300 select-none font-input w-full"
								role="input"
								name="img"
								value={matImg!}
							/>
						</div>
					</div>

					<div className="flex h-8 items-center font-normal">
						<div className="basis-1/2 shrink-0 flex items-center space-x-2 text-sm">
							<span>XPos</span>
						</div>
						<div className="relative flex items-center w-full text-neutral-800 disabled:opacity-75 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md bg-gray-50 ">
							<input
								className="placeholder-neutral-300 select-none font-input w-full"
								disabled
								role="input"
								name="xpos"
								value={propsMenu.XPos}
							/>
						</div>
					</div>

					<div className="flex h-8 items-center font-normal">
						<div className="basis-1/2 shrink-0 flex items-center space-x-2 text-sm">
							<span>YPos</span>
						</div>
						<div className="relative flex items-center w-full text-neutral-800 disabled:opacity-75 border-neutral-100 border border-solid overflow-hidden px-3 h-8 rounded-md bg-gray-50 ">
							<input
								className="placeholder-neutral-300 select-none font-input w-full"
								disabled
								role="input"
								name="zpos"
								value={propsMenu.ZPos}
							/>
						</div>
					</div>
					<div className="flex h-8 items-center font-normal justify-end">
						<button
							className="text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-thin rounded-lg text-sm px-3 py-2 text-center"
							type="button"
							onClick={() => delMesh(propsMenu.id)}
						>
							<span className="flex h-full items-center whitespace-nowrap">
								Delete
							</span>
						</button>
					</div>
				
        
        </div>
			</>}
      </div>
		</div>
	);
};

export default PropsMenu;
