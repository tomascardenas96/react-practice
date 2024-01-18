import React, { useState } from "react";
import "./styles/Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";

function Header() {
  const username = localStorage.getItem("username");
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="header__container">
      <header>
        <div className="header__container-menu">
          <RxHamburgerMenu className="hamburguer-menu" />
        </div>
        <div className="header__container-img">
          <img src="../../assets/images/Logo-gula-bg.png" alt="logo-gula" />
        </div>
        <div className="header__container-username" onClick={handleModal}>
          <p>
            <MdKeyboardArrowDown className="menu-arrow" /> {username}
          </p>
          <img
            src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg"
            alt="gula-profile-pic"
          />
        </div>
      </header>
      {modal && <DropdownMenu />}
    </div>
  );
}

export default Header;
