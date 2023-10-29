import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from "react-router-dom";
import Resources from './Pages/Resources/Resources';
import Notifications from './Pages/Notifications/Notifications';
import ActivityLog from './Pages/ActivityLog/ActivityLog';
import Sections from './Pages/Sections/Sections';
import AddSection from './Pages/AddSection/AddSection';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddNotification from './Pages/AddNotification/AddNotification';
import Application from './Pages/Application/Application';
import Applicants from './Pages/Applicants/Applicants';
import ApplicantDetails from './Pages/ApplicantDetails/ApplicantDetails';
function App() {
  const token = useSelector((state) => state.userAuth.token);

  useEffect(() => {
   console.log("token",token)
  }, [])
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/application' element={<Application/>}/>
          <Route path="/applicants" element={<Applicants/>}/>
          <Route path="/applicant-detail/:id" element={<ApplicantDetails/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/notification/add-notification" element={<AddNotification/>}/>
          <Route path='/notifications' element={<Notifications/> }/>
          <Route path="/activitylog"   element={<ActivityLog/> }  />
          <Route path="/sections" element={<Sections/>}/>
          <Route path="/sections/add-section" element={<AddSection/>}/>
          <Route path="/sections/add-section/:id" element={<AddSection/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
