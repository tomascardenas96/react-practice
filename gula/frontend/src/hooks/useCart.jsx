import React, { useEffect, useState } from "react";

function useCart() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [cartError, setCartError] = useState(null);
  const [cartModal, setCartModal] = useState(false);

  useEffect(() => {
    const handleCart = async () => {
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
        if (parsedResponse.error) {
          throw new Error(parsedResponse.message);
        }
      } catch (err) {
        setCartError(err);
      }
    };

    handleCart();
  }, [token, email]);

  const handleOpenCloseCartModal = () => {
    setCartModal(!cartModal);
  };

  return { cartError, handleOpenCloseCartModal, cartModal };
}

export default useCart;
