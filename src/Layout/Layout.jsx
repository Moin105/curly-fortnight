import React,{useState,useEffect} from "react";
import "./styles.css";
import SideNav from "../Components/SideNav/SideNav";
import { ReactComponent as SearchIcon } from "../Svgs/search.svg";
import profile from "../Images/profile.png";
import { Link,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function Layout({ children, setSearchQuery }) {
  const [navs, setNav] = useState("1");
  const location = useLocation();
  const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); 
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
    }else if(location.pathname == "/applicants"){
      setNav("5");
    }else if(location.pathname == '/users'){
      setNav("7")
    }
    
    else if(location.pathname == "/notification/add-notification"){
      setNav("6");
    }
  }, [navs, location]);
  return (
    <div className="main-layout">
      <SideNav />
      <div className="main">
        <div className="inner-header">
          <div className="search-field">
          <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">
              <SearchIcon />
            </span>
          </div>

          <div className="user-profile">
      {navs == "1"  && role == "super_admin"  ?   <Link to="/sections/add-section">
              <button>Add New</button>
            </Link>:""}
            {navs == "3"   ?   <Link to="/notification/add-notification">
              <button>Create New</button>
            </Link>: ""}
            {navs == "7"  && role == "super_admin" ?   <Link to="/users/add-user">
              <button>Create User</button>
            </Link>: ""}
            <Link to="/profile">
            <div className="profile">
              <img src={profile} alt="profile" />
            </div>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
