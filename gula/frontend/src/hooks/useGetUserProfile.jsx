import React, { useEffect, useState } from "react";
import useAccessProfile from "./useAccessProfile";

function useGetUserProfile() {
  const token = localStorage.getItem("token");
  const [profileOwner, setProfileOwner] = useState({});
  const { user } = useAccessProfile();

  useEffect(() => {
    const getProfileData = async () => {
      if (!user.email) {
        return;
      }
      const response = await fetch(
        `http://localhost:3070/api/v1/profile/user/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const parsedResponse = await response.json();
      setProfileOwner(parsedResponse);
    };

    getProfileData();
  }, [user]);

  return { profileOwner };
}

export default useGetUserProfile;
