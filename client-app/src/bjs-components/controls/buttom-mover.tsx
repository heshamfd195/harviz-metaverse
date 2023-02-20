import { AbstractMesh, ActionManager, ExecuteCodeAction, KeyboardEventTypes, Vector3 } from '@babylonjs/core';
import React from 'react'
import { useScene } from 'react-babylonjs';


export const ButtonMovers: React.FC<any> = ({onUserPing,onUserAnimate}) => {

  const scene = useScene()!
  const walkingAnimation = scene?.getAnimationGroupByName("Walking")
  const walkingBackAnimation = scene?.getAnimationGroupByName("WalkingBack")
  const idleAnimation = scene?.getAnimationGroupByName("Idle")


  var heroSpeed = 0.03;
  var heroSpeedBackwards = 0.01;
  var heroRotationSpeed = 0.05;

  var animating = true;

  

  const walkAnim = scene.getAnimationGroupByName("Walking");
  const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
  const idleAnim = scene.getAnimationGroupByName("Idle");

  let hero: any = scene?.getMeshByName("man")


 

  interface InputMapType {
    [key: string]: any
  }
  let inputMap: InputMapType = {}


  scene.actionManager = new ActionManager(scene);
  scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

  }));
  scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";

  }));

  scene.onBeforeRenderObservable.add(() => {
    var keydown = false;
    //Manage the movements of the character (e.g. position, direction)
    if (inputMap["w"]) {
      hero.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
      keydown = true;
    }
    if (inputMap["s"]) {
      hero.moveWithCollisions(hero.forward.scaleInPlace(-heroSpeedBackwards));
      keydown = true;
    }
    if (inputMap["a"]) {
      hero.rotate(Vector3.Up(), -heroRotationSpeed);
      keydown = true;
    }
    if (inputMap["d"]) {
      hero.rotate(Vector3.Up(), heroRotationSpeed);
      keydown = true;
    }


    if(keydown){
      // console.log(hero.position)
      // console.log(hero)
      onUserPing(hero.position)
      
    }


    //Manage animations to be played  
    if (keydown) {
      if (!animating) {
        animating = true;
        if (inputMap["s"]) {
          //Walk backwards
          // onUserAnimate("WalkingBack")
          walkBackAnim?.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
        }

        else {
          //Walk
          // onUserAnimate("Walking")
          walkAnim?.start(true, 1.0, walkAnim.from, walkAnim.to, false);
        }
      }
    }
    else {

      if (animating) {
        // onUserAnimate("Idle")
        //Default animation is idle when no key is down     
        idleAnim?.start(true, 1.0, idleAnim.from, idleAnim.to, false);

        //Stop all animations besides Idle Anim when no key is down

        walkAnim?.stop();
        walkBackAnim?.stop();

        //Ensure animation are played only once per rendering loop
        animating = false;
      }
    }
  });

  // scene?.onKeyboardObservable.add((kbInfo: any) => {

  // console.log(kbInfo)


  // if (kbInfo) {

  //   switch (kbInfo.event.key) {
  //     case 'w':
  //       mesh.moveWithCollisions(mesh.forward.scaleInPlace(0.05))
  //       walkingAnimation?.start(false, 1, walkingAnimation.from, walkingAnimation.to, false)
  //       break;
  //     case 's':
  //       mesh.moveWithCollisions(mesh.forward.scaleInPlace(-0.02))
  //       walkingBackAnimation?.start(false, 1.0, walkingBackAnimation.from, walkingBackAnimation.to, false)
  //       break;
  //     case 'a':
  //       mesh.rotate(Vector3.Up(), -0.1)
  //       break;
  //     case 'd':
  //       mesh.rotate(Vector3.Up(), 0.1)
  //       break;
  //     default:
  //       break;




  //   }
  // }
  // else {
  //   idleAnimation?.start(true, 1.0, idleAnimation.from, idleAnimation.to, false)
  //   walkingAnimation?.stop()
  //   walkingBackAnimation?.stop()

  // }








  // });



  return (
    null
  )
}

