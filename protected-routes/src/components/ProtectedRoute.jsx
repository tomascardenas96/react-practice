import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

function ProtectedRoute({ role, children }) {
  const { user } = useContext(UserContext);
  const isAuth = () => {
    return user.permission.includes(role);
  };

  if (user && isAuth()) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/" />;
}

export default ProtectedRoute;
