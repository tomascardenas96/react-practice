import React from "react";
import "./styles/HeaderFilter.css";
import useFilter from "../hooks/useFilter";

function HeaderFilter() {
  const {
    filteredFood,
    filterError,
    filterLoading,
    getFilteredFood,
    filterInput,
    handleChange,
    isEmptyField,
  } = useFilter();

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
            {!isEmptyField && !filterError && (
              <div className="header-filter__results">
                <ul>
                  {filteredFood.map((food) => (
                    <p key={food.foodId}>{food.description}</p>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
    </header>
  );
}

export default HeaderFilter;
