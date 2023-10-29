import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";

import { Link } from "react-router-dom";
function Applicants() {
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

  return (
    <div>
      <Layout>
        <div className="applicant-container">
          <div className="rows">
            <h2>Applicants</h2>
          </div>
          <div className="applicant-wrapper">
            <table class="blueTable">
              <thead>
                <tr>
                  <th>Name of Applicant</th>
                  <th>Class </th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th className="long">Notes</th>
                  <th>details</th>
                </tr>
              </thead>
              <tbody>
                {applicants?.map((applicant) => {
                  return (
                    <tr>
                      <td className="blue">{applicant.name}</td>
                      <td>{applicant.class}</td>
                      <td>{applicant.phone}</td>
                      <td>{applicant.email}</td>
                      <td className="long">{applicant.notes}</td>
                      <td> <Link
                  to={`/applicant-detail/${applicant.id}`}
                  className="alink"
                ><button className="button" >details</button></Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Applicants;
