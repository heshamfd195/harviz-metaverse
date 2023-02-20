import React from "react";
import { useSelector } from "react-redux";

interface NavbarProps {
  userName: string;
  avatarSrc: string;
}

export const Navbar: React.FC<NavbarProps> = ({ userName}) => {
  const authenication = useSelector((state:any) => state.appState._authentication)
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6 ">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" fill="#2B6CB0" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">Metaverse</span>
      </div>
      <p className="text-white">
       Active Users : 1
      </p>
      <div className="flex items-center">
        <div className="text-sm text-gray-300 mr-4">{authenication.name}</div>
        <img
          className="h-8 w-8 rounded-full bg-white"
          src={"https://gravatar.com/avatar/4399ba383f39a67a465fbe5d72c25cbf?s=400&d=robohash&r=x"}
          alt={`Avatar for ${authenication.name}`}
        />
      </div>
    </nav>
  );
};



