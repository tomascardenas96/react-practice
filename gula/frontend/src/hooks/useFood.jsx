import { useEffect, useState } from "react";
import useShop from "./useShop";

function useFood(activeShop) {
  const token = localStorage.getItem("token");
  const { shop } = useShop();
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFood = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3070/api/v1/food/shop/${activeShop}`,
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

    if (activeShop !== undefined) {
      getFood();
    }
  }, [shop, token]);

  return { menu, loading, error };
}

export default useFood;
