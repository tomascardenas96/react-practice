import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "./Profile.css";
import Publications from "../components/Publications";
import { useParams } from "react-router-dom";

function Profile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { profilename } = useParams()

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      fetch(`http://localhost:3070/api/v1/auth/profile/${profilename}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unauthorizated");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data);
          setLoading(false)
        });
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
      <main className="profile__container">
        <h1>{user.username}</h1>
      </main>
      <Publications />
    </>
  );
}

export default Profile;
