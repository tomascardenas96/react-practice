import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles/HomePagePosts.css";
import PublicationCard from "./PublicationCard";
import NewPost from "./NewPost";

const HomePagePosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
    const socket = io("http://localhost:8001"); // Reemplaza 'http://localhost:8001' con la URL de tu servidor WebSocket

    socket.on("nuevaPublicacion", (nuevaPublicacion) => {
      setPosts((prevPosts) => [...prevPosts, nuevaPublicacion]);
    });

    console.log("render")
    return () => {
      socket.disconnect();
    };

  }, [setPosts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3070/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener publicaciones");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <section className="home-page-posts__container">
      <div className="home-page-posts__header">
        <h1>Publicaciones</h1>
      </div>
      <NewPost />
      <div className="home-page-posts__publications-container">
        {posts
          .slice()
          .reverse()
          .map((post, idx) => (
            <PublicationCard
              key={idx}
              username={post.name}
              publication={post.description}
            />
          ))}
      </div>
    </section>
  </>
  );
};

export default HomePagePosts;
