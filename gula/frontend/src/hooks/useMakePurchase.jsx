import React from "react";
import useGetFoodOnCart from "./useGetFoodOnCart";

function useMakePurchase() {
  const token = localStorage.getItem("token");
  const { foodOnCart } = useGetFoodOnCart();

  const handleMakePurchase = async () => {
    const response = await fetch("http://localhost:3070/api/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const parsedData = await response.json();
    return parsedData;
  };



  return { handleMakePurchase };
}

export default useMakePurchase;
