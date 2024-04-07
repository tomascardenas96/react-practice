import React, { useState } from "react";

function useUploadProfilePicture() {
  const token = localStorage.getItem("token");
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:3070/api/v1/profile/upload-profile-picture",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const parsedResponse = await response.json();
      if (!parsedResponse.error) {
        location.reload();
      } else {
        alert("Failed to upload profile photo");
      }
    } catch (err) {
      console.error("Error uploading profile photo:", err);
    } finally {
      e.target.reset();
    }
  };

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return { handleFileChange, handleUpload, handleModal, modalIsOpen };
}

export default useUploadProfilePicture;
