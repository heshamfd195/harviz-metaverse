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
  SceneLoader
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
  Engine,
  Scene,
  Task,
  TaskType,
  useAssetManager,
  useBeforeRender,
  useScene,
} from "react-babylonjs";
import "../../App.css";
import { MyFallback } from "../loaders/asset-fallback";
import { AssetManagerLoader } from "../managers/asset-managar";
import { GroundBase } from "../meshes/ground-base";
import { DebugLayerSetter } from "../setters/debug-layer";


export const SceneHub = () => {

  const scene = useScene()

  return (
    <React.Fragment>
      <Engine antialias adaptToDeviceRatio canvasId="my-canvas">
        <Scene>
          <DebugLayerSetter />
          <universalCamera
            name="camera1"
            position={new Vector3(-0.5, 1, -10)}
            />
          <GroundBase />
          {/* <freeCamera
            name="camera2"
            position={new Vector3(0, 0, 0)}
          /> */}
        


          {/* <arcRotateCamera
              name="camera1"
              alpha={Math.PI / 2}
              beta={Math.PI / 2.2}
              radius={7}
              target={new Vector3(0, 6.8, 0)}
              minZ={0.1}
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
            /> */}
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <AssetManagerLoader />
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