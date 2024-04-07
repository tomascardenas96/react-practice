import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useAccessProfile() {
  const token = localStorage.getItem("token");
  const { profilename } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3070/api/v1/auth/profile/${profilename}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  return { user, error, loading };
}

export default useAccessProfile;
