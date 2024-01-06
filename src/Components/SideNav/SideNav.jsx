import React, { useState, useEffect } from "react";
import "./styles.css";
import { ReactComponent as SectionIcon } from "../../Svgs/section.svg";
import { ReactComponent as ActivityLogIcon } from "../../Svgs/ActivityLog.svg";
import notification from "../../Images/Notification.png";
import user from "../../Images/User.png";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
function SideNav() {
  const [navs, setNav] = useState("1");
  const location = useLocation();
  const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); // Assuming the role is obtained from state

  useEffect(() => {
    switch (role) {
      case "super_admin":
        setNav(location.pathname);
        break;
      case "admin":
        setNav(location.pathname);
        break;
      case "user":
        setNav(location.pathname);
        break;
      default:
        setNav("1");
        break;
    }
  }, [role, location.pathname]);
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
    } else if (location.pathname == "/applicants") {
      setNav("5");
      console.log(location.pathname);
    } else if (location.pathname == "/users") {
      setNav("7");
      console.log(location.pathname);
    }else if(location.pathname == "/shifts"){
      setNav("8");
      console.log(location.pathname);
    }
  }, [navs, location]);

  return (
    <div className="sidenav">
      {role === "super_admin" && <h3>Super Admin</h3>}
      {role === "admin" && <h3>Admin</h3>}
      {role === "user" && <h3>User</h3>}

      {/* <ul className="sidebar-tags">
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
          {navs == 5 ? (
          <Link to="/applicants">
            <li className="active">
              <img src={user} /> Applicants
            </li>
          </Link>
        ) : (
          <Link to="/applicants">
            <li>
              <img src={user} /> Applicants
            </li>
          </Link>
        )}
           {navs == 7 ? (
          <Link to="/users">
            <li className="active">
              <img src={user} /> Users
            </li>
          </Link>
        ) : (
          <Link to="/users">
            <li>
              <img src={user} /> Users
            </li>
          </Link>
        )}
      </ul> */}
      <ul className="sidebar-tags">
        {role == "super_admin" && (
          <>
            <Link to="/sections">
              {navs == 1 ? (
                <li className="active">
                  <SectionIcon /> Facility
                </li>
              ) : (
                <li>
                  <SectionIcon /> Facility
                </li>
              )}
            </Link>
            <Link to="/shifts">
              {navs == 8 ? (
                <li className="active">
                  <SectionIcon /> Shifts
                </li>
              ) : (
                <li>
                  <SectionIcon /> Shifts
                </li>
              )}
            </Link>

            <Link to="/activitylog">
              {navs == 2 ? (
                <li className="active">
                  <ActivityLogIcon /> Activity Log
                </li>
              ) : (
                <li>
                  <ActivityLogIcon /> Activity Log
                </li>
              )}
            </Link>

            <Link to="/notifications">
              {navs == 3 ? (
                <li className="active">
                  <img src={notification} alt="Notifications" /> Notifications
                </li>
              ) : (
                <li>
                  <img src={notification} alt="Notifications" /> Notifications
                </li>
              )}
            </Link>

            <Link to="/resources">
              {navs == 4 ? (
                <li className="active">
                  <img src={user} alt="Resources" /> Resources
                </li>
              ) : (
                <li>
                  <img src={user} alt="Resources" /> Resources
                </li>
              )}
            </Link>

            <Link to="/applicants">
              {navs == 5 ? (
                <li className="active">
                  <img src={user} alt="Applicants" /> Applicants
                </li>
              ) : (
                <li>
                  <img src={user} alt="Applicants" /> Applicants
                </li>
              )}
            </Link>

            <Link to="/users">
              {navs == 7 ? (
                <li className="active">
                  <img src={user} alt="Users" /> Employees
                </li>
              ) : (
                <li>
                  <img src={user} alt="Users" /> Employees
                </li>
              )}
            </Link>

            {/* Other navigation links for Super Admin */}
          </>
        )}

        {role == "admin" && (
          <>
           <Link to="/sections">
  {navs == 1 ? (
    <li className="active">
      <SectionIcon /> Sections
    </li>
  ) : (
    <li>
      <SectionIcon /> Sections
    </li>
  )}
</Link>

<Link to="/activitylog">
  {navs == 2 ? (
    <li className="active">
      <ActivityLogIcon /> Activity Log
    </li>
  ) : (
    <li>
      <ActivityLogIcon /> Activity Log
    </li>
  )}
</Link>

<Link to="/notifications">
  {navs == 3 ? (
    <li className="active">
      <img src={notification} alt="Notifications" /> Notifications
    </li>
  ) : (
    <li>
      <img src={notification} alt="Notifications" /> Notifications
    </li>
  )}
</Link>

<Link to="/resources">
  {navs == 4 ? (
    <li className="active">
      <img src={user} alt="Resources" /> Resources
    </li>
  ) : (
    <li>
      <img src={user} alt="Resources" /> Resources
    </li>
  )}
</Link>

          </>
        )}

        {role == "user" && (
          <>
           <Link to="/sections">
  {navs == 1 ? (
    <li className="active">
      <SectionIcon /> Sections
    </li>
  ) : (
    <li>
      <SectionIcon /> Sections
    </li>
  )}
</Link>

<Link to="/user-activitylog">
  {navs == 2 ? (
    <li className="active">
      <ActivityLogIcon /> Activity Log
    </li>
  ) : (
    <li>
      <ActivityLogIcon /> Activity Log
    </li>
  )}
</Link>

<Link to="/notifications">
  {navs == 3 ? (
    <li className="active">
      <img src={notification} alt="Notifications" /> Notifications
    </li>
  ) : (
    <li>
      <img src={notification} alt="Notifications" /> Notifications
    </li>
  )}
</Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideNav;
