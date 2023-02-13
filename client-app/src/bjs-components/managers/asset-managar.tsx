import { AbstractMesh, AssetsManager, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button } from "@babylonjs/gui";
import { useMemo } from "react";
import { useScene } from "react-babylonjs";

export const AssetManagerLoader:React.FC =()=>{

  let mesh: AbstractMesh;
  // useMemo(()=>{
    const scene =useScene()
    const assetsManager = new AssetsManager(scene!);
    const meshTask = assetsManager.addMeshTask("skull task", "", "assets/", "man.glb");
    meshTask.onSuccess = function (task) {
        task.loadedMeshes[0].position = Vector3.Zero();
        task.loadedMeshes[0].rotation = new  Vector3(0,2*Math.PI,0);
       mesh =task.loadedMeshes[0]


  

      };
    assetsManager.load()
  // },[])


  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var button1 = Button.CreateSimpleButton("but1", "Click Me");
  button1.width = "150px"
  button1.height = "40px";
  button1.color = "white";
  button1.cornerRadius = 20;
  button1.background = "green";
  button1.onPointerUpObservable.add(function() {
    let z=mesh.position._z
    z+=0.4
    mesh.position = new Vector3(0,0,z)
      
  });
  advancedTexture.addControl(button1);   


    return null
}