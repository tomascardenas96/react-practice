import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function useGetFoodOnCart() {
  const [foodOnCart, setFoodOnCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const socket = io("http://localhost:8005");

    socket.on("addFoodToCart", (newFoodOnCart) => {
      setFoodOnCart((prevFoodOnCart) => [...prevFoodOnCart, newFoodOnCart]);
    });

    return () => {
      socket.disconnect();
    };
  }, [token, setFoodOnCart]);

  useEffect(() => {
    getFoodOnCart();
  }, [token, foodOnCart]);

  useEffect(() => {
    getTotalAmount();
  }, [foodOnCart]);

  const getFoodOnCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:3070/api/v1/cart/cartbyuser",
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
        throw new Error();
      }
      setFoodOnCart(parsedResponse);
    } catch (err) {}
  };

  const getTotalAmount = () => {
    if (foodOnCart && foodOnCart.length > 0) {
      const totalAmount = foodOnCart.reduce((acc, food) => {
        return acc + food.amount;
      }, 0);
      setAmount(totalAmount);
    }
    if (!foodOnCart.length) {
      setAmount(0);
    }
  };

  useEffect(() => {
    const getTotalPrice = () => {
      const total = foodOnCart.reduce(
        (acc, order) => acc + order.food.price * order.amount,
        0
      );
      setTotalPrice(total);
    };

    getTotalPrice();
  }, [foodOnCart]);

  return { foodOnCart, amount, totalPrice };
}

export default useGetFoodOnCart;
