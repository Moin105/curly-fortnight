import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./notificationDetail.css"
import { useParams } from "react-router-dom";
function NotificationDetail() {
  const [notification, setNotification] = useState([]);
  const token = useSelector((state) => state.userAuth.token);
  const { id } = useParams();
  const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); // Assuming the role is obtained from state
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  console.log("idge", id);
  const getNotificationData = async () => {
    const response = await axios.get(`${API_ENDPOINT}/notifications/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("notificationssss", data);
    setNotification(data?.notification);
  };
  useEffect(() => {
    getNotificationData();
  }, []);
  return (
    <div>
      <h2>{notification?.title}</h2>
      <div className="notification-wrapper">
        <img src={`http://23.22.32.42/storage/${notification.attachment}`}/>
        <p className="notification-text">Description: <span>{notification?.description}</span></p>
        <p className="notification-text">From: <span>{notification?.creator?.name}</span></p>
      {role == "super_admin" && <p className="notification-text">To{notification?.users?.map((user)=>{return <span>{user?.name}</span>})}</p>
      }
      </div>
    </div>
  );
}

export default NotificationDetail;
