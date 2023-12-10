import React from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import SetGoal from '../../components/setGoal/SetGoal';
import { ChakraProvider } from "@chakra-ui/react";



import "./goals.css";

function Goals() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        {/* Boostrap react-styling */}
        <ChakraProvider> 
        <SetGoal />
        </ChakraProvider>
        <Rightbar pageType="goals"/>
      </div>
    </>
  );
}

export default Goals;
