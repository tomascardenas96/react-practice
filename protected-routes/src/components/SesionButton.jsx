import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

function SesionButton() {
  const { user, login, logout } = useContext(UserContext);

  if(!user) {
    return <button onClick={login}>Login</button>
  } 
  return <button onClick={logout}>Logout</button>
}

export default SesionButton;
