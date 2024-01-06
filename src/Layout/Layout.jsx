import React,{useState,useEffect} from "react";
import "./styles.css";
import SideNav from "../Components/SideNav/SideNav";
import { ReactComponent as SearchIcon } from "../Svgs/search.svg";
import profile from "../Images/profile.png";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../Pages/Users/UserModal";
import { Link,useLocation } from "react-router-dom";
// import { toast,ToastContainer } from "react-toastify/dist/components";
import { useSelector } from "react-redux";
import axios from "axios";
function Layout({ children, setSearchQuery, facility }) {

  const [navs, setNav] = useState("1");
  const [sectionName, setSectionName] = useState("");

  const [shows,setShows]=useState(false);
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  const navigate = useNavigate();
  const token = useSelector((state) => state.userAuth.token);

  const createSection = async () => {
    if (sectionName === "") {
      return toast.error("Please enter a section name");
    } else {
      // if (id) {
      //   console.log("update section", sectionName);
      //   const response = await axios.post(
      //     `${API_ENDPOINT}/sections/${id}`,
      //     { name: sectionName, _method: "PUT" },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      //   const data = response.data;
      //   console.log(data);
      //   if (data.status == 200) {
      //     toast.success("Section Created Successfully");
      //     navigate("/sections");
      //   } else {
      //     toast.error("Error Updating Section");
      //   }
      // } else {
        const response = await axios.post(
          `${API_ENDPOINT}/sections`,
          { name: sectionName },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (data.status > 200) {
          toast.success("Section Created Successfully");
          facility()
          navigate("/sections");
          setShows(false)
        } else {
          toast.error("Error Creating Section");
        }
      // }
    }
  };

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
    else if (location.pathname == "/shifts") {
      setNav("8");
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
      {navs == "1"  && role == "super_admin"  ?  
              <button onClick={()=>{setShows(true)}}>Add New Facility</button>
            :""}
            {navs == "3"   ?   <Link to="/notification/add-notification">
              <button>Create New</button>
            </Link>: ""}
            {navs == "7"  && role == "super_admin" ?   <Link to="/users/add-user">
              <button>Create User</button>
            </Link>: ""}
            {navs == "8"  && role == "super_admin" ?   <Link to="/shifts/add-shift">
              <button>Create Shift</button>
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
      <Modal isOpen={shows} onClose={()=>{setShows(false)}} >
       <h2>Edit Facility?</h2> 
       <div className="input-container">
          <input
            type="text"
            style={{padding:'10px',marginTop:'10px'}}
            onChange={(e) => {
              setSectionName(e.target.value);
            }}
            placeholder="Enter the name of Section"
            className="section-name-input"
          />
          </div>
        <div className="row">
         
          <button className="close" onClick={(e)=>{console.log('ho'); setShows(false)}}>
            No
          </button>
          <button
            className="send"
            onClick={(e)=>{e.preventDefault();createSection()}} >
            Yes
          </button>
          </div>
       </Modal>
    </div>
  );
}

export default Layout;
