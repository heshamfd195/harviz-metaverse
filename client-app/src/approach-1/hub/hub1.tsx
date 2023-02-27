import React, { useEffect, useState } from "react";
import { LoginForm } from "../../app-components/form/login-form";
import { Navbar } from "../../app-components/navbar/navbar";
import { SceneMain } from "../scene/scane-main";
import axios from "axios";

export const Hub1 = () => {
  return (
    <React.Fragment>
      <div className="absolute z-10 w-screen">
        <Navbar userName={"Hesham"} avatarSrc={""} />
      </div>
      <div className="w-screen h-screen ">
        <SceneMain />
      </div>
    </React.Fragment>
  );
};
