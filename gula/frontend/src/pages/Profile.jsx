import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import "./Profile.css";
import Publications from "../components/Publications";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

function Profile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { profilename } = useParams();
  const refreshToken = localStorage.getItem("refreshToken");
  const token = localStorage.getItem("token");

  useEffect(() => {
    renewAccessToken();
    fetch(`http://localhost:3070/api/v1/auth/profile/${profilename}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        if (!refreshToken && !response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  const renewAccessToken = () => {
    fetch("http://localhost:3070/api/v1/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    renewAccessToken();
  }, [token, refreshToken]);

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
        <section className="profile__presentation">
          <div className="profile__presentation-user-info">
            <h1>Tomas Cardenas</h1>
            <p>Rotiseria "Tirale los bigotes a Juan"</p>
            <div>
              <p>
                <FaLocationDot /> Benito Juarez, Buenos Aires
              </p>
              <p>
                <FaFacebookF /> tomas_cardenas
              </p>
              <p>
                <AiFillInstagram /> tomicardenas96
              </p>
              <p>
                <FaTwitter /> tomi_cardenas
              </p>
            </div>
          </div>
        </section>
        <section className="profile__main-content"></section>
      </main>
    </>
  );
}

export default Profile;
