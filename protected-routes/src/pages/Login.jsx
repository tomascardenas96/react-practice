import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

function Login() {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to="/home" />;
  }
  return <div>login</div>;
}

export default Login;
