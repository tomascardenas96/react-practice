import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
