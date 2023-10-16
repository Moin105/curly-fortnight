import React from "react";
import "./styles.css";
import logo from "../../Images/logo.png";
import {IoSearchOutline} from 'react-icons/io5'
function Header() {
  return (
    <>
      <div className="header">
        <div className="header-container">
        <figure className="logo">
          <img src={logo} alt="logo" />
        </figure>

        <div className="tags-container">
          <ul className="nav-tags">
            <li>Home</li>
            <li>About Us</li>
            <li>Career</li>
            <li>Contact Us</li>
            <li>DMS</li>
          </ul>
         <span>|</span> 
          <span className="search">
              <IoSearchOutline/>
          </span>
        </div>
        </div>
      </div>
    </>
  );
}

export default Header;
