import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";

import SectionHeader from "../../Components/Header/SectionHeader";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
function AddNotification() {
  const token = useSelector((state) => state.userAuth.token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const loading = useSelector((state) => state.userAuth.loading);
  const [users, setUsers] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const checkboxValue = isChecked ? 1 : 0;
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [isCheckeds, setIsCheckeds] = useState(false);
  const checkboxValues = isCheckeds ? 1 : 0;
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCheckboxChanges = () => {
    setIsCheckeds(!isCheckeds);
  };
  const navigate = useNavigate();
  const API_ENDPOINT = "http://23.22.32.42/api";
  const handleSelect = (value) => {
    setSelectedOption(value);
    // console.log(`Option selected:`, value);
  };

  const generateNotification = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", selectedFile);
        formData.append("all_users", checkboxValues);
        formData.append("all_admins", checkboxValue);

        selectedOption.forEach((user) => {
          formData.append("user_names", user.user_name);
        });

        const response = await axios.post(
          `${API_ENDPOINT}/notifications`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (data.status >= 200 && data.status < 300) {
          toast.success("Notification Sent Successfully");
          navigate("/notifications");
        } else {
          toast.error("Error Sending Notification");
        }
      } catch (error) {
        console.error("Error:", error);
        setUploadStatus("An error occurred while uploading the image.");
      }
    } else {
      setUploadStatus("Please select an image to upload.");
    }
  };

  const getUsers = async () => {
    const response = await axios.get(`${API_ENDPOINT}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log(data);
    setUsers(data.users);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("file", selectedFile);
  };

  const handleUpload = async () => {};

  const handleClickSelect = () => {
    fileInputRef.current.click();
  };
  return (
    <Layout>
      <div className="notification-page">
        <div className="rows">
          <h2>Notifications</h2>
        </div>
        <ToastContainer />
        <div className="notification-page-container">
          <div className="notification-form">
            <input
              type="text"
              placeholder="Add Notification Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Add Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button onClick={handleClickSelect}>
                Select and Upload Image
              </button>
              {/* <button onClick={handleUpload}>Upload Image</button> */}
              <div>{uploadStatus}</div>
            </div>
            <h2>Send To </h2>
            <div className="row">
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span class="checkmark"></span>
                <p>All Admins</p>
              </label>
              <label class="custom-checkbox">
                <input
                  type="checkbox"
                  checked={isCheckeds}
                  onChange={handleCheckboxChanges}
                />
                <span class="checkmark"></span>
                <p>All Users</p>
              </label>
            </div>
            <CustomSelect
              options={users}
              onSelect={handleSelect}
            />
            <button
              onClick={() => {
                generateNotification();
              }}
            >
              {loading === "pending" ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddNotification;
