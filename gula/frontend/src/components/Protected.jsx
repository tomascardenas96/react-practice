import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected({ children, permission }) {
  const user = localStorage.getItem("token");
  const userPermission = localStorage.getItem("permission");

  const isAuth = () => {
    return userPermission === permission;
  };

  if (user !== null && user !== undefined && isAuth()) {
    return children ? children : <Outlet />;
  }

  if(!isAuth()) {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
  }

    return <Navigate to="/" />;

}

export default Protected;
