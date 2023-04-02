import React, { Suspense, useState } from 'react'

import { ILoadedModel, Model, } from 'react-babylonjs'
import { Vector3, PhysicsImpostor, Matrix,Texture,Material,Tools,  Constants,Color3,StandardMaterial, PointerDragBehavior, Mesh, AbstractMesh } from '@babylonjs/core';
import '@babylonjs/loaders';
import "babylonjs-inspector";
import {IMesh} from '../Types/interfaces'

interface TypeModel {
  scaleTo: number;
  center: Vector3;
  progressRotation: Vector3;
  progressBarColor: Color3;
  loadProgress: number;
}


const ProgressFallback = (props: TypeModel) => (
  <mesh name="mesh" rotation={props.progressRotation} position={props.center}>
    <box key="progress" name="boxProgress" height={props.scaleTo / 15} width={props.scaleTo} depth={props.scaleTo / 30} scaling={new Vector3(props.loadProgress, 1, 1)}
      position={new Vector3(props.scaleTo / 2, 0, props.scaleTo / 60)}
      setPivotMatrix={[Matrix.Translation(-props.scaleTo, 0, 0)]}
      setPreTransformMatrix={[Matrix.Translation(-props.scaleTo / 2, 0, 0)]}>
      <standardMaterial name='sdMat' diffuseColor={props.progressBarColor} specularColor={Color3.Black()} />
    </box>
    <box key="back" name="boxBack" height={props.scaleTo / 15} width={props.scaleTo} depth={props.scaleTo / 30}
      position={new Vector3(0, 0, props.scaleTo / -60)}
    />
  </mesh>
)

const validateDrag = (targetPosition: Vector3): boolean => {
  return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (10 / 2)-0.5; // should be -15 for torus
}



const ScaledModelWithProgress = (props: IMesh) => { 
  const [loadProgress, setLoadProgress] = useState(0);

 const onModelLoaded = (loadedModel: any)=>{
  loadedModel.meshes[0].position = Vector3.Zero()
  loadedModel.meshes[0].rotation = Vector3.Zero()
  
    let msh:Mesh = loadedModel.meshes[0].parent
  let drag = new PointerDragBehavior({dragPlaneNormal: new Vector3(0,1,0)});
 
  drag.updateDragPlane = false;
  /*drag.onDragObservable.add((eventData) => {
    console.log(eventData)
    msh.moveWithCollisions(eventData.delta)
})*/
msh.addBehavior(drag);
  drag.validateDrag = (p: Vector3): boolean =>{return validateDrag(p)}
  
  let MatMesh: Mesh = loadedModel.meshes.find((face: Mesh) => face.name === props.MatFace);
  if (MatMesh) MatMesh.material = MatModel(props.matImg)
  
}

const MatModel = (imgUrl: string): Material =>{
  let imgMat = new StandardMaterial("img_mat");
  imgMat.diffuseTexture = new Texture(imgUrl)
  imgMat.diffuseTexture.wrapU = Constants.TEXTURE_CLAMP_ADDRESSMODE;
  imgMat.diffuseTexture.wrapV = Constants.TEXTURE_CLAMP_ADDRESSMODE;
  imgMat.diffuseTexture.scale(1)
  imgMat.diffuseColor = Color3.FromHexString("#6B6B6B")
  imgMat.emissiveColor = Color3.FromHexString("#6B6B6B")
  return imgMat;

}

  return (
    <Suspense key={props.id} fallback={<ProgressFallback progressRotation={new Vector3(0,0,0)} center={new Vector3(props.XPos, 0, props.ZPos)} scaleTo={1} loadProgress={loadProgress} progressBarColor={Color3.FromInts(255, 165, 0)} />}>
      
      <Model name={props.id}
        scaleToDimension={1}
        onLoadProgress={(evt) => {
          let modelLoadProgress = evt.lengthComputable ?
            evt.loaded / evt.total :
            evt.loaded / (2000 * 0.085) /* provided fileSize is not for 'view' manifest, a bad guess often, but generally factor ~0.085 smaller  */
          setLoadProgress(modelLoadProgress);
        }} 
        onModelLoaded={(model) => {
          onModelLoaded(model);
          setLoadProgress(1);
        }}
        
        rootUrl={props.glbURL.slice(0, props.glbURL.lastIndexOf("/") + 1)}
        sceneFilename={props.glbURL.split("/").pop()+"?"+props.id}
        
        rotation={new Vector3(0, Tools.ToRadians(props.rotation), 0)} position={new Vector3(props.XPos, 0, props.ZPos)}
      />
       
    </Suspense>
  )
}

export default ScaledModelWithProgress;