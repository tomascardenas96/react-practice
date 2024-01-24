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
            <div className="social-network">
              <FaTwitter className="footer__social-network" />
              <AiFillInstagram className="footer__social-network" />
              <FaFacebook className="footer__social-network" />
            </div>
            <p>All rights reserved ©</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
