import { useState } from "react";

function useFilterShops() {
  const token = localStorage.getItem("token");
  const [filteredShop, setFilteredShop] = useState([]);
  const [searchShopInput, setSearchShopInput] = useState("");

  const handleSubmit = async (value) => {
    const valueWithoutSpaces = value.split(" ").join("%20");
    const response = await fetch(
      `http://localhost:3070/api/v1/shops/filter/?search=${valueWithoutSpaces}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = await response.json();
    setFilteredShop(parsedResponse);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchShopInput(value);
    handleSubmit(value);
  };

  return { filteredShop, handleSubmit, handleChange, searchShopInput };
}

export default useFilterShops;
