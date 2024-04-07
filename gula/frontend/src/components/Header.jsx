import React, { useState } from "react";
import "./styles/Header.css";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownMenu from "./DropdownMenu";
import useFilterShops from "../hooks/useFilterShops";
import useGetProfilePicture from "../hooks/useGetProfilePicture";

function Header() {
  const username = localStorage.getItem("username");
  const { filteredShop, handleSubmit, handleChange, searchShopInput } =
    useFilterShops();
  const [userModal, setUserModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const { userImageURL } = useGetProfilePicture();
  const handleModal = () => {
    setUserModal(!userModal);
  };

  const handleSearchModal = () => {
    setSearchModal(!searchModal);
  };

  return (
    <div className="header__container">
      <header>
        <div className="header__container-menu">
          <CiSearch className="hamburguer-menu" onClick={handleSearchModal} />
          {searchModal && (
            <form className="header__container__form-search">
              <label className="header__container__input-search">
                <input
                  type="text"
                  onChange={handleChange}
                  value={searchShopInput}
                />
              </label>
              <div className="header__container__results">
                <ul>
                  {filteredShop.map((shop) => (
                    <li key={shop.shopId}>{shop.name}</li>
                  ))}
                </ul>
              </div>
            </form>
          )}
        </div>
        <div className="header__container-img">
          <img src="../../assets/images/Logo-gula-bg.png" alt="logo-gula" />
        </div>
        <div className="header__container-username" onClick={handleModal}>
          <p>
            <MdKeyboardArrowDown className="menu-arrow" /> {username}
          </p>
          <img
            src={userImageURL}
            alt="gula-profile-pic"
          />
        </div>
      </header>
      {userModal && <DropdownMenu />}
    </div>
  );
}

export default Header;
