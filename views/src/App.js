/**
 * The main application component for the React application.
 * 
 * This component sets up the routing for the application using React Router.
 * It defines the routes and their corresponding components, managing the navigation
 * throughout the app. Based on the user's authentication status, it redirects users
 * to appropriate pages (e.g., redirects to the home page if already logged in).
 * 
 * @fileoverview Main application component defining routes and navigation logic.
 * @author [Connor Johnson]
 */

 import React, { useContext } from "react";
 import Home from "./pages/home/Home";
 import Login from "./pages/login/Login";
 import Profile from "./pages/profile/Profile";
 import Register from "./pages/register/Register";
 import Calculator from "./pages/calculator/Calculator";
 import Goals from "./pages/goals/Goals";
 import Leaderboard from "./pages/leaderboard/Leaderboard";
 import Green from "./pages/green/Green";
 import Challenges from "./pages/challenges/Challenges";

 import {
   BrowserRouter as Router,
   Route,
   Routes,
   Navigate // Import Navigate for conditional navigation based on user status
 } from "react-router-dom";
 import { AuthContext } from "./context/AuthContext";
 
 function App() {
   // Use the AuthContext to check if the user is logged in
   const { user } = useContext(AuthContext);
 
   return (
     <Router>
       <Routes>
         {/* Define routes and corresponding components */}
         <Route path="/" element={user ? <Home /> : <Register />} />
         <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
         <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
         <Route path="/profile/:username" element={<Profile />} />
         <Route path="/calculator/:username" element={<Calculator />} />
         <Route path="/goals/:username" element={<Goals />} />
         <Route path="/leaderboard/:username" element={<Leaderboard />} />
         <Route path="/green/:username" element={<Green />} />
         <Route path="/challenges/:username" element={<Challenges />} />
       </Routes>
     </Router>
   );
 }
 
 export default App;
 
