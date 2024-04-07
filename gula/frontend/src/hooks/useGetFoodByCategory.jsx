//Este hook trae todas las comidas que coinciden con el parametro de la URL.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useGetFoodByCategory() {
  const token = localStorage.getItem("token");
  const [food, setFood] = useState([]);
  const { category } = useParams("category");

  useEffect(() => {
    const getFoodByCategory = async () => {
      const response = await fetch(
        `http://localhost:3070/api/v1/food/filter/category/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const parsedResponse = await response.json();
      setFood(parsedResponse);
    };

    getFoodByCategory();
  }, [setFood]);

  return { food };
}

export default useGetFoodByCategory;
