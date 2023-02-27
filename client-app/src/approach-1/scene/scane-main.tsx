import React, { Suspense, useEffect, useState } from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Scene,
  AssetsManager,
  SceneLoader,
} from "@babylonjs/core";
import SceneComponent from "./scene-component";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "../../App.css";
import { AssetManagerContextProvider } from "react-babylonjs";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import { User } from "../../classes/user/user";
import { useSelector } from "react-redux";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";

let box: Mesh | undefined;

export const SceneMain = () => {

  const [data,setData]=useState({flag:true})
  const {name} = useSelector((state:any) => state.appState._authentication)
  const onSceneUpdate=()=>{
    // setData("fouad")
  }

  // Lookup for StateUpdate in BJS Scene
  useEffect(()=>{
   
    
  },[onSceneUpdate])
  
  const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    // scene.debugLayer.show();

    //World
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, false);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 1;
    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    //User
    const user = new User(name,"male");
    let loader =SceneLoader.ImportMesh("", user.avatar.url, user.avatar.fileName, scene, function (newMeshes) {
     let mesh = newMeshes[0]
     mesh.rotation =new Vector3(0,-2*Math.PI,0)


    //GUI
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button1 = Button.CreateSimpleButton("but1", "Click Me");
    button1.width = "150px"
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.onPointerUpObservable.add(function() {
        // alert("you did it!");
        onSceneUpdate()

    });
    advancedTexture.addControl(button1);    


  });


    
  };
  return (
    <div >
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
      ></SceneComponent>
    </div>
  );
};
