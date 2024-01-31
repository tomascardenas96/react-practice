import React from "react";
import "./styles/PublicationCard.css";

function PublicationCard({ publication, username }) {

  return (
    <>
      <section className="publication-card">
        <p>{username}</p>
        <h1>{publication}</h1>
      </section>
    </>
  );
}

export default PublicationCard;
