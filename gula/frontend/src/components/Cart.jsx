import React, { useEffect, useState } from "react";
import "./styles/Cart.css";
import { BsCart4 } from "react-icons/bs";
import useGetFoodOnCart from "../hooks/useGetFoodOnCart";
import useCart from "../hooks/useCart";
import useModifyFoodAmount from "../hooks/useModifyFoodAmount";
import { IoMdClose } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import useDeleteFoodOfCart from "../hooks/useDeleteFoodOfCart";
import MakePurchase from "./MakePurchase";

function Cart() {
  const { foodOnCart, amount, totalPrice } = useGetFoodOnCart();
  const { handleOpenCloseCartModal, cartModal } = useCart();
  const { handleModifyAmount } = useModifyFoodAmount();
  const { deleteFromCart } = useDeleteFoodOfCart();

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
                  <li className="cart-modal__item__total-price">
                    ${food.food.price * food.amount}
                  </li>
                  <li>
                    <div className="cart-modal__item-amount">
                      <p
                        onClick={() =>
                          handleModifyAmount(food.foodOnCartId, "substract")
                        }
                      >
                        <CiCircleMinus />
                      </p>
                      {food.amount}
                      <p
                        onClick={() =>
                          handleModifyAmount(food.foodOnCartId, "add")
                        }
                      >
                        <CiCirclePlus />
                      </p>
                    </div>
                  </li>
                  <li
                    className="cart-modal__item-delete"
                    onClick={() => deleteFromCart(food.foodOnCartId)}
                  >
                    <IoMdClose className="cart-modal__item-delete-icon" />
                  </li>
                </div>
              ))}
              <MakePurchase total={totalPrice} />
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
