import React, { useEffect, useState } from "react";
import "./styles/Cart.css";
import { BsCart4 } from "react-icons/bs";
import useGetFoodOnCart from "../hooks/useGetFoodOnCart";
import useCart from "../hooks/useCart";
import useModifyFoodAmount from "../hooks/useModifyFoodAmount";

function Cart() {
  const { foodOnCart, amount } = useGetFoodOnCart();
  const { handleOpenCloseCartModal, cartModal } = useCart();
  const { handleModifyAmount } = useModifyFoodAmount();

  return (
    <>
      <div className="cart-container" onClick={handleOpenCloseCartModal}>
        <div className="cart">
          <BsCart4 className="cart-icon" />
          <span>{amount}</span>
        </div>
      </div>
      {cartModal && (
        <div className="cart-modal">
          {foodOnCart.length ? (
            <ul>
              {foodOnCart.map((food) => (
                <div className="cart-modal__item" key={food.foodOnCartId}>
                  <li>{food.food.description}</li>
                  <li>${food.food.price}</li>
                  <li>
                    <div className="cart-modal__item-amount">
                      <p
                        onClick={() =>
                          handleModifyAmount(food.foodOnCartId, "substract")
                        }
                      >
                        -
                      </p>
                      {food.amount}
                      <p
                        onClick={() =>
                          handleModifyAmount(food.foodOnCartId, "add")
                        }
                      >
                        +
                      </p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No hay comida aun.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
