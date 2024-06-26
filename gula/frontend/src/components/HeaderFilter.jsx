import React from "react";
import "./styles/HeaderFilter.css";
import useFilter from "../hooks/useFilter";
import { BsCartPlus } from "react-icons/bs";
import useAddToCart from "../hooks/useAddToCart";

function HeaderFilter() {
  const {
    isEmptyField,
    filteredFood,
    filterError,
    filterLoading,
    getFilteredFood,
    filterInput,
    handleChange,
  } = useFilter();

  const { addToCart } = useAddToCart();

  return (
    <header className="header-filter__container">
      <div className="header-filter">
        <div>
          <h1>¿Que tenes ganas de comer?</h1>
          <form>
            <input
              type="text"
              placeholder="Hamburguesa, milanesa, empanada, pizza..."
              value={filterInput}
              onChange={handleChange}
            />
            {!isEmptyField && (
              <div className="header-filter__results">
                {!filterError ? (
                  filteredFood.map((food, idx) => (
                    <ul key={idx} className="header-filter__results-list">
                      <li className="results-img">
                        <img
                          className="img"
                          src={food.image}
                          alt="imagen-de-prueba"
                        />
                      </li>
                      <li className="results-description">
                        {food.description}
                      </li>
                      <li className="results-price">${food?.price}</li>
                      <li className="results-shop">{food.shop?.name}</li>
                      <li className="results-addtocart">
                        <BsCartPlus onClick={() => addToCart(food.foodId)} />
                      </li>
                    </ul>
                  ))
                ) : (
                  <div className="header-filter__no-results">
                    <p>Sin resultados</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </header>
  );
}

export default HeaderFilter;
