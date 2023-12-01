/**
 * Context provider for authentication state in a React application.
 *
 * This file creates an `AuthContext` using React's Context API and provides a context provider
 * `AuthContextProvider`. It manages the authentication state using the `useReducer` hook with 
 * `AuthReducer` and also local storage to persist user data.
 *
 * The initial state includes a predefined user object and flags for fetching and error states.
 * The context provider makes available the user data, state flags, dispatch function for state updates,
 * and a state and setter for a 'goal' flag.
 *
 * @fileoverview Context and provider for managing authentication state in a React application.
 * @author [Connor Johnson]
 */

 import { createContext, useEffect, useReducer, useState } from "react";
 import AuthReducer from "./AuthReducer";
 
 // Initial state for the authentication context
 const INITIAL_STATE = {
   user: {
     // Example user data; replace with actual data or fetch from an API
     // I just didn't want to log in everytime on a refresh of the page
     _id: "65653fe314895d141ae456d3",
     username: "Connor",
     email: "connorjohnson211@gmail.com",
     profilePicture: "person/noAvatar.png",
     coverPicture: "",
     isAdmin: false,
     followers: [],
     followings: [],
   },

    //   _id: "6569432b7a28128a16269a29",
    //   username: "ahanys",
    //   email: "abhmind@gmail.com",
    //   profilePicture: "person/noAvatar.png",
    //   coverPicture: "",
    //   isAdmin: false,
    //   followers: [],
    //   followings: [],
    // },
   isFetching: false,
   error: false,
 };
 
 // Creating the authentication context
 export const AuthContext = createContext(INITIAL_STATE);
 
 // Provider component for the AuthContext
 export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
   const [isGoalSet, setIsGoalSet] = useState(false);
 
   // Effect to update local storage when the user state changes
   useEffect(() => {
     localStorage.setItem("user", JSON.stringify(state.user));
   }, [state.user]);
 
   return (
     <AuthContext.Provider
       value={{
         user: state.user,
         isFetching: state.isFetching,
         error: state.error,
         dispatch,
         isGoalSet,
         setIsGoalSet,
       }}
     >
       {children}
     </AuthContext.Provider>
   );
 };
 