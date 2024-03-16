import React, { useState } from "react";

function useCart() {
  const token = localStorage.getItem("token");
  //   const email = localStorage.getItem("email");
  //   const [newCart, setNewCart] = useState({
  //     user: email,
  //   });
  const [cartError, setCartError] = useState(null);

  const handleCart = async (email) => {
    try {
      const response = await fetch("http://localhost:3070/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: email,
        }),
      });
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      if (parsedResponse.error) {
        throw new Error(parsedResponse.message);
      }
    } catch (err) {
      setCartError(err);
    }
  };

  return { handleCart, cartError };
}

export default useCart;
