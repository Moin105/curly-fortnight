import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";
import Modal from "./Modal";
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsCheckCircleFill} from 'react-icons/bs'
import {BiSolidMessageSquareDetail} from 'react-icons/bi'
import { Link } from "react-router-dom";
function Applicants() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [applicantID, setApplicantId] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const API_ENDPOINT = "http://23.22.32.42/api";
  const [applicants, setApplicants] = useState(null);
  const token = useSelector((state) => state.userAuth.token);
  const getJobApplications = async () => {
    const response = await axios.get(`${API_ENDPOINT}/job-applications`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("notifications", data);
    setApplicants(data?.jobApplications);
    console.log("notifications", applicants);
  };
  useEffect(() => {
    getJobApplications();
  }, []);
  const acceptOrRejectApplicationWithToken = async (applicantid, status,status_id) => {
    // const requestBody = {
    //   _method: "put",
    //   status: status,
    //   password: password,
    //   confirm_password : confirmPassword
    // };
    if(status_id == 1){
      toast.error("Applicant is already accepted")
      return
    }else if(status_id == 2){
      toast.error("Applicant is already rejected")
      return
    }else{
    const formData = new FormData();
    if (status == 1) {
      formData.append("_method", "put");
      formData.append("status", status);
      formData.append("password", "1234");
      formData.append("confirm_password", "1234");
    } else {
      formData.append("_method", "put");
      formData.append("status", status);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("statusapplicant",  `${API_ENDPOINT}/job-applications/${applicantid}/accept-reject`);
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/job-applications/${applicantid}/accept-reject`,
        formData,
        config
      );
      console.log("Response Rejected OR Accpeted:", response.data);
      if(status == 1){
        toast.success("Applicant is Accepted")
      }else {
        toast.error("Applicant is Rejected")
      }
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }}
    getJobApplications();
  };
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  const filterApplicants = (status) => {
    const filtered = applicants.filter(applicant => applicant.status === status);
    setFilteredApplicants(filtered);
  };

  const showAllApplicants = () => {
    setFilteredApplicants(applicants);
  };
  useEffect(() => {
    showAllApplicants()
  }, [applicants])
  const [searchQuery, setSearchQuery] = useState("");
  const filterApplicantsByName = () => {
    const filtered = applicants.filter((applicant) =>
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApplicants(filtered);
  };
  useEffect(() => {
    if (searchQuery) {
      filterApplicantsByName();
    } else {
      showAllApplicants();
    }
  }, [searchQuery]);
  return (
    <div>
      <ToastContainer />
      <Layout setSearchQuery={setSearchQuery}>
        <div className="applicant-container">
          <div className="rows">
            <h2>Applicants</h2>
            <div style={{display:"flex",gap:"5px"}}>
        <button style={{background:"rgb(239 193 42)"}} className="button" onClick={() => filterApplicants(0)}>Pending</button>
        <button style={{background:"rgb(49, 188, 1)"}} className="button" onClick={() => filterApplicants(1)}>Accepted</button>
        <button style={{background:"rgb(188, 1, 1)"}} className="button" onClick={() => filterApplicants(2)}>Rejected</button>
        <button  className="button" onClick={showAllApplicants}>All</button>
      </div>
          </div>
          <div className="applicant-wrapper">
            <table class="blueTable">
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Class </th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th className="long">Notes</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {filteredApplicants?.map((applicant) => (
            <tr key={applicant.id}>
              <td className="blue">{applicant.name}</td>
              <td>{applicant.class}</td>
              <td>{applicant.phone}</td>
              <td>{applicant.email}</td>
              <td className="long">{applicant.notes}</td>
              <td style={{gap:"3px",justifyContent:"center"}}>
              <Link to={`/applicant-detail/${applicant.id}`} className="alink">
                 <span style={{fontSize:"20px"}}>
                 <BiSolidMessageSquareDetail/>
                  </span>
                </Link>
               </td> 
               <td>
            
                <span style={{color:"#31BC01",fontSize:"20px"}}   onClick={() => {
                    setApplicantId(applicant.id);
                    acceptOrRejectApplicationWithToken(applicant.id, 1,applicant.status); // Assuming '1' for accept
                  }}>
                <BsCheckCircleFill/>
                </span>
                <span style={{color:"#BC0101",fontSize:"22px",margin:"0px 0px 0px 5px"}}   onClick={() => {
                    acceptOrRejectApplicationWithToken(applicant.id, 2,applicant.status) // Assuming '1' for accept
                  }}>
                <AiFillCloseCircle/>
                </span>
              </td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
      <Modal isOpen={isModalOpen}>
        <h2>Create Password</h2>
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="input"
          style={{ margin: "10px 0px 0px 0px" }}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <div className="row">
          <button className="close" onClick={closeModal}>
            Close
          </button>
          <button
            className="send"
            onClick={() => {
              acceptOrRejectApplicationWithToken(applicantID, 2);
            }}
          >
            Accept
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Applicants;
