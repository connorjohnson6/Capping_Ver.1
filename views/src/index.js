/**
 * The entry point for the React application.
 * 
 * This file imports the main App component and wraps it with the necessary context providers.
 * It uses ReactDOM to render the App component into the root DOM node of the HTML document.
 * 
 * The application is wrapped with `<React.StrictMode>` for highlighting potential problems in the application.
 * It also includes `<AuthContextProvider>` to provide authentication context throughout the app.
 * 
 * @fileoverview Entry point for the React application.
 * @author [Connor Johnson]
 */

 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import App from './App';
 import { AuthContextProvider } from "./context/AuthContext";
 
 // Create a root element where the React app will be mounted.
 const root = ReactDOM.createRoot(document.getElementById('root'));
 
 // Render the React application into the root element.
 root.render(
   <React.StrictMode>
     <AuthContextProvider>
       <App />
     </AuthContextProvider>
   </React.StrictMode>,
 );
 