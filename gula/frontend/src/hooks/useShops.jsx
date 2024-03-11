import { useEffect, useState } from "react";

function useShops() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getShops = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3070/api/v1/shops/user",
          {
            method: "GET",
            headers: {
              "Context-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        const parsedResponse = await response.json();
        if (parsedResponse.statusCode === 401) {
          throw new Error("Please login to have access");
        }
        setShops(parsedResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getShops();
  }, []);

  return { shops, error, loading };
}

export default useShops;
