import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "./Home.css";
import Header from "../components/Header";
import HeaderFilter from "../components/HeaderFilter";
import Categories from "../components/Categories";

function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


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
        <Header />
        <HeaderFilter />
        <Categories />
      </main>
    </>
  );
}

export default Home;
