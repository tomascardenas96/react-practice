import "./styles/DropdownMenu.css";

import React, { useState } from "react";

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
        <li>Configuracion</li>
        <li>Cuenta</li>
        <li>Contactanos</li>
        <li onClick={handleLogOut}>Cerrar sesion</li>
      </ul>
    </nav>
  );
}

export default DropdownMenu;
