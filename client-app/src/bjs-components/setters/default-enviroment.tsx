import { Color3, Scene } from "@babylonjs/core";
import { useScene } from "react-babylonjs";

interface SetEnvProps{
    scene? : Scene
}

export const  SetEnv=()=>{

    const scene =useScene()
    const options={
     groundColor: new Color3(0, 0.9, 1),
     skyboxColor: new Color3(0, 0.8, 1),
     skyboxSize:50
    
    }
    
    let  enviroment = scene?.createDefaultEnvironment(options);
    return null
   }
   