import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import useGetProfilePicture from "../hooks/useGetProfilePicture";
import "./Profile.css";
import UploadPhotoModal from "../components/UploadPhotoModal";
import useUploadProfilePicture from "../hooks/useUploadProfilePicture";

function Profile() {
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { profilename } = useParams();
  const { userImageURL } = useGetProfilePicture();
  const { handleModal, modalIsOpen } = useUploadProfilePicture();

  useEffect(() => {
    fetch(`http://localhost:3070/api/v1/auth/profile/${profilename}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
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

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
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
            <img src={userImageURL} alt="gula-profile-pic" />
            <div className="profile__hero-camera-icon" onClick={handleModal}>
              <FaCamera />
            </div>
          </div>
        </section>
        {modalIsOpen && <UploadPhotoModal handleClose={handleModal}/>}
        <section className="profile__presentation">
          <div className="profile__presentation-user-info">
            <h1>{user.username}</h1>
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
