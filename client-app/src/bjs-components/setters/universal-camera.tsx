import { UniversalCamera, Vector3 } from "@babylonjs/core";
import { useScene } from "react-babylonjs";


export const SetUniversalCamera:React.FC<any> = ({canvas}) => {
    const scene = useScene()
    const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 0, -10), scene!);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    return null
}

