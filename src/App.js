import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resources from './Pages/Resources/Resources';
import Notifications from './Pages/Notifications/Notifications';
import ActivityLog from './Pages/ActivityLog/ActivityLog';
import Sections from './Pages/Sections/Sections';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path='/notifications' element={<Notifications/> }/>
          <Route path="/activitylog"   element={<ActivityLog/> }  />
          <Route path="/sections" element={<Sections/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
