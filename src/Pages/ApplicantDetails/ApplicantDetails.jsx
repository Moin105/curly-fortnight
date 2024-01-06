import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom/dist";

import { Link } from "react-router-dom";
import BackHeader from "../../Components/Header/BackHeader";
function ApplicantDetails() {
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
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
          <span className="detail-key">{key.replace(/_/g, " ")}</span>
          <span className="detail-value">{applicantData[key]}</span>
        </div>
      ));
  };
  return (
    <div>
      <BackHeader link="/applicants"/>
      <Layout>
        <div className="applicant-detail-container">
          <div className="rows">
            <h2>Applicant's Details</h2>
          </div>
          {/* <div className="applicant-details">{renderApplicantDetails()}</div> */}
          <div className="applicant-details">
            <div className="details-row">
              <span className="detail-key">Name</span>
              <span className="detail-value">{applicantData?.name}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Class</span>
              <span className="detail-value">{applicantData?.class}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Reference</span>
              <span className="detail-value">{applicantData?.reference}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Phone</span>
              <span className="detail-value">{applicantData?.phone}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Email</span>
              <span className="detail-value">{applicantData?.email}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Address</span>
              <span className="detail-value">{applicantData?.address}</span>
            </div>
            {/* <div className="details-row">
              <span className="detail-key">Reference</span>
              <span className="detail-value">{applicantData?.reference}</span>
            </div> */}
            <div className="details-row">
              <span className="detail-key">Board Start</span>
              <span className="detail-value">{applicantData?.board_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Board End</span>
              <span className="detail-value">{applicantData?.board_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">CPR Start</span>
              <span className="detail-value">{applicantData?.cpr_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">CPR End</span>
              <span className="detail-value">{applicantData?.cpr_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Physical Start</span>
              <span className="detail-value">{applicantData?.physical_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Physical End</span>
              <span className="detail-value">{applicantData?.physical_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">MMR Start</span>
              <span className="detail-value">{applicantData?.mmr_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">MMR End</span>
              <span className="detail-value">{applicantData?.mmr_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Creminia Background Start</span>
              <span className="detail-value">{applicantData?.creminia_background_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Creminia Background End</span>
              <span className="detail-value">{applicantData?.creminia_background_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Drung Test Start</span>
              <span className="detail-value">{applicantData?.drung_test_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Drung Test End</span>
              <span className="detail-value">{applicantData?.drung_test_background_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Availability Day</span>
              <span className="detail-value">{applicantData?.avalibility_day}</span>
            </div>
            <div className="details-row">
            <span className="detail-key">Driver</span>
              <span className="detail-value">{applicantData?.driver}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Avalibility Start</span>
              <span className="detail-value">{applicantData?.avalibility_start}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Avalibility End</span>
              <span className="detail-value">{applicantData?.avalibility_end}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Notes</span>
              <span className="detail-value">{applicantData?.notes}</span>
            </div>
            <div className="details-row">
              <span className="detail-key">Status</span>
              <span className="detail-value">{applicantData?.status}</span>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ApplicantDetails;
