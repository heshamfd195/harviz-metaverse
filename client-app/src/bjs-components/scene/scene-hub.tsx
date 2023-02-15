import {
  Color4,
  CubeTexture,
  DebugLayer,
  DynamicTexture,
  HDRCubeTexture,
  Mesh,
  MeshAssetTask,
  MeshBuilder,
  PBRMetallicRoughnessMaterial,
  StandardMaterial,
  Texture,
  Vector3,
  AssetContainer,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/inspector";

import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AssetManagerContext,
  AssetManagerContextProvider,
  Button,
  Engine,
  Scene,
  Task,
  TaskType,
  useAssetManager,
  useBeforeRender,
  useScene,
} from "react-babylonjs";
import { w3cwebsocket } from "websocket";
import "../../App.css";
import { ButtonMovers } from "../controls/buttom-mover";
import { MyFallback } from "../loaders/asset-fallback";
import { AssetManagerLoader } from "../managers/asset-managar";
import { GroundBase } from "../meshes/ground-base";
import { Room } from "../room/room";
import { DebugLayerSetter } from "../setters/debug-layer";
import { SetEnv } from "../setters/default-enviroment";
import { PlayArea } from "../worlds/playarea";
const client = new w3cwebsocket("ws://127.0.0.1:8080");

export const SceneHub = () => {
  const scene=useScene()
  const [logInState, setLogInState] = useState({
    isLogIn: false,
    userName: "hesham",
    messages: [] as any[],
  });


  const onUserPing = (value: any) => {
    // console.log(JSON.stringify(value))
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
        user: JSON.stringify(value),
      })
    );
  };


  useEffect(()=>{
    client.onopen = () => {
      console.log(" The websocket client is connected");
    };
    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer);

      if (dataFromServer.type === "message") {

        let mesh =scene?.getMaterialById("man")
        let messagesU =[...logInState.messages,{    
            msg: dataFromServer.msg,
            user: dataFromServer.user
          }]

        setLogInState({...logInState,messages:messagesU})
      }

    };
  },[onUserPing])


  const [isMeshLoad, setMeshLoader] = useState(false);
  const [isWorldTeleport, setWorldState] = useState(false);

  const onMeshLoadedCheck = (val: boolean) => {
    setMeshLoader(true);
  };

  const onWorldEntered = () => {
    setWorldState(true);
  };

  return (
    <React.Fragment>
      <Engine antialias adaptToDeviceRatio canvasId="my-canvas">
        <Scene>
          {/* <SetEnv/> */}
          <DebugLayerSetter />
   
            {/* <universalCamera
              name="camera1"
              position={new Vector3(-0.5, 1, -10)}
              // applyGravity={true}
              checkCollisions={true}
            /> */}
          
          {/* <GroundBase /> */}
          {/* <freeCamera
            name="camera2"
            position={new Vector3(0, 0, 0)}
            applyGravity
          /> */}
          {/* <PlayArea/>
           */}
          {isWorldTeleport && <PlayArea />}
          {!isWorldTeleport && <Room onWorldEntered={onWorldEntered} />}

          {(
            <arcRotateCamera
              name="camera2"
              alpha={Math.PI / 2}
              beta={Math.PI / 2.2}
              radius={5}
              target={new Vector3(0, 1, 0)}
              minZ={0.05}
              lowerRadiusLimit={2}
              upperRadiusLimit={8}
              inertia={0.9}
              angularSensibilityX={1000}
              angularSensibilityY={1000}
              panningSensibility={4000}
              pinchDeltaPercentage={0.01}
              wheelDeltaPercentage={0.01}
              wheelPrecision={1}
              upperBetaLimit={2}
              speed={0.1}
              noPreventDefault={false}
            />
          )}
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <AssetManagerLoader onMeshLoaded={onMeshLoadedCheck} />
          {isMeshLoad && <ButtonMovers onUserPing={onUserPing} />}
          {/* <AssetManagerContextProvider>
              <Suspense
                fallback={
                  <MyFallback  />
                }
              >
              </Suspense>
            </AssetManagerContextProvider> */}
        </Scene>
      </Engine>
    </React.Fragment>
  );
};
