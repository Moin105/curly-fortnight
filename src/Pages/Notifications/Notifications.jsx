import React, { useState, useEffect } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Notifications() {
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  const token = useSelector((state) => state.userAuth.token);
  const [notifications, setNotification] = useState(null);
  const [filteredNotifications, setFilteredNotifications] = useState(null);

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
  
      getNotifications();
  
  }, []);
  const getTimeSpan = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);

    const timeDifference = currentTime - postTime;
    const timeInMinutes = Math.floor(timeDifference / 60000)

    if (timeInMinutes < 60) {
      return timeInMinutes === 1
        ? "1 minute ago"
        : `${timeInMinutes} minutes ago`;
    } else {
      const postDate = postTime.toISOString().split("T")[0]; 
      return postDate; 
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredNotifications(null); 
    } else {
      const filtered = notifications.filter((notification) =>
        notification.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotifications(filtered);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Layout setSearchQuery={handleSearch}>
        <div className="notification-container">
          <h2>Notification</h2>
          <div className="notification-wrapper">
       {notifications &&   <>  {(searchQuery ? filteredNotifications : notifications)?.map(
              (notification) => (
                <div className="notification-row" key={notification.id}>
                  <Link to={`/notifications/${notification.id}`}>
                    <p className="notification-text">{notification.title}</p>
                  </Link>{" "}
                  <span className="notification-time">
                    {getTimeSpan(notification.created_at)}
                  </span>
                </div>
              )
            )}</>}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Notifications;
