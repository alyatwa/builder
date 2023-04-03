import { useEffect, useState } from "react";
import MeshCard from "./components/MeshCard";
import Header from "./components/Header";
import CanvasCard from "./components/CanvasCard";
import PropsMenu from "./components/PropsMenu";
import "./App.css";
import { Vector3 } from "@babylonjs/core";
import { IMesh } from "./Types/interfaces";

function App() {
	const [meshs, setMesh] = useState<IMesh[]>([]);
	const [propsMenu, setMenuProps] = useState<any>({
		id: "#",
		glbURL: "",
		MatFace: "https://i.imgur.com/IvjqVWK.png",
		useIMG: true,
		text: "#",
		ZPos: 0,
		XPos: 0,
		color: "#000",
		rotation: 0,
		matImg: "",
	});

	const dataMenu = [
		{
			id: "ghgzxyh",
			img: "https://i.imgur.com/IvjqVWK.png",
			label: "Room X1",
			glbURL: "glb",
		},
		{
			id: "ghgwejk",
			img: "https://i.imgur.com/ZZ1cZGj.png",
			label: "Room X2",
			glbURL: "glb",
		},
		{
			id: "ghgxcft",
			img: "https://i.imgur.com/pDQpCW5.png",
			label: "Room X2",
			glbURL: "glb",
		},
		{
			id: "ghgaqse",
			img: "https://i.imgur.com/pDQpCW5.png",
			label: "Room X2",
			glbURL: "glb",
		},
	];

	/*const dataScene = [
    {id:"ghgh-hjhgyh", glbURL:"https://res.cloudinary.com/recapdataebse/image/upload/v1674410473/v3_dxv1wj.glb", UseIMG:true, text:"CS", ZPos:0, XPos:5, rotation: 45, matImg:"https://daisycom/bvc"},
    {id:"ghgfgfghgyh", glbURL:"https://res.cloudinary.com/recapdataebse/image/upload/v1674410473/v3_dxv1wj.glb", UseIMG:true, text:"CS", ZPos:1, XPos:2, rotation: 45, matImg:"https://daisycom/bvc"}
  ]*/

	useEffect(() => {
		//console.log("add first mesh")
		setMesh([
			{
				id: "ghffgrjhgyh",
				glbURL:
					"https://res.cloudinary.com/recapdataebse/image/upload/v1680316343/roo_sihbrf.glb",
				useIMG: true,
				text: "Room X",
				ZPos: 0,
				XPos: 2,
				color: "#000",
				MatFace: "room_101_primitive0",
				rotation: 0,
				matImg:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGw2hN9enaEIbvQwMiWQy7ZwBh3S8qUqx1ow&usqp=CAU",
			},
		]);
	}, []);

	const addNewMesh = (): void => {
		setMesh([
			...meshs,
			{
				id: "ghgfggfjhgyh" + Math.random(),
				glbURL:
					"https://res.cloudinary.com/recapdataebse/image/upload/v1680316343/roo_sihbrf.glb",
				useIMG: true,
				text: "Room Z",
				ZPos: 1,
				XPos: 1,
				color:"#000",
				MatFace: "room_101_primitive0",
				rotation: 90,
				matImg: "https://i.imgur.com/IvjqVWK.png",
			},
		]);
		//console.log("add new mesh!", meshs)
	};

	const delMesh =(id: string):void =>{
		console.log(id)
		//setMenuProps(newState.find((msh: IMesh) => msh.id === meshId));
		setMesh((prevState: IMesh[]) =>{
			const newState = prevState.filter(function(obj) { 
			return obj.id !== id 
		})
		return newState;
	});
	console.log(meshs)
	}

	const onMouseUP = (meshId: string, pos: Vector3): void => {
		setMesh((prevState) => {
			const newState = prevState.map((obj) => {
				if (obj.id === meshId) {
					return { ...obj, XPos: pos.x, ZPos: pos.z };
				}
				return obj;
			});
			//console.log(newState.find((msh: IMesh) => msh.id === meshId))
			setMenuProps(newState.find((msh: IMesh) => msh.id === meshId));
			return newState;
		});
	};

	const updateMesh = (meshId: string, rotation: number, text:string, color:string, matImg:string, useIMG: boolean): void => {
		setMesh((prevState) => {
			const newState = prevState.map((obj:IMesh) => {
				if (obj.id === meshId) {
					return { ...obj, rotation, text, color, matImg, useIMG};
				}
				return obj;
			});
			//setMenuProps(newState.find((msh: IMesh) => msh.id === meshId));
			return newState;
		});
	};

	return (
		<div className="App">
			<div className="flex grow flex-col h-screen">
				<Header onClick={() => console.log(propsMenu)} />
				<div className="flex grow flex-row h-full max-h-[calc(100%-54px)]">
					<div className="border-solid border-r-[1px] border-neutral-75 max-h-screen overflow-y-auto flex flex-grow">
						<div id="settings-container" className="w-[252px]">
							<div className="flex flex-col mx-2 space-y-2 my-4">
								{dataMenu.map((mesh) => (
									<MeshCard
										key={mesh.id}
										img={mesh.img}
										text={mesh.label}
										onClick={() => addNewMesh()}
									/>
								))}
							</div>
						</div>
					</div>

					<CanvasCard meshs={meshs} onMouseUP={onMouseUP} />
					<PropsMenu propsMenu={propsMenu} delMesh={delMesh} updateMesh={updateMesh} />
				</div>
			</div>
		</div>
	);
}

export default App;
