import { Camera, FreeCamera, Light, Mesh, Vector3 } from "@babylonjs/core";

interface IUserColliisons {}
interface IUserAnimations {}
interface IUserAvatar{
    id:string;
    url:string;
    fileName:string;
}

export class User {
    private name: string;
    public gender:string;
    public avatar:IUserAvatar
    public mesh: Mesh | undefined;
    public attachedCamera: FreeCamera | undefined;
    public position: Vector3 = new Vector3(0, 0, 0);
    
  
  
  /**
   * Initialize
   * @param name 
   * @param avatarId 
   */
    constructor(name: string,gender: string) {
      this.name = name;
      this.gender=gender
      this.avatar={id:"123",url:"assets/",fileName:"man.glb"}
    }
    /**
     * Set Attach Camera
     * @param attachedCamera
     */
    public setAttachCamera(attachedCamera: FreeCamera | undefined) {
      this.attachedCamera = attachedCamera;
    }
    /**
     * Update Position
     * @param position
     */
    public updatePosition(position: Vector3) {
      this.position = position;
    }
  
    /**
     * Attach the Avatar Mesh
     * @param mesh
     */
    public attachMesh(mesh: Mesh) {
      this.mesh = mesh;
    }
  
    public getUserPosition(){
      return this.position
    }
   /**
    * Change Camera
      * First Persion
      * Secone Persion
    */
    public changeCamera(){}
  
  }
  