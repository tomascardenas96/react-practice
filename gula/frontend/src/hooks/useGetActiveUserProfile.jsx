import React, { useEffect, useState } from "react";

function useGetActiveUserProfile() {
  const token = localStorage.getItem("token");
  const [activeProfile, setActiveProfile] = useState({});
  const [activeProfileLoading, setActiveProfileLoading] = useState(false);

  useEffect(() => {
    const getActiveProfile = async () => {
      try {
        setActiveProfileLoading(true);
        const response = await fetch(
          "http://localhost:3070/api/v1/profile/active-profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const parsedResponse = await response.json();
        setActiveProfile(parsedResponse);
      } catch (err) {
      } finally {
        setActiveProfileLoading(false);
      }
    };

    getActiveProfile();
  }, [token]);

  return { activeProfile, activeProfileLoading };
}

export default useGetActiveUserProfile;
