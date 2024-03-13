import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useShop() {
  const [shop, setShop] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  let { commerce } = useParams();

  useEffect(() => {
    setLoading(true);
    const getShop = async () => {
      try {
        const response = await fetch(
          `http://localhost:3070/api/v1/auth/commerce/${commerce}`,
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
          throw new Error("Shop profile not found");
        }
        setShop(parsedResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getShop();
  }, [commerce, token]);



  return { shop, error, loading };
}

export default useShop;
