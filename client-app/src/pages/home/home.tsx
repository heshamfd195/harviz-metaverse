import { DivideBlock } from "@babylonjs/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketTemp } from "../socket/socket-temp";

const Home = () => {
  const navigate = useNavigate();

  const [logInState, setLogInState] = useState({
    isLogIn: false,
    userName: "",
  });

  const [name, setName] = useState("");

  const onEnteredvalue = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    setLogInState({ ...logInState, userName: name, isLogIn: true });

    // console.log("submited",e.target.value)
  };
  return (
    <div className="bg-gray-800 flex flex-col items-center h-screen w-screen p-4 text-white">
      <div className="container  h-1/2 border border-white rounded-md p-4 space-y-4 flex flex-col items-center my-12 ">
        <p className="text-white text-xl font-medium ">
  
          Welcome to Harviz Metaverse !!
        </p>
        {logInState.isLogIn && (
          <button
            className="bg-blue-500 px-6 py-2 shadow-md shadow-gray-900 font-semibold hover:bg-blue-400 rounded-md text-2xl "
            onClick={() => {
              navigate({pathname: "/hub",search: `?code=${name}`});
              
            }}
          >
            Enter Hub
          </button>
        )}

{ !logInState.isLogIn &&<form
    className="flex flex-col border space-y-3 border-white p-4 "
    onSubmit={onSubmitHandler}
>
    <p className="text-lg">Name</p>
    <input
    type="text"
    onChange={onEnteredvalue}
    className="text-black w-full"
    ></input>
    <button type="submit" className="bg-blue-600 px-3 py-1 rounded-md">
    Log in
    </button>
</form>}
      </div>

      {/* <SocketTemp/> */}
    </div>
  );
};

export default Home;

const Pcomp = () => {
  return <div></div>;
};
