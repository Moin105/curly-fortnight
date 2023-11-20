import React from "react";
import "./styles.css";
import logo from "../../Images/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { ReactComponent as SearchIcon } from "../../Svgs/search.svg";
import profile from "../../Images/profile.png";
import { Link } from "react-router-dom";
function SectionHeader({id}) {
  return (
    <>
      <div className="heading">

 {id ? <h2 style={{color:"white"}}> ef</h2>  :     <h2>Add New Facility</h2>}
      </div>
      <div className="section-header">
        <div className="header-container">
       <Link to='/sections'>   <figure className="logo">
            <img src={logo} alt="logo" />
          </figure></Link>
          {/* <div className="inner-header"> */}

          <div className="search-field">
            <input type="text" placeholder="Search" className="search-input" />
            <span className="search-icon">
              <SearchIcon />
            </span>
          </div>

          <div className="user-profile">
            <div className="profile">
              <img src={profile} alt="profile" />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default SectionHeader;
