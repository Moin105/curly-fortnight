import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom/dist";

import { Link } from "react-router-dom";
function ApplicantDetails() {
  const API_ENDPOINT = "http://23.22.32.42/api";
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState(null);
  const token = useSelector((state) => state.userAuth.token);
  const getJobApplicationsById = async (id) => {
    const response = await axios.get(`${API_ENDPOINT}/job-applications/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("notifications", data);
    setApplicantData(data?.jobApplication);
    console.log("notifications", applicantData);
  };
  useEffect(() => {
    if (id) {
      getJobApplicationsById(id);
    }
  }, []);
  const keysToExclude = ["id", "deleted_at", "created_at", "updated_at"];

  const renderApplicantDetails = () => {
    if (!applicantData) {
      return <div>Loading...</div>;
    }

    return Object.keys(applicantData)
      .filter((key) => !keysToExclude.includes(key))
      .map((key) => (
        <div key={key} className="details-row">
          <span className="detail-key">{key.replace(/_/g, ' ')}</span>
          <span className="detail-value">{applicantData[key]}</span>
        </div>
      ));
  };
  return (
    <div>
      <Layout>
        <div className="applicant-detail-container">
          <div className="rows">
            <h2>Applicant's Details</h2>
          </div>
          <div className="applicant-details">
          {renderApplicantDetails()}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ApplicantDetails;
