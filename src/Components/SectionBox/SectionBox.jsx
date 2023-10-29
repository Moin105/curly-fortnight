import React, { useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {toast,ToastContainer} from "react-toastify";
function SectionBox({ title,id ,sectionsUpdate}) {
  const API_ENDPOINT = "http://23.22.32.42/api";
  const token = useSelector((state) => state.userAuth.token);

  const deleteSection = async (id) => {

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
  
  
  
  
  
  
  useEffect(() => {
   
  }, [])
  
  return (
    <>
      {/* <Link to={`/sections/${title}`}> */}
        <div className="section-box">
          <ToastContainer/>
          <div className="row">
          <div>
            </div>  
         <Link to={`/sections/add-section/${id}`} ><span>edit</span></Link>
         <span onClick={()=>{deleteSection(id)}}>delete</span>
          </div>
          <h2>{title}</h2>
        </div>
    </>
  );
}

export default SectionBox;
