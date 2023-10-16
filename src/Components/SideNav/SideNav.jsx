import React, { useState, useEffect } from "react";
import "./styles.css";
import { ReactComponent as SectionIcon } from "../../Svgs/section.svg";
import { ReactComponent as ActivityLogIcon } from "../../Svgs/ActivityLog.svg";
import notification from "../../Images/Notification.png";
import user from "../../Images/User.png";
import { Link, useLocation } from "react-router-dom";
function SideNav() {
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
    <div className="sidenav">
      <h3>Super Admin</h3>

      <ul className="sidebar-tags">
        {navs == 1 ? (
          <Link to="/sections">
            <li className="active">
              <SectionIcon /> Sections
            </li>
          </Link>
        ) : (
          <Link to="/sections">
            <li>
              <SectionIcon /> Sections
            </li>
          </Link>
        )}
        {navs == 2 ? (
          <Link to="/activitylog">
            <li className="active">
              <ActivityLogIcon /> Activity Log
            </li>
          </Link>
        ) : (
          <Link to="/activitylog">
            <li>
              <ActivityLogIcon /> Activity Log
            </li>
          </Link>
        )}
        {navs == 3 ? (
          <Link to="/notifications">
            <li className="active">
              <img src={notification} /> Notifications
            </li>
          </Link>
        ) : (
          <Link to="/notifications">
            <li>
              <img src={notification} /> Notifications
            </li>
          </Link>
        )}
        {navs == 4 ? (
          <Link to="/resources">
            <li className="active">
              <img src={user} /> Resources
            </li>
          </Link>
        ) : (
          <Link to="/resources">
            <li>
              <img src={user} /> Resources
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default SideNav;
