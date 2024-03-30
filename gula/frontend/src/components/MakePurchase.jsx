import React from "react";
import useMakePurchase from "../hooks/useMakePurchase";
import "./styles/MakePurchase.css";

function MakePurchase({ total }) {
  const { handleMakePurchase } = useMakePurchase();

  return (
    <div className="make-purchase__container">
      <div>
        <p>Total: </p>
        <p className="make-purchase__total-price">$ {total}</p>
      </div>
      <button onClick={handleMakePurchase}>Realizar compra</button>
    </div>
  );
}

export default MakePurchase;
