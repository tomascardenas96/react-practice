import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "./Home.css";

function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      fetch("http://localhost:3070/api/v1/auth/home", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            setError(true);
            throw new Error("Unauthorizated");
          }
          return response.json();
        })
        .then((data) => setLoading(false));
    } catch (error) {
      setError(true);
    }
  }, []);

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className="home__container">
        <h1>Home</h1>
      </main>
    </>
  );
}

export default Home;
