import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected({ children, role }) {
  const user = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const isAuth = () => {
    return userRole === role;
  };

  if (user !== null && user !== undefined && isAuth()) {
    return children ? children : <Outlet />;
  }

  if(!isAuth()) {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

    return <Navigate to="/" />;

}

export default Protected;
