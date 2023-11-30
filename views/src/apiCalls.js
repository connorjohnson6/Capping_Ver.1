/**
 * Asynchronous function to handle user login.
 * 
 * This function sends a login request with the user's credentials and dispatches
 * actions based on the success or failure of the request. It uses axios for making
 * the HTTP POST request to the '/auth/login' endpoint.
 * 
 * @param {object} userCredential - The user login credentials, typically including username/email and password.
 * @param {function} dispatch - The dispatch function from the state management context (like Redux or useReducer hook).
 * 
 * @fileoverview Utility function for handling login operations using axios and dispatch for state management.
 * @author [Connor Johnson]
 */

 import axios from "axios";

 export const loginCall = async (userCredential, dispatch) => {
   // Dispatch an action to indicate the start of the login process
   dispatch({ type: "LOGIN_START" });
 
   try {
     // Attempt to login with the provided user credentials
     const res = await axios.post("/auth/login", userCredential);
 
     // Dispatch a success action with the received response data
     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
   } catch (err) {
     // Dispatch a failure action with the error object
     dispatch({ type: "LOGIN_FAILURE", payload: err });
   }
 };
 