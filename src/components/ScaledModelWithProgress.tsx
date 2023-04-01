import React, { Suspense, useState } from 'react'

import { Model} from 'react-babylonjs'
import { Vector3, Matrix, Color3, PointerDragBehavior } from '@babylonjs/core';
import '@babylonjs/loaders';
import "babylonjs-inspector";


const ProgressFallback = (props: any) => (
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
  return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (10 / 2); // should be -15 for torus
}

const onModelLoaded = (loadedModel:any)=>{
  console.log(loadedModel)
  loadedModel.meshes[0].position =new Vector3(0, 0, 0)
  let drag = new PointerDragBehavior({dragPlaneNormal: new Vector3(0,1,0)});
  loadedModel.meshes[0].addBehavior(drag);
  drag.validateDrag = (p: Vector3): boolean =>{return validateDrag(p)}
  
  
  /*let mesh = loadedModel.meshes[1];
  loadedModel.meshes.forEach((mesh: any)=>{
     mesh.material = yourNonReactMaterial;
  }*/
}



const ScaledModelWithProgress = (props: any) => { 
  const [loadProgress, setLoadProgress] = useState(0);
 
  
const onDragEndObservable = (e:any)=>{
  //console.log(e)
}
  return (
    <Suspense key={props.id} fallback={<ProgressFallback progressRotation={props.progressRotation} center={props.center} scaleTo={props.scaleTo} loadProgress={loadProgress} progressBarColor={props.progressBarColor} />}>
      
      <Model name={props.id+"xx"}
        scaleToDimension={props.scaleTo}
        onLoadProgress={(evt) => {
          let modelLoadProgress = evt.lengthComputable ?
            evt.loaded / evt.total :
            evt.loaded / (props.estimatedFileSize * 0.085) /* provided fileSize is not for 'view' manifest, a bad guess often, but generally factor ~0.085 smaller  */
          setLoadProgress(modelLoadProgress);
        }} 
        onModelLoaded={(model) => {
          onModelLoaded(model);
          setLoadProgress(1);
          if (props.onModelLoaded) {
            props.onModelLoaded(model);
          }
        }} 
        rootUrl={props.rootUrl}
        sceneFilename={props.sceneFilename}
        pluginExtension={props.fileExtension}
        rotation={props.modelRotation} position={props.center}
      />
       
    </Suspense>
  )
}

export default ScaledModelWithProgress;