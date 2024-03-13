import React, { useEffect, useState } from "react";
import PublicationCard from "./PublicationCard";
import { useParams } from "react-router-dom";
import "./styles/Publications.css";

function Publications() {
  const [publications, setPublications] = useState([]);
  const { profilename } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:3070/api/v1/post/${profilename}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPublications(data);
      });
  }, []);

  return (
    <>
      <div className="publications__container">
        {publications.map((publication, idx) => (
          <PublicationCard
            key={idx}
            username={publication.name}
            publication={publication.description}
          />
        ))}
      </div>
    </>
  );
}

export default Publications;
