import React, { Suspense, useState } from 'react'

import { Model} from 'react-babylonjs'
import { Vector3, Matrix, Color3 } from '@babylonjs/core';
import '@babylonjs/loaders';

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

const onModelLoaded = (loadedModel:any)=>{
  console.log("model loaded")
  /*let mesh = loadedModel.meshes[1];
  loadedModel.meshes.forEach((mesh: any)=>{
     mesh.material = yourNonReactMaterial;
  }*/
}
const onDragEndObservable = (e:any)=>{
  console.log(e)
}


const ScaledModelWithProgress = (props: any) => { 
  const [loadProgress, setLoadProgress] = useState(0);
  const validateDrag = (targetPosition:any) => {
    return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (10 / 2); // should be -15 for torus
  }
  return (
    <Suspense key={props.id} fallback={<ProgressFallback progressRotation={props.progressRotation} center={props.center} scaleTo={props.scaleTo} loadProgress={loadProgress} progressBarColor={props.progressBarColor} />}>
      <mesh name={props.id} >
      <Model name={props.id} 
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
        
        
        position={props.center}
        rootUrl={props.rootUrl}
        sceneFilename={props.sceneFilename}
        pluginExtension={props.fileExtension}
        rotation={props.modelRotation}
      />
      
      <pointerDragBehavior onDragEndObservable={onDragEndObservable} dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
      </mesh>
    </Suspense>
  )
}

export default ScaledModelWithProgress;