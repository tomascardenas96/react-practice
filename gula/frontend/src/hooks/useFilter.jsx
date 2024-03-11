import React, { useEffect, useRef, useState } from "react";

function useFilter() {
  const token = localStorage.getItem("token");
  const [filteredFood, setFilteredFood] = useState([]);
  const [filterError, setFilterError] = useState(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  
  const getFilteredFood = async (filterInput) => {
    setFilterError(null);
    try {
      setFilterLoading(true);
      const response = await fetch(
        `http://localhost:3070/api/v1/food/filter/${filterInput}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const parsedResponse = await response.json();
      if (parsedResponse.error) {
        throw new Error("No results found");
      }
      setFilteredFood(parsedResponse);
    } catch (err) {
      setFilterError(err);
    } finally {
      setFilterLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setFilterInput(value);
    getFilteredFood(value);
  };

  const isEmptyField = filterInput === "";

  useEffect(() => {
    if (isEmptyField) {
      setFilteredFood([]);
    }
  }, []);

  return {
    filteredFood,
    filterError,
    filterLoading,
    getFilteredFood,
    filterInput,
    handleChange,
    isEmptyField,
  };
}

export default useFilter;
