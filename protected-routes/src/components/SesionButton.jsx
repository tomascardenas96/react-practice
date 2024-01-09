import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import './styles/Navbar.css'

function SesionButton() {
  const { user, login, logout } = useContext(UserContext);

  if (!user) {
    return <button className="session-btn" onClick={login}>Login</button>;
  }
  return <button className="session-btn" onClick={logout}>Logout</button>;
}

export default SesionButton;
