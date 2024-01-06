import React, { useEffect,useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../Pages/Shifts/Modal";
function SectionBox({ title,id ,sectionsUpdate}) {
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  const token = useSelector((state) => state.userAuth.token);
  const [show,setShow]=useState(false);
  const navigate = useNavigate();
  const [sectionName, setSectionName] = useState("");

  const createSection = async () => {
    if (sectionName == "") {
      return toast.error("Please enter a section name");
    } else {
  
        console.log("update section", sectionName);
        const response = await axios.post(
          `${API_ENDPOINT}/sections/${id}`,
          { name: sectionName, _method: "PUT" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (data.status == 200) {
          toast.success("Section Created Successfully");
          sectionsUpdate()
          setShows(false)
          setSectionName('')
        } else {
          toast.error("Error Updating Section");
        }
      
    }
  };
  const [shows,setShows]=useState(false);
  const deleteSection = async (e,id) => {
  e.stopPropagation()
    const response = await axios.delete(`${API_ENDPOINT}/sections/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    if(data.status==200){
      toast.success("Section Deleted Successfully");
      sectionsUpdate();}
      else{
        toast.error("Error Deleting Section");
      }
    console.log(data);
  };
  
  return (
    <>
      {/* <Link to={`/sections/${title}`}> */}
        <div className="section-box">
          <ToastContainer/>
          <div className="row">
          <div>
            </div>  
        {/* <span>edit</span> */}
         {/* <span onClick={(e)=>{e.preventDefault();deleteSection(e,id)}}>delete</span> */}
         <span className="edit" onClick={(e)=>{e.preventDefault();e.stopPropagation();setShows(true);}}>Edit Name</span>
         <span className="delete" onClick={(e)=>{e.preventDefault();e.stopPropagation();setShow(true);}}>Delete</span>
          </div>
          <Link to={`/sections/add-section/${id}`}>
          <h2>{title}</h2>
          </Link>
        </div>
       { <>
       <Modal isOpen={show} onClose={()=>{setShow(false)}} >
       <h2>Delete Facility?</h2>
        <div className="row">
          <button className="close" onClose={(e)=>{e.preventDefault();e.stopPropagation();setShow(false)}}>
            No
          </button>
          <button
            className="send"
            onClick={(e)=>{e.preventDefault();deleteSection(e,id)}} >
            Yes
          </button>
          </div>
       </Modal>
        </>}
        { <>
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
            onClick={(e)=>{e.preventDefault();createSection(id)}} >
            Yes
          </button>
          </div>
       </Modal>
        </>}
    </>
  );
}

export default SectionBox;
