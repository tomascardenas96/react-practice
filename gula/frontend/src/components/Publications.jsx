import React, { useEffect, useState } from "react";
import PublicationCard from "./PublicationCard";
import { useParams } from "react-router-dom";

function Publications() {
  const [publications, setPublications] = useState([]);
  const { profilename } = useParams();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:3070/api/v1/post/${profilename}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}` 
      }
    }
    )
      .then((response) => response.json())
      .then((data) => {
        setPublications(data);
      });
  }, []);


  return <>
    <div>
        {publications.map((publication, idx) => (
            <PublicationCard key={idx} username={username} publication={publication.description}/>
        ))}
    </div>
  </>;
}

export default Publications;
