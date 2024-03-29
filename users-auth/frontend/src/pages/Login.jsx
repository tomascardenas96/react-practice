import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3070/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          setLoading(true);
          return response.json();
        })
        .then((data) => {
          if (data.message !== "success") {
            setError(true);
          }
          setLoading(false);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("role", data.role);
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  if (loading) {
    <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (token !== null && token !== "undefined") {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <main className="login__container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <input type="submit" value="Enter" />
        </form>
      </main>
    </>
  );
}

export default Login;
