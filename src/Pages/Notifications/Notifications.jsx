import React from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
function Notifications() {
  return (
    <div>
      <Layout>
        <div className="notification-container">
        <h2>Notification</h2>
        <div className="notification-wrapper">
        <div className="notification-row">
            <p className="notification-text">You have a new message from</p> <span className="notification-time">2 min ago</span>
        </div>

        </div>
        </div>
      </Layout>
    </div>
  );
}

export default Notifications;
