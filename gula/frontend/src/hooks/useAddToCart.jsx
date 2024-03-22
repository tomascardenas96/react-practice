import { useState } from "react";

function useAddToCart() {
  const token = localStorage.getItem("token");
  const [errorAddToCart, setErrorAddToCart] = useState(null);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const addToCart = async (food) => {
    try {
      setLoadingAddToCart(true);
      const response = await fetch(
        "http://localhost:3070/api/v1/cart/addtocart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ food }),
        }
      );
      const parsedResponse = await response.json();
      if (parsedResponse.error) {
        throw new Error("Error adding to cart, please try again");
      }
    } catch (err) {
      setErrorAddToCart(true);
    } finally {
      setLoadingAddToCart(false);
    }
  };

  return { addToCart, errorAddToCart, loadingAddToCart };
}

export default useAddToCart;
