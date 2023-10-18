import React,{useState,useEffect} from "react";
import "./styles.css";
import SideNav from "../Components/SideNav/SideNav";
import { ReactComponent as SearchIcon } from "../Svgs/search.svg";
import profile from "../Images/profile.png";
import { Link,useLocation } from "react-router-dom";
function Layout({ children }) {
  const [navs, setNav] = useState("1");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/" || location.pathname == "/sections") {
      setNav("1");
      console.log(location.pathname);
      console.log("hellooo");
    } else if (location.pathname == "/activitylog") {
      setNav("2");
      console.log(location.pathname);
    } else if (location.pathname == "/notifications") {
      setNav("3");
      console.log(location.pathname);
    } else if (location.pathname == "/resources") {
      setNav("4");
      console.log(location.pathname);
    }
  }, [navs, location]);
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
      {navs == "1"   &&   <Link to="/sections/add-section">
              <button>Add New</button>
            </Link>}
            <div className="profile">
              <img src={profile} alt="profile" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
