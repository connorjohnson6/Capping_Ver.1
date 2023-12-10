import React, { useState } from 'react'; 
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Calculations from "../../components/calculations/Calculations";
import { ChakraProvider } from "@chakra-ui/react";
import "./calculator.css";

function Calculator() {
  const [emissionsData, setEmissionsData] = useState([]);  // useState array of emissions data

  // Function to add new emissions data to the state
  const addEmissionsData = (newData) => {
    setEmissionsData(currentData => [...currentData, newData]); // Updates the emissionsData state by appending new data
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <ChakraProvider>
          <Calculations addEmissionsData={addEmissionsData} />               {/* Calculations component with a prop to handle data addition */}
        </ChakraProvider>

        <Rightbar pageType="calculations" emissionsData={emissionsData} />   {/* Rightbar component to display emissions data, passed as a prop */}

      </div>
    </>
  );
}

export default Calculator;
