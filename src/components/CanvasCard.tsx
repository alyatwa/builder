import React from "react";

import { Engine, Scene, Skybox } from "react-babylonjs";
import {
	Vector3, Tools, CannonJSPlugin
} from "@babylonjs/core";
import ScaledModelWithProgress from "./ScaledModelWithProgress";
import {IMesh} from '../Types/interfaces'
import * as Cannon from 'cannon-es';
window.CANNON = Cannon;

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


interface Props {
	meshs: Array<IMesh>;
  onMouseUP: (mesh:string, newPos:Vector3) => void;
}

const CanvasCard: React.FC<Props> = ({ meshs, onMouseUP }) => {
	const GROUND_SIZE = 10;
  
	const onSceneMount = (e: any) => {
		const { canvas, scene } = e;
		scene.enablePhysics(new Vector3(0, 0, 0), new CannonJSPlugin());
    scene.debugLayer.show();
	scene.collisionsEnabled = true;
    
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

						{meshs.map((mesh: IMesh) => (
							<ScaledModelWithProgress 
								key={mesh.id}
                                id={mesh.id}
								text = {mesh.text}
								MatFace={mesh.MatFace}
								matImg={mesh.matImg}
								useIMG={mesh.useIMG}
								glbURL={mesh.glbURL}
								rotation={mesh.rotation}
								XPos={mesh.XPos}
								ZPos={mesh.ZPos}
							/>
						))}
						<utilityLayerRenderer>
							{/*<gizmoManager
								thickness={3} scaleRatio={0.7}
								positionGizmoEnabled={false}
								rotationGizmoEnabled
							>
						</gizmoManager>*/}
            </utilityLayerRenderer>
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
