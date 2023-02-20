import { Camera, FreeCamera, Light, Mesh, Vector3 } from "@babylonjs/core";

interface IEnvironment {}

interface IUsers {}

export class Hexverse {}

export class Users {}

export class Environment {
  lights: Light[];
  skybox: any;
  cameras: Camera[];

  constructor(lights: Light[], skybox: any, cameras: Camera[]) {
    this.lights = lights;
    this.skybox = skybox;
    this.cameras = cameras;
  }
}

export class World {
  private environment: IEnvironment;
  //   private users: IUsers[];

  constructor(environment: IEnvironment) {
    this.environment = environment;
  }
}



