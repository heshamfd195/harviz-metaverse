import { MeshBuilder, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { useScene } from "babylonjs-hook";

export const GroundBase = () => {
    const scene = useScene()!
    const ground = MeshBuilder.CreateGround("ground",
        { width: 20, height: 20 },
        scene!);
        ground.position = new Vector3(0,0.01,0)
        var materialPlane = new StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new Texture("assets/grassMap.jpeg", scene);
        (materialPlane.diffuseTexture as any).uScale = 5.0;//Repeat 5 times on the Vertical Axes
        (materialPlane.diffuseTexture as any).vScale = 5.0;//Repeat 5 times on the Horizontal Axes
        materialPlane.backFaceCulling = false;//Allways show the front and the back of an element
    
        ground.material = materialPlane;
    return null
}

