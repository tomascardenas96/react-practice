import { useEffect, useState } from "react";
import useShop from "./useShop";
import { io } from "socket.io-client";

function useFood() {
  const token = localStorage.getItem("token");
  const activeUserEmail = localStorage.getItem("email");
  const { shop } = useShop();
  const [isShopOwner, setIsShopOwner] = useState(false);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newFood, setNewFood] = useState({
    description: "",
    price: "",
    stock: "",
    category: "Carnes",
    shop: shop.name,
  });

  useEffect(() => {
    if (shop.profileName) {
      getFood();
      const socket = io("http://localhost:8001");

      socket.on("newFood", (food) => {
        setMenu((prevMenu) => [...prevMenu, food]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [shop.profileName, newFood]);

  const getFood = async () => {
    try {
      const response = await fetch(
        `http://localhost:3070/api/v1/food/shop/${shop.profileName}`,
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

  const handleChangeString = (e) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value, shop: shop.name });
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: Number(value), shop: shop.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setNewFood({
        description: "",
        price: "",
        stock: "",
        category: "Carnes",
        shop: shop.name,
      });
    }
  };

  useEffect(() => {
    const isActiveUserOwnerOfShop = () => {
      if (activeUserEmail === shop.user.email) {
        setIsShopOwner(true);
        return;
      }
      setIsShopOwner(false);
    };

    if (shop.user) {
      isActiveUserOwnerOfShop();
    }
  }, [shop.user]);

  return {
    menu,
    loading,
    error,
    handleChangeString,
    handleChangeNumber,
    handleSubmit,
    newFood,
    isShopOwner,
  };
}

export default useFood;
