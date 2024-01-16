import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./styles/Menu.css";

function Menu() {
  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "black" : "grey",
      fontWeight: isActive ? "600" : null,
    };
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  return (
    <>
      <ul className="menu-container">
        <NavLink to="/home" style={activeStyle}>
          <li>Home</li>
        </NavLink>
        <NavLink to="/profile" style={activeStyle}>
          <li>Profile</li>
        </NavLink>
        <NavLink to="/" style={activeStyle}>
          <li>Messages</li>
        </NavLink>
        <NavLink to="/" style={activeStyle}>
          <li>Search</li>
        </NavLink>
        <NavLink to="/" style={activeStyle} onClick={logOut}>
          <li>Logout</li>
        </NavLink>
      </ul>

      <Outlet />

      <div className="footer-container">
        footer
      </div>
    </>
  );
}

export default Menu;
