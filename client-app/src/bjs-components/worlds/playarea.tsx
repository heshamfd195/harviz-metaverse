import { AbstractMesh, AssetsManager, Scene, Vector3 } from "@babylonjs/core";
import React, { useMemo } from "react";
import { GroundBase } from "../meshes/ground-base";
import { SetEnv } from "../setters/default-enviroment";

interface WorldProps{
    scene? :Scene
}

export const PlayArea:React.FC<WorldProps> = ({scene}) => {
  //Environment
  //ground
  //Mesh loader

  useMemo(()=>{
//    scene?.getMaterialByName("one")
   SetEnv()
   GroundBase()
   let goalPost:AbstractMesh | any
   const assetsManager = new AssetsManager(scene);
    const meshTask = assetsManager.addMeshTask("skull task", "", "assets/", "goalPost.glb");
    meshTask.onSuccess = function (task) {
      goalPost = task.loadedMeshes[0]
      goalPost.position = new Vector3(8, 0, 0);

      goalPost.name ="goalPost"
      let goalPost1=goalPost.clone("goalPost2")
      goalPost1.position = new Vector3(-8, 0, 0);
      goalPost1.rotation = new Vector3(0, 2*Math.PI, 0);
    };
    assetsManager.load()
  },[scene])


  return null;
};
