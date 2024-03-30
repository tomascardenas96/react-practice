import React, { useState } from "react";

function useFilterFoodByCategory() {
  const token = localStorage.getItem("token");
  const [foodFilteredByCategory, setFoodFilteredByCategory] = useState([]);

  const handleSearchFoodByCategory = async (category) => {
    const response = await fetch(`http://localhost:3070/api/v1/food/filter/category/${category}`)
  }
}

export default useFilterFoodByCategory;
