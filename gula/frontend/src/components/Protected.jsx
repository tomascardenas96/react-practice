import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected({ children, permission }) {
  const user = localStorage.getItem("token");

  const isAuth = async () => {
    const userPermission = await new Promise((resolve) => {
      resolve(localStorage.getItem("permission"));
    });
    
    return userPermission === permission;
  };

  if (!isAuth()) {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
  }
  if (user === null || user === undefined) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
}

export default Protected;
