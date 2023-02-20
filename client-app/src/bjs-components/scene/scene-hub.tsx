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
import { useSearchParams } from "react-router-dom";
import { w3cwebsocket } from "websocket";
import "../../App.css";
import { ButtonMovers } from "../controls/buttom-mover";
import { UserOberver } from "../controls/user-oberser";
import { MyFallback } from "../loaders/asset-fallback";
import { AssetManagerLoader } from "../managers/asset-managar";
import { AssetManagerLoader2 } from "../managers/asset-managar2";
import { GroundBase } from "../meshes/ground-base";
import { Room } from "../room/room";
import { DebugLayerSetter } from "../setters/debug-layer";
import { SetEnv } from "../setters/default-enviroment";
import { PlayArea } from "../worlds/playarea";
const client = new w3cwebsocket("ws://127.0.0.1:8080");

export const SceneHub = () => {
  const [searchParams] = useSearchParams();
  const [isMultiUser, setMultiUser] = useState({
    state: false,
    user2: "",
    position: {},
  });
  const [isUserAnimate,setUserAnimate]=useState({loop:false,name:"Idle"})
  const code = searchParams.get("code");
  const scene = useScene();
  const [logInState, setLogInState] = useState({
    isLogIn: false,
    userName: code,
    messages: [] as any[],
  });

  const onUserAnimate=(val:any)=>{
    let message = {name:val}
    console.log(JSON.stringify(val));
    client.send(
      JSON.stringify({
        type: "animation",
        msg: JSON.stringify(message),
        user: code,
      })
    );
  }






  const onUserPing = (value: any) => {
    // console.log(JSON.stringify(value));
    client.send(
      JSON.stringify({
        type: "position",
        msg: JSON.stringify(value),
        user: code,
      })
    );
  };

  useEffect(() => {
    client.onopen = () => {
      console.log(" The websocket client is connected");
    };

    // client.onmessage = (message: any) => {
    //   const dataFromServer = JSON.parse(message.data);
    //   console.log("got reply! ", dataFromServer);
    //   if (dataFromServer.user !== code) {
    //     let pos = JSON.parse(dataFromServer.msg);

    //    return  setMultiUser({
    //       ...isMultiUser,
    //       state: true,
    //       user2: dataFromServer.user,
    //       position: pos,
    //     });
    //   }

    //   if (dataFromServer.type ==="animation") {
    //     let ani = JSON.parse(dataFromServer.msg);
    //     setUserAnimate({...isUserAnimate,loop:true,name:ani.name})

    
    //   }

    // };
    return;
    // client.onmessage = (message: any) => {
    //   const dataFromServer = JSON.parse(message.data);
    //   console.log("got reply! ", dataFromServer);

    //   if (dataFromServer.type === "message") {

    //     let messagesU =[...logInState.messages,{
    //         msg: dataFromServer.msg,
    //         user: dataFromServer.user
    //       }]

    //     setLogInState({...logInState,messages:messagesU})
    //   }

    // };
  }, []);

  const [isMeshLoad, setMeshLoader] = useState(false);
  const [isMeshLoad2, setMeshLoader2] = useState(false);
  const [isWorldTeleport, setWorldState] = useState(false);

  const onMeshLoadedCheck = (val: boolean) => {
    setMeshLoader(true);
  };
  const onMeshLoadedCheck2 = (val: boolean) => {
    setMeshLoader2(true);
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

          {
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
          }
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <AssetManagerLoader onMeshLoaded={onMeshLoadedCheck} />
          {isMultiUser.state && (
            <AssetManagerLoader2
              onMeshLoaded={onMeshLoadedCheck2}
              name={isMultiUser.user2}
            />
          )}
        {isMeshLoad && <ButtonMovers onUserPing={onUserPing} onUserAnimate={onUserAnimate}  />}
        {/* {isMeshLoad2 && <UserOberver aniName={isUserAnimate.name} userPosition={isMultiUser.position} userName={isMultiUser.user2}/>} */}

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
