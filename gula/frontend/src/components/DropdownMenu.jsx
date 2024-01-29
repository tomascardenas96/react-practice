import "./styles/DropdownMenu.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const [reload, setReload] = useState(0);
  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    location.reload();
  };

  return (
    <nav className="dropdown-menu__container">
      <ul>
        <Link to="/profile">
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
