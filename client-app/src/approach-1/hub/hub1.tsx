import React from "react";
import { LoginForm } from "../../app-components/form/login-form";
import { Navbar } from "../../app-components/navbar/navbar";
import { SceneMain } from "../scene/scane-main";



export const Hub1 = () => {
  return (
    <div >
      <Navbar userName={"hesham"} avatarSrc="" />
      <SceneMain />

    </div>
  );
};
