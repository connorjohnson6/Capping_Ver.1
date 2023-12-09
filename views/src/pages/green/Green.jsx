import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./green.css";

// External stylesheet link for custom fonts
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
// Component for the "Green" page
export default function Green() {
  // Data for CO2 emissions from various activities
  const emissionsData = [
    {
      id: 1,
      activity: "Driving a Car",
      emissions: 2.3, // in kilograms of CO2 per mile
    },
    {
      id: 2,
      activity: "Using a Gas Lawnmower",
      emissions: 3.5, // in kilograms of CO2 per hour
    },
    {
      id: 3,
      activity: "Air Travel (short-haul flight)",
      emissions: 0.2, // in kilograms of CO2 per passenger-mile
    },
    // Add more activities and emissions data as needed
    {
      id: 4,
      activity: "Heating a Home with Natural Gas",
      emissions: 4.2, // in kilograms of CO2 per hour
    },
    {
      id: 5,
      activity: "Eating Beef",
      emissions: 13.3, // in kilograms of CO2 per pound
    },
    {
      id: 6,
      activity: "Using a Gas-Powered Generator",
      emissions: 6.8, // in kilograms of CO2 per hour
    },
  ];

  // Data for environmentally friendly alternatives
  const alternativesData = [
    {
      id: 1,
      alternative: "Carpooling or using public transportation",
    },
    {
      id: 2,
      alternative: "Switching to an electric or manual lawnmower",
    },
    {
      id: 3,
      alternative: "Opting for eco-friendly transportation or reducing air travel",
    },
    {
      id: 4,
      alternative: "Switching to energy-efficient heating methods",
    },
    {
      id: 5,
      alternative: "Choosing plant-based diet options",
    },
    {
      id: 6,
      alternative: "Using renewable energy sources instead of generators",
    },
  ];

  // Function to render CO2 emissions data
  const renderEmissions = () => {
    return emissionsData.map((item) => (
      <div key={item.id} className="emissions-item">
        <p>{item.activity}</p>
        <p>{item.emissions} kg CO2 per {item.activity.includes("flight") ? "passenger-mile" : "hour"}</p>
      </div>
    ));
  };

  // Function to render environmentally friendly alternatives
  const renderAlternatives = () => {
    return (
      <div className="alternatives">
        <h2>Environmentally Friendly Alternatives</h2>
        <ul>
          {alternativesData.map((item) => (
            <li key={item.id} style={{ marginBottom: '13px' }}>{item.alternative}</li>
          ))}
        </ul>
        {/* Material Symbols Outlined icon for recycling */}
        <span class="material-symbols-outlined large-icon">recycling </span>
      </div>
    );
  };

  // JSX rendering
  return (
    <>
      {/* Top navigation bar */}
      <Topbar />
      <div className="homeContainer">
        {/* Sidebar for navigation */}
        <Sidebar />
        <div className="mainContent">
          {/* Container for CO2 emissions information */}
          <div className="emissions-container">
            <h1>CO2 Emissions from Activities</h1>
            {renderEmissions()}
            {/* Material Symbols Outlined icon for drama (possibly representing filter options) */}
            <span class="material-symbols-outlined large-icon">filter_drama</span>
          </div>
          {/* Render environmentally friendly alternatives */}
          {renderAlternatives()}
        </div>
        {/* Sidebar on the right side of the page */}
        <Rightbar pageType="green" />
      </div>
    </>
  );
}