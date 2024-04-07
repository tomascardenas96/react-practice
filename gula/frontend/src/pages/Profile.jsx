import React from "react";
import Spinner from "../components/Spinner";
import { CiSearch } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import UploadPhotoModal from "../components/UploadPhotoModal";
import useUploadProfilePicture from "../hooks/useUploadProfilePicture";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useAccessProfile from "../hooks/useAccessProfile";
import "./Profile.css";

function Profile() {
  const { user, error, loading } = useAccessProfile();
  const { profileOwner } = useGetUserProfile();
  const { handleModal, modalIsOpen } = useUploadProfilePicture();

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
            <img
              src={`http://localhost:3070/uploads/${profileOwner.profilepicture}`}
              alt="gula-profile-pic"
            />
            <div className="profile__hero-camera-icon" onClick={handleModal}>
              <FaCamera />
            </div>
          </div>
        </section>
        {modalIsOpen && <UploadPhotoModal handleClose={handleModal} />}
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
