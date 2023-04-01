import { useEffect, useState } from 'react'
import MeshCard from './components/MeshCard'
import Header from './components/Header'
import CanvasCard from './components/CanvasCard'
import PropsMenu from './components/PropsMenu'
import './App.css'

type mesh = {
  ZPos: number;
  XPos: number;
  rotation: number;
  glbURL: string;
  img: string;
  text: string;
  id: string;
  UseIMG: boolean;
}

function App() {
  const [meshs, addMesh] = useState<mesh[]>([]);
  const dataMenu = [
    {id:"ghgzxyh", img:"https://i.imgur.com/IvjqVWK.png", label:"Room X1", glbURL:"glb"},
    {id:"ghgwejk", img:"https://i.imgur.com/ZZ1cZGj.png", label:"Room X2", glbURL:"glb"},
    {id:"ghgxcft", img:"https://i.imgur.com/pDQpCW5.png", label:"Room X2", glbURL:"glb"},
    {id:"ghgaqse", img:"https://i.imgur.com/pDQpCW5.png", label:"Room X2", glbURL:"glb"}
  ]

  /*const dataScene = [
    {id:"ghgh-hjhgyh", glbURL:"https://res.cloudinary.com/recapdataebse/image/upload/v1674410473/v3_dxv1wj.glb", UseIMG:true, text:"CS", ZPos:0, XPos:5, rotation: 45, img:"https://daisycom/bvc"},
    {id:"ghgfgfghgyh", glbURL:"https://res.cloudinary.com/recapdataebse/image/upload/v1674410473/v3_dxv1wj.glb", UseIMG:true, text:"CS", ZPos:1, XPos:2, rotation: 45, img:"https://daisycom/bvc"}
  ]*/

  useEffect(()=>{
    console.log("add first mesh")
    addMesh([
      {id:"ghffgrjhgyh", glbURL:"https://res.cloudinary.com/recapdataebse/image/upload/v1680316343/roo_sihbrf.glb", UseIMG:true, text:"CS", ZPos:0, XPos:2, rotation: 45, img:"https://daisycom/bvc"}])

  },[])

  const addNewMesh = ():void => {
    
    addMesh([...meshs, {id:"ghgfggfjhgyh"+Math.random(), glbURL:"https://res.cloudinary.com/recapdataebse/image/upload/v1680295347/roo_gjmvcb.glb", UseIMG:true, text:"AR", ZPos:0, XPos:0, rotation: 90, img:"https://daisyfgfgvc"}])
    console.log("add new mesh!", meshs)
  }

  return (
    <div className="App">

<div className="flex grow flex-col h-screen">
      <Header  onClick={() => console.log("You clicked on the circle!")}/>
      <div className="flex grow flex-row h-full max-h-[calc(100%-54px)]">

      <div className="border-solid border-r-[1px] border-neutral-75 max-h-screen overflow-y-auto flex flex-grow">
        <div id="settings-container" className="w-[252px]">
        <div className="flex flex-col mx-2 space-y-2 my-4">
          {dataMenu.map((mesh)=> <MeshCard key={mesh.id} img={mesh.img} text={mesh.label} onClick={() => addNewMesh()}/>)}
      </div>
      </div>
      </div>

      <CanvasCard meshs={meshs}/>
      <PropsMenu/>
      </div>
      </div>


      {/*<Button text='Save' onClick={() => console.log("You clicked on the pink circle!")}/>*/}
   
    </div>
  )
}

export default App
