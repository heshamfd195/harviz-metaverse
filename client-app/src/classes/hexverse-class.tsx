import { Vector3 } from "@babylonjs/core";

export class Hexverse {
    name: null;
    id: null;
    constructor() {
        this.name = null;
        this.id=null;
    }

}

export class User {
   name: string;
   position: Vector3
   id: null;
   animation: null;
   
   constructor(name:string){
      this.name =name;
      this.id=null;
      this.position= new Vector3(0,0,0)
      this.animation=null
   }
}

/** Plan for the classes
 * Hexverse Object
 * World
    * New Scene
    * 
 * Hub
    * Portals
    * Menu--> 3D GUI
 * Character
    * name
    * id
    * position
    * animation
 */


/** App Start up
 * Home
    * Hub
        * (1) Select Avatar
        * (2) Select Portal
            * Switch to world
            * Load new Scene()
            * Reload Avatar
            * 
 */