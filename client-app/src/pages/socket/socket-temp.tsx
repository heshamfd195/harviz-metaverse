import { DivideBlock } from "@babylonjs/core";
import React, { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket("ws://127.0.0.1:8080");
// const client = new w3cwebsocket("ws://harviz-metaverse-backend.vercel.app");

export const SocketTemp = () => {
  const [logInState, setLogInState] = useState({
    isLogIn: false,
    userName: "",
    messages: [] as any[],
  })
  const [name, setName] = useState("");
  const [enteredMsg,setMsg] =useState("")

  const onButtonClicked = (value: any) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: enteredMsg,
        user: logInState.userName,
      })
    );
  };

  const onEnteredvalue = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    setLogInState({ ...logInState, userName: name, isLogIn: true });

    // console.log("submited",e.target.value)
  };

  useEffect(() => {
    client.onopen = () => {
      console.log(" The websocket client is connected");
    };
    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer);

      if (dataFromServer.type === "message") {
        let messagesU =[...logInState.messages,{    
            msg: dataFromServer.msg,
            user: dataFromServer.user
          }]

        setLogInState({...logInState,messages:messagesU})
      }

    };
  });

  return (
    <div className="w-[40%]">
      {logInState.isLogIn ? (
        <div className="flex flex-col space-y-4 border border-white p-4">
        <p> User : {logInState.userName}</p>
        <input type="text" className="text-black" onChange={(e)=>{setMsg(e.target.value)}}></input>
        <button
          onClick={onButtonClicked}
          className="border border-white text-white bg-green-500 rounded-md px-4 py-2"
        >
          Send Message
        </button>
        {logInState.messages.map((msg,index)=>{
           return <p key={index} className=" bg-blue-500 p-2 rounded-md font-medium"> message : {msg.msg} ,user :{msg.user}</p>
        })}
        </div>
      ) : (
        <form
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
        </form>
      )}
    </div>
  );
};
