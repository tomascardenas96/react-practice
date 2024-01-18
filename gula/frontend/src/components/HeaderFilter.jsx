import React from "react";
import "./styles/HeaderFilter.css";

function HeaderFilter() {
  return (
    <header className="header-filter__container">
      <div className="header-filter">
        <div>
          <h1>¿Que tenes ganas de comer?</h1>
          <input type="text" placeholder="Hamburguesa, milanesa, empanada, pizza..."/>
        </div>
      </div>
    </header>
  );
}

export default HeaderFilter;
