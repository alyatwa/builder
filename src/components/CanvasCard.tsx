import React from "react";

import { Engine, Scene, Skybox } from "react-babylonjs";
import {
	Vector3, Tools,
	Color3,
} from "@babylonjs/core";

import ScaledModelWithProgress from "./ScaledModelWithProgress";

const SkyboxScenes = [
	{
		name: "sunny day",
		texture: `https://brianzinn.github.io/react-babylonjs/assets/textures/TropicalSunnyDay`,
	},
	{
		name: "specular HDR",
		texture: `https://brianzinn.github.io/react-babylonjs/assets/textures/SpecularHDR.dds`,
	},
];

interface Type {
	ZPos: number;
	XPos: number;
	rotation: number;
	glbURL: string;
	img: string;
	text: string;
	id: string;
}

interface Props {
	meshs: Array<Type>;
  onMouseUP: (mesh:string, newPos:Vector3) => void;
}

const CanvasCard: React.FC<Props> = ({ meshs, onMouseUP }) => {
	const GROUND_SIZE = 10;
  
	const onSceneMount = (e: any) => {
		const { canvas, scene } = e;
    //scene.debugLayer.show();
    
	};
  const onMeshPicked = (e: any) => {
		const { canvas, scene } = e;
    //console.log(e);
	};
 
  const onScenePointerUp = (e: any) => {
		const { canvas, scene } = e;
    if (!e.pickInfo.pickedMesh.parent) return;
    onMouseUP(e.pickInfo.pickedMesh.parent.parent.parent.name, e.pickInfo.pickedMesh.parent.parent.parent.position);
    //console.log("parent Pos: "+e.pickInfo.pickedMesh.parent.parent.parent.position);
    //console.log("point Pos: "+new Vector3(e.pickInfo.pickedPoint));
	};
	return (
		<div className="w-full flex flex-col overflow-x-auto relative bg-neutral-50 border-b grow align-center">
			<div className=" grow h-3/4 bg-white shadow-lg m-8 rounded-lg">
				<Engine
					antialias={true}
					adaptToDeviceRatio={true}
					canvasId="sample-canvas"
				>
					<Scene onSceneMount={onSceneMount}  onScenePointerUp={onScenePointerUp} onMeshPicked={onMeshPicked}>
						<Skybox
							rootUrl={SkyboxScenes[Math.abs(0) % SkyboxScenes.length].texture}
						/>

						<arcRotateCamera
							name="camera1"
							alpha={Math.PI / 2}
							beta={Math.PI / 2}
							radius={9.0}
							target={Vector3.Zero()}
							minZ={0.001}
						/>
						<hemisphericLight
							name="light1"
							intensity={0.7}
							direction={Vector3.Up()}
						/>

						{meshs.map((mesh) => (
							<ScaledModelWithProgress 
								key={mesh.id}
                id={mesh.id}
								rootUrl={mesh.glbURL.slice(0, mesh.glbURL.lastIndexOf("/") + 1)}
								sceneFilename={mesh.glbURL.split("/").pop()+"?"+mesh.id}
								scaleTo={1}
								progressBarColor={Color3.FromInts(255, 165, 0)}
								modelRotation={new Vector3(0, Tools.ToRadians(mesh.rotation), 0)}
								center={new Vector3(mesh.XPos, 0, mesh.ZPos)}
							/>
						))}
						{/*<utilityLayerRenderer>
							<gizmoManager 
								thickness={3} scaleRatio={0.7}
								positionGizmoEnabled={false}
								rotationGizmoEnabled
							>
                </gizmoManager>
            </utilityLayerRenderer>*/}
						<ground isPickable={false}
							name="ground1"
							width={GROUND_SIZE}
							height={GROUND_SIZE}
							subdivisions={2}
						/>
					</Scene>
				</Engine>
			</div>
		</div>
	);
};

export default CanvasCard;
