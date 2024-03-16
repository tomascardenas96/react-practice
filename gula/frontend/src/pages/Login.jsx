import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import useCart from "../hooks/useCart";

function Login() {
  const token = localStorage.getItem("token");
  const { handleCart, cartError } = useCart();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          if (data.token === undefined) {
            setError(true);
            throw new Error();
          }
          setLoading(false);
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("email", data.email);
          handleCart(data.email);
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
        <div className="login-page">
          <div className="login-page__side-slogan">
            <h1>Bienvenido/a! a la primera App de pedidos de Benito Juarez</h1>
            <h2>Tenes hambre? Tenes</h2>
            <img
              src="../../assets/images/Logo-Gula-blanco.png"
              alt="gula-logo"
            />
          </div>
          <div className="login-page__divider-line" />
          <div className="login-page__login-form">
            <form onSubmit={handleSubmit}>
              <h1>Ingresar</h1>
              <label htmlFor="email">
                Email
                <input type="email" name="email" onChange={handleChange} />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </label>
              <div className="login-page__form-button">
                <input type="submit" value="Entrar" />
                <Link to="/register">
                  <p>¿Todavia no tenes cuenta? Registrate gratis</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
