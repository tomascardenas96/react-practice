import React, { useContext, useEffect, useState } from "react";
// import { userContext } from "../provider/UserProvider";

function Profile() {
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      fetch("http://localhost:3070/api/v1/auth/profile", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorizated");
        }
        return response.json();
      });
    } catch (error) {
      setError(true);
    }
  }, []);

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <h1>{username}</h1>
    </>
  );
}

export default Profile;
