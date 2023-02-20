import { AbstractMesh, ActionManager, ExecuteCodeAction, KeyboardEventTypes, Vector3 } from '@babylonjs/core';
import React from 'react'
import { useScene } from 'react-babylonjs';


export const UserOberver: React.FC<any> = ({aniName,UserName}) => {

  const scene = useScene()!
  const walkingAnimation = scene?.getAnimationGroupByName("Walking")
  const walkingBackAnimation = scene?.getAnimationGroupByName("WalkingBack")
  const idleAnimation = scene?.getAnimationGroupByName("Idle")


  var heroSpeed = 0.03;
  var heroSpeedBackwards = 0.01;
  var heroRotationSpeed = 0.05;

  var animation ="Idle"

  

  const walkAnim = scene.getAnimationGroupByName("Walking");
  const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
  const idleAnim = scene.getAnimationGroupByName("Idle");

  let hero: any = scene?.getMeshByName(UserName)
  console.log("hero , ", hero)

  if( aniName ==="Walking" ){
    walkAnim?.start(true, 1.0, walkAnim.from, walkAnim.to, false);
  }

  else if (aniName ==="alkingBack"){
    walkBackAnim?.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);

  }

  else{

    idleAnim?.start(true, 1.0, idleAnim.from, idleAnim.to, false);


    walkAnim?.stop();
    walkBackAnim?.stop();

  }



 





 
  





  return (
    null
  )
}

