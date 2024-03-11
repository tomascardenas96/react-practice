import "./styles/DropdownMenu.css";
import { CiShop } from "react-icons/ci";

import React from "react";
import { Link } from "react-router-dom";
import useShops from "../hooks/useShops";

function DropdownMenu() {
  const { shops, error, loading } = useShops();
  const activeProfileName = localStorage.getItem("profilename");

  const handleLogOut = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <nav className="dropdown-menu__container">
      <ul>
        <Link to={`/profile/${activeProfileName}`}>
          <li>Perfil</li>
        </Link>
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
            <span className="shop-item__icon"></span>
            <Link to={`/commerce/${shop.profileName}`}>{shop.name}</Link>
          </li>
        ))}
        <li>Agregar comercio nuevo</li>
      </ul>
    </nav>
  );
}

export default DropdownMenu;
