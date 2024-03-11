import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "./Home.css";
import Header from "../components/Header";
import HeaderFilter from "../components/HeaderFilter";
import Categories from "../components/Categories";
import FoodTrades from "../components/FoodTrades";
import Footer from "../components/Footer";
import NewPost from "../components/NewPost";
import HomePagePosts from "../components/HomePagePosts";
import useFilter from "../hooks/useFilter";

function Home() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { filteredFood, filterError, filterLoading } = useFilter();

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
        .then((data) => {
          setLoading(false);
          localStorage.setItem("username", data.username);
          localStorage.setItem("profilename", data.profilename);
          localStorage.setItem("permission", data.permission);
        });
    } catch (error) {
      setError(true);
    }
  }, []);

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return (
      <div className="home__loading">
        <Spinner />;
      </div>
    );
  }

  return (
    <>
      <main className="home__container">
        <Header />
        <HeaderFilter />
        <Categories />
        <FoodTrades />
        <HomePagePosts />
        <Footer />
      </main>
    </>
  );
}

export default Home;
