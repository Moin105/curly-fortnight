import React, { useState, useEffect } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Notifications() {
  const API_ENDPOINT = "http://23.22.32.42/api";
  const token = useSelector((state) => state.userAuth.token);
  const [notifications, setNotification] = useState(null);
  const getNotifications = async () => {
    const response = await axios.get(`${API_ENDPOINT}/notifications`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("notifications", data);
    setNotification(data.notifications);
    console.log("notifications", notifications);
  };
  useEffect(() => {
    return () => {
      getNotifications();
    };
  }, []);
  const getTimeSpan = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);

    const timeDifference = currentTime - postTime;
    const timeInMinutes = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes

    if (timeInMinutes < 60) {
      return timeInMinutes === 1
        ? "1 minute ago"
        : `${timeInMinutes} minutes ago`;
    } else {
      const postDate = postTime.toISOString().split("T")[0]; // Get the date portion
      return postDate; // For older posts, just show the date in the format 'YYYY-MM-DD'
    }
  };
  return (
    <div>
      <Layout>
        <div className="notification-container">
          <h2>Notification</h2>
          <div className="notification-wrapper">
            {notifications?.map((notification) => {
              return (
             
             
                <div className="notification-row">
                      <Link to={`/notifications/${notification.id}`}><p className="notification-text">{notification.title}</p>   </Link>{" "}
                  <span className="notification-time">
                    {getTimeSpan(notification.created_at)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Notifications;
