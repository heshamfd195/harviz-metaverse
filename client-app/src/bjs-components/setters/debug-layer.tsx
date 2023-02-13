
import "@babylonjs/inspector";
import { useScene } from "react-babylonjs";
export const DebugLayerSetter:React.FC = () => {
    let scene = useScene();
    scene!.debugLayer.show();
    return null;
  };