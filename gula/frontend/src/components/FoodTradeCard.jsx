import React from 'react';
import "./styles/FoodTradeCard.css";

function FoodTradeCard({image, title}) {
  return (
    <>
        <div className="food-trade-card">
            <img src={image} alt="" />
            <p>{title}</p>
        </div>
    </>
  )
}

export default FoodTradeCard