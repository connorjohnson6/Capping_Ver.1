import React, { useState } from 'react'; 
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Calculations from "../../components/calculations/Calculations";
import { ChakraProvider } from "@chakra-ui/react";
import "./calculator.css";

function Calculator() {
  const [emissionsData, setEmissionsData] = useState([]);

  const addEmissionsData = (newData) => {
    setEmissionsData(currentData => [...currentData, newData]);
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <ChakraProvider>
          <Calculations addEmissionsData={addEmissionsData} />
        </ChakraProvider>
        <Rightbar pageType="calculations" emissionsData={emissionsData} />
      </div>
    </>
  );
}

export default Calculator;
