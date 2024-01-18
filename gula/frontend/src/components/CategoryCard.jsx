import "./styles/CategoryCard.css";

import React from "react";

function CategoryCard({ categoryName, icon }) {
  return (
    <div className="category-card__container">
      <div>
        <p>{icon}</p>
      </div>
      <p className="category-card__name">{categoryName}</p>
    </div>
  );
}

export default CategoryCard;
