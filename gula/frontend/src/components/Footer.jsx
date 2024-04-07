import React from "react";
import "./styles/Footer.css";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="footer__container">
        <div className="footer">
          <img
            src="../../assets/images/Logo-Gula-blanco.png"
            alt="logo-gula-white"
          />
          <div>
            <p>All rights reserved ©</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
