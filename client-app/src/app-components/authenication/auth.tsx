import React from "react";
import { useParams } from "react-router-dom";
import { LoginForm } from "../form/login-form";

export const Auth = () => {
 let {id} = useParams()
 console.log(id)
  return (
    <div className="bg-gray-800 flex flex-col items-center h-screen w-screen p-4 text-white">
      <div className="container  h-2/3 border border-white rounded-md p-4 space-y-4 flex flex-col items-center my-12 ">
        <p className="text-white text-xl font-medium ">
          Login Yourself !!
        </p>
        <LoginForm id={id}/>
      </div>


    </div>
  );
};
