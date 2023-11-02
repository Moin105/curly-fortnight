import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Resources from "./Pages/Resources/Resources";
import Notifications from "./Pages/Notifications/Notifications";
import ActivityLog from "./Pages/ActivityLog/ActivityLog";
import Sections from "./Pages/Sections/Sections";
import AddSection from "./Pages/AddSection/AddSection";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddNotification from "./Pages/AddNotification/AddNotification";
import Application from "./Pages/Application/Application";
import Applicants from "./Pages/Applicants/Applicants";
import ApplicantDetails from "./Pages/ApplicantDetails/ApplicantDetails";
import Users from "./Pages/Users/Users";
import ActivityLogDetail from "./Pages/ActivityLog/ActivityLogDetail";
import CreateUser from "./Pages/CreateUser/CreateUser";
import NotificationDetail from "./Pages/Notifications/NotificationDetail";
import Profile from "./Pages/Profile/Profile";
function App() {
  const token = useSelector((state) => state.userAuth.token);

  useEffect(() => {
    console.log("token", token);
  }, []);
  const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); // Assuming the role is obtained from state
  useEffect(() => {
    console.log("tole", role);
  }, [role]);
  const userRoutes = {
    superAdmin: [
      // <Route path="/" element={<Login/>}/>,
      // <Route path="/signup" element={<Signup/>}/>,
      <Route path="/profile" element={<Profile />} />,
      <Route path="/applicants" element={<Applicants />} />,
      <Route path="/applicant-detail/:id" element={<ApplicantDetails />} />,
      <Route path="/resources" element={<Resources />} />,
      <Route
        path="/notification/add-notification"
        element={<AddNotification />}
      />,
      <Route path="/notifications/:id" element={<NotificationDetail />} />,
      <Route path="/notifications" element={<Notifications />} />,
      <Route path="/activitylog" element={<ActivityLog />} />,
      <Route path="/sections" element={<Sections />} />,
      <Route path="/sections/add-section" element={<AddSection />} />,
      <Route path="/sections/add-section/:id" element={<AddSection />} />,
      <Route path="/activitylog/:id" element={<ActivityLogDetail />} />,
      <Route path="/users" element={<Users />} />,
      <Route path="/users/add-user" element={<CreateUser />} />,
    ],
    admin: [
      <Route path="/profile" element={<Profile />} />,
      <Route path="/resources" element={<Resources />} />,
      <Route
        path="/notification/add-notification"
        element={<AddNotification />}
      />,
      <Route path="/notifications/:id" element={<NotificationDetail />} />,
      <Route path="/notifications" element={<Notifications />} />,
      <Route path="/activitylog" element={<ActivityLog />} />,
      <Route path="/sections" element={<Sections />} />,
      <Route path="/sections/add-section/:id" element={<AddSection />} />,
      <Route path="/activitylog/:id" element={<ActivityLogDetail />} />,
    ],
    user: [
      <Route path="/sections" element={<Sections />} />,
      <Route path="/sections/add-section/:id" element={<AddSection />} />,
      <Route
        key="notifications"
        path="/notifications"
        element={<Notifications />}
      />,
      <Route path="/notifications/:id" element={<NotificationDetail />} />,
      // ... Other user routes
    ],
  };

  const renderRoutes = () => {
    switch (role) {
      case "super_admin":
        return userRoutes.superAdmin;
      case "admin":
        return userRoutes.admin;
      case "user":
        return userRoutes.user;
      default:
        // If there's no role, display the default login and sign-up pages
        return [
          <Route key="login" path="/" element={<Login />} />,
          <Route key="signup" path="/signup" element={<Signup />} />,
          <Route path="/application" element={<Application />} />,
        ];
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {renderRoutes()}
          {/* <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path='/application' element={<Application/>}/>
          <Route path="/applicants" element={<Applicants/>}/>
          <Route path="/applicant-detail/:id" element={<ApplicantDetails/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/notification/add-notification" element={<AddNotification/>}/>
          <Route path="/notifications/:id" element={<NotificationDetail/>}/>
          <Route path='/notifications' element={<Notifications/> }/>
          <Route path="/activitylog"   element={<ActivityLog/> }  />
          <Route path="/sections" element={<Sections/>}/>
          <Route path="/sections/add-section" element={<AddSection/>}/>
          <Route path="/sections/add-section/:id" element={<AddSection/>}/>
          <Route path="/activitylog/:id" element={<ActivityLogDetail/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path='/users/add-user' element={<CreateUser/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
