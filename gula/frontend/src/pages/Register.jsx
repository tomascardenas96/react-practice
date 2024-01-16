import React from "react";
import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3070/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then((response) => {
        setLoading(true);
        return response.json;
      });
    } catch (error) {}
  };

  return (
    <>
      <main className="register-page_container">
        <form onSubmit={handleSubmit} className="register-page__form">
          <h1>- Registro - </h1>
          <label htmlFor="username">
            Nombre de usuario
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input type="email" name="email" onChange={handleChange} required />
          </label>
          <label htmlFor="password">
            Contraseña
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="">
            Fecha de nacimiento
            <input type="date" />
          </label>
          <label htmlFor="">
            Sexo
            <select name="" id="">
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
          </label>
          <div className="register-form__button">
            <input type="submit" value="Registrarse" />
            <Link to="/">
              <p>Inicia sesion con tu cuenta</p>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Register;
