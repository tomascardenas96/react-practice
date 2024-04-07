import "./styles/DropdownMenu.css";
import { CiShop } from "react-icons/ci";
import Spinner from "./Spinner";

import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useShops from "../hooks/useShops";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useGetActiveUserProfile from "../hooks/useGetActiveUserProfile";

function DropdownMenu() {
  const { shops, error, loading } = useShops();
  const [isLoading, setIsLoading] = useState(false);
  const activeProfileName = localStorage.getItem("profilename");
  // const { profileOwner } = useGetUserProfile();
  const { activeProfile, activeProfileLoading } = useGetActiveUserProfile();

  const handleLogOut = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <nav className="dropdown-menu__container">
      <ul>
        {/* Ver como hacer en caso que activeProfile este en undefined */}
        {activeProfileLoading ? (
          <li>Perfil</li>
        ) : (
          <Link to={`/profile/${activeProfile.profileName}`}>
            <li>Perfil</li>
          </Link>
        )}
        <li>Cuenta</li>
        <li>Configuracion</li>
        <li onClick={handleLogOut}>Cerrar sesion</li>
        <li className="dropdown-menu__shops">
          <div>
            <CiShop />
          </div>
          Comercios
        </li>
        {shops.map((shop) => (
          <li className="shop-item" key={shop.shopId}>
            <span className="shop-item__icon">
              <img
                src="https://img.freepik.com/vector-gratis/deliciosa-comida-rapida-estilo-pop-art_24908-61615.jpg?size=338&ext=jpg&ga=GA1.1.117944100.1709856000&semt=ais"
                alt=""
              />
            </span>
            <Link to={`/commerce/${shop.profileName}`}>{shop.name}</Link>
          </li>
        ))}
        <li>Agregar comercio nuevo</li>
      </ul>
    </nav>
  );
}

export default DropdownMenu;
