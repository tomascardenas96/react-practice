//Este componente va a hacer la peticion al servidor para traer todos los datos del usuario activo (solo nos va a interesar la columna profilePicture del usuario que es donde estara el nombre de la foto), y luego va a almacenar la URL exacta de esa foto en la variable de estado 'userImageURL'.

import React, { useEffect, useState } from "react";

function useGetProfilePicture() {
  const token = localStorage.getItem("token");
  const [userImageName, setUserImageName] = useState("");
  const [userImageURL, setUserImageURL] = useState("");

  useEffect(() => {
    const useGetProfilePicture = async () => {
      try {
        const response = await fetch("http://localhost:3070/api/v1/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const parsedResponse = await response.json();
        if (parsedResponse.error) {
          throw new Error(parsedResponse.error);
        }
        setUserImageName(parsedResponse.profilePhoto);
      } catch (err) {
        console.error(err);
      }
    };

    useGetProfilePicture();
  }, [token]);

  useEffect(() => {
    const imageUrl = `http://localhost:3070/uploads/${userImageName}`;
    setUserImageURL(imageUrl);
  }, [userImageName]);

  return { userImageURL };
}

export default useGetProfilePicture;
