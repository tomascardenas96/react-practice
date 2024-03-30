import React from "react";
import useUploadProfilePicture from "../hooks/useUploadProfilePicture";

function UploadProfilePicture() {
  const { handleFileChange, handleUpload } = useUploadProfilePicture();

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <input type="submit" value="Cargar" />
    </form>
  );
}

export default UploadProfilePicture;
