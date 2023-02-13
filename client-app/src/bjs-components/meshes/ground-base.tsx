import { MeshBuilder } from "@babylonjs/core";
import { useScene } from "babylonjs-hook";

export const GroundBase = () => {
    const scene = useScene()
    const ground = MeshBuilder.CreateGround("ground",
        { width: 20, height: 20 },
        scene!);
    return null
}

