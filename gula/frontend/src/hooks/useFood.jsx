import { useEffect, useState } from "react";
import useShop from "./useShop";

function useFood(activeShop) {
  const token = localStorage.getItem("token");
  const { shop } = useShop();
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newFood, setNewFood] = useState({
    description: "",
    price: undefined,
    stock: undefined,
    category: "",
    shop: activeShop.name,
  });

  useEffect(() => {
    setLoading(true);
    const getFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:3070/api/v1/food/shop/${activeShop.profileName}`,
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
          throw new Error("This commerce doesn't have menu yet");
        }
        setMenu(parsedResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (activeShop.profileName !== undefined && activeShop.name !== undefined) {
      getFood();
    }
  }, [shop, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3070/api/v1/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFood),
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return { menu, loading, error, handleChange, handleSubmit, newFood };
}

export default useFood;
