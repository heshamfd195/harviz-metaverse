import {
  Camera,
  Color3,
  MeshBuilder,
  NodeMaterial,
  StandardMaterial,
  Texture,
  UniversalCamera,
  Vector2,
  Vector3,
} from "@babylonjs/core";
import React, { useMemo } from "react";
import { useScene } from "react-babylonjs";
import { SetEnv } from "../setters/default-enviroment";

export const Room:React.FC<any> = ({onWorldEntered}) => {
  const scene = useScene()!;


  useMemo(() => {
    // SetEnv()

    const options={
      // groundColor: new Color3(0, 0.9, 1),
      skyboxColor: new Color3(0, 0.1, 1),
      skyboxSize:50
     }
     
     let  enviroment = scene?.createDefaultEnvironment(options);
    const ground = MeshBuilder.CreateGround(
      "roomGround",
      { width: 20, height: 20 },
      scene!
    );
    ground.position =new Vector3(0,0.005,0)
    ground.checkCollisions=true
    
    var materialPlane = new StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new Texture("assets/groundGrid.jpeg", scene);
    ground.material =materialPlane

    const portalMesh = MeshBuilder.CreateBox("box", {
      height: 5,
      width: 2,
      depth: 0.25,
    });
    portalMesh.position = new Vector3(0, 0, -5);

    async function getNodeMaterial() {
      let nodeMaterial = await NodeMaterial.ParseFromFileAsync(
        "hypnosis",
        "https://piratejc.github.io/assets/hypnosis.json",
        scene
      );
      portalMesh.material = nodeMaterial;
    }
    getNodeMaterial();
    
    scene.onPointerDown =function(evt,pickResult){
      if(pickResult.hit){
       let  val=String(pickResult?.pickedMesh?.name)
      //  console.log(val)
       if(val ==="box"){
          scene.getMeshByName("box")?.dispose()
          scene.getMeshByName("BackgroundHelper")?.dispose()
          scene.getMeshByName("roomGround")?.dispose()
          onWorldEntered()
       }
      }
    
    }
    //  let camera :any = scene?.getCameraByName("camera1")!
    //  camera._checkCollisions =false
    //  console.log(camera)
    //  camera.
   
  }, []);

  return null;
};
