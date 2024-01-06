import React from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";

function BackHeader({link}) {
  return (
    <div className="heading" style={{display:"flex",margin:"20px 0px 0px 20px"}}>
        <Link to={link}>
       <div style={{color:"#0b63f8",fontSize:"30px"}}> 
        <IoArrowBackCircle />
        </div>     
        </Link>
         </div>
  )
}

export default BackHeader