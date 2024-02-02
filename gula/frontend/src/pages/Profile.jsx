import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "./Profile.css";
import Publications from "../components/Publications";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

function Profile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { profilename } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      fetch(`http://localhost:3070/api/v1/auth/profile/${profilename}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
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
          setLoading(false);
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
      {/* <main className="profile__container">
        <h1>{user.username}</h1>
      </main> */}
      {/* <Publications /> */}
      <main className="profile__container">
        <section className="profile__header">
          <div className="header-logo">
            <div>
              <img src="../../assets/images/Logo-gula-bg.png" alt="gula-logo" />
            </div>
          </div>
          <div className="header-search">
            <div>
              <CiSearch />
              <input type="text" placeholder="Buscar perfil..." />
            </div>
          </div>
          <div className="header-menu">
            <button className="header-menu__btn">Cerrar sesion</button>
          </div>
        </section>
        <section className="profile__hero">
          <div>
            <img
              src="https://media.licdn.com/dms/image/D4D03AQEHZoegejyhmg/profile-displayphoto-shrink_800_800/0/1686770104506?e=2147483647&v=beta&t=oHg0YTsFAZ5eTha8xAveSHkEgLPNSPI_Yw4BlJxG_qs"
              alt="gula-profile-pic"
            />
          </div>
        </section>
        <section className="profile__presentation"></section>
        <section className="profile__main-content"></section>
      </main>
    </>
  );
}

export default Profile;
