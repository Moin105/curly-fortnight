import React from "react";
import "./styles.css";
import SideNav from "../Components/SideNav/SideNav";
import {ReactComponent as SearchIcon} from '../Svgs/search.svg'
import profile from '../Images/profile.png' 
function Layout({ children }) {
  return (
    <div className="main-layout">
      <SideNav />
      <div className="main">
        <div className="inner-header">
           <div className="search-field">
            <input type="text" placeholder="Search" className="search-input" />
            <span className="search-icon">
              <SearchIcon />
            </span>
           </div>

           <div className="user-profile">
                <button>
                  Add New
                </button>
                <div className="profile">
                         <img  src={profile} alt="profile"/>
                </div>
           </div>
        </div>
        {children}</div>
    </div>
  );
}

export default Layout;
