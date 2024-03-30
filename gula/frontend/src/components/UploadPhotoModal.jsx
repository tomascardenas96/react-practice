import React from "react";
import { IoMdClose } from "react-icons/io";
import UploadProfilePicture from "./UploadProfilePicture";
import "./styles/UploadPhotoModal.css";
import useUploadProfilePicture from "../hooks/useUploadProfilePicture";

function UploadPhotoModal({handleClose}) {
  return (
    <>
      <div className="upload-photo__modal-container">
        <div className="upload-photo__modal">
          <IoMdClose
            className="upload-photo__modal-close"
            onClick={handleClose}
          />
          <UploadProfilePicture />
        </div>
      </div>
    </>
  );
}

export default UploadPhotoModal;
