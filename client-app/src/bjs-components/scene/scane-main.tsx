import React, { Suspense } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Scene, AssetsManager, SceneLoader } from "@babylonjs/core";
import SceneComponent from "./scene-component";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "../../App.css";
import { AssetManagerContextProvider } from "react-babylonjs";
import { MyFallback } from "../loaders/asset-fallback";
import { AssetManagerLoader } from "../managers/asset-managar";
import { DebugLayerSetter } from "../setters/debug-layer";
import '@babylonjs/loaders'

let box: Mesh | undefined;

const onSceneReady = (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

  // const assetsManager = new AssetsManager(scene);
  // const meshTask = assetsManager.addMeshTask("skull task", "", "assets/", "Dude.babylon");
  // meshTask.onSuccess = function (task) {
  //     task.loadedMeshes[0].position = Vector3.Zero();
  //   };

  // assetsManager.load()


  SceneLoader.Append("assets/", "Dude.babylon", scene, function (scene) {

  })
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export const SceneMain = () => (
  <div>
    <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas">
      {/* <AssetManagerLoader/> */}
      {/* <DebugLayerSetter /> */}
    </SceneComponent>
  </div>
);