import React, { useEffect, useState } from "react";
import NewPost from "./NewPost";
import "./styles/HomePagePosts.css";
import PublicationCard from "./PublicationCard";

function HomePagePosts() {
  const [publications, setPublications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:3070/api/v1/post", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPublications(data);
      });
  }, []);

  return (
    <>
      <section className="home-page-posts__container">
        <div className="home-page-posts__header">
          <h1>Publicaciones</h1>
        </div>
        <NewPost />
        <div className="home-page-posts__publications-container">
          {publications
            .slice()
            .reverse()
            .map((publication, idx) => (
              <PublicationCard
                key={idx}
                username={publication.name}
                publication={publication.description}
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default HomePagePosts;
