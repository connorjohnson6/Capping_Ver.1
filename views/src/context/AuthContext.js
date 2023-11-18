import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:{
    _id: "6531e9b57814ff9f8562f6f1",
    username: "Connor Johnson",
    email: "connorjohnson211@gmail.com",
    profilePicture: "person/noAvatar.png",
    coverPicture: "",
    isAdmin: false,
    followers: [],
    followings: [],
  },


  // user:{
  //   _id: "6532e7b10f74809a7b67ae9e",
  //   username: "Marist Team",
  //   email: "maristcapping2024@gmail.com",
  //   profilePicture: "person/noAvatar.png",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: [],
  //   followings: [],
  // },


  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};