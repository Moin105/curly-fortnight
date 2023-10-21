import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionHeader from "../../Components/Header/SectionHeader";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddSection() {
  const token = useSelector((state) => state.userAuth.token);
  const [sectionName, setSectionName] = useState("");
  const navigate = useNavigate();
  const API_ENDPOINT = "http://23.22.32.42/api";
  const createSection = async () => {
    if (sectionName === "") {
      return toast.error("Please enter a section name");
    } else {
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
        navigate("/sections");
      } else {
        toast.error("Error Creating Section");
      }
    }
  };



  
  return (
    <div className="add-section-container">
      <SectionHeader />
      <ToastContainer />
      <div className="input-container">
        <input
          type="text"
          onChange={(e)=>{setSectionName(e.target.value)}}
          placeholder="Enter the name of Section"
          className="section-name-input"
        />
        <button className="add-section-btn" onClick={()=>{createSection()}}>Save</button>
      </div>
      <table class="blueTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shift</th>
            <th>Needs</th>
            <th className="long">Name of Staff</th>
            <th>Hrs</th>
            <th>Comments</th>
            <th className="short"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cell1_1</td>
            <td>
              <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
              <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
              <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
              <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
              <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
              <td></td>
              <td></td>
              <td></td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddSection;
