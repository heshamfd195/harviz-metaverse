import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard: React.FC<any> = ({ name, route }) => {
  const navigate =useNavigate()
  const onNavigate = () => {
   navigate(`/${route}`)
  };
  return <div className="container w-40  border border-white rounded-md flex justify-center  font-semibold text-xl  p-6 hover:bg-blue-600 " onClick={onNavigate}>{name}</div>;
};

export const Projects = () => {
  return <div 
  className="flex flex-row space-x-4">
    <ProjectCard name="Test App" route="hub"/>
    <ProjectCard name="Approach 1" route="auth/1"/>
    <ProjectCard name="Approach 2" route="auth/2"/>
  </div>;
};
