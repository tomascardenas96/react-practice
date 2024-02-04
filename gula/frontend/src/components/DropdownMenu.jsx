import "./styles/DropdownMenu.css";

import React from "react";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const activeProfileName = localStorage.getItem('profilename');

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
      </ul>
    </nav>
  );
}

export default DropdownMenu;
