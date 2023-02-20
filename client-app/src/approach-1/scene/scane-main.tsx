import React, { Suspense } from "react";
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

let box: Mesh | undefined;

export const SceneMain = () => {
  const {name} = useSelector((state:any) => state.appState._authentication)
  
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
  });


    
  };
  return (
    <div className="w-screen h-screen">
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        id="my-canvas"
      ></SceneComponent>
    </div>
  );
};
