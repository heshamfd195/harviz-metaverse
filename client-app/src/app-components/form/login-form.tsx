import { displayPassPixelShader } from "@babylonjs/core/Shaders/displayPass.fragment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appStateActions } from "../../store/slice-1";

export const LoginForm:React.FC<any> = ({id}) => {

  const navigate =useNavigate()
  const dispatch =useDispatch()

  const [logInState, setLogInState] = useState({
    isLogIn: false,
    userName: "",
  });

  const [name, setName] = useState("");
  const onEnteredvalue = (e: any) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    setLogInState({ ...logInState, userName: name, isLogIn: true });
    navigate(`/hub${id}`)
    dispatch(appStateActions.setAuth(name))


    // console.log("submited",e.target.value)
  };
  return (
    <form
      className="flex flex-col border space-y-3 border-white p-4 w-1/3 "
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
    </form>
  );
};
