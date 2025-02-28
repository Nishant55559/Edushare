import React, { useState } from "react";

import { FaEllipsisH, FaRegThumbsDown, FaCog } from "react-icons/fa";
import "./notification_body.css";

const notifications = [
  {
    id: 1,
    title: "editor",
    details: "10 opportunities in",
    location: "Siliguri",
    time: "11m",
    button: "View jobs",
    highlighted: true,
  },
  {
    id: 2,
    user: "Mukesh Garg's connection",
    action: "is hiring for a",
    job: "User Experience Designer",
    company: "Tata Consultancy Services",
    time: "41m",
  },
  {
    id: 3,
    user: "Harinder Kumar Sahu",
    action: "published an article:",
    article: "If You Are an Option Seller, Remember These Things",
    time: "1h",
  },
  {
    id: 4,
    message: "1 person viewed your profile. See the full list with Premium.",
    time: "1h",
    button: "Try Premium for ₹0",
  },
  {
    id: 5,
    message:
      "Friday Daily Rundown: Globetrotting gets costlier for Indians, What’s driving retail sales, and more.",
    time: "4h",
  },
];

const NotificationBody = () => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const deleteNotification = (id) => {
    alert(`Deleted notification ${id}`);
  };

  const changePreferences = () => {
    alert("Change notification preferences clicked");
  };
  console.log("Notification Component Rendered"); 
  return (
    <div className="notification-container">
      <div className="notification-header">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Jobs</button>
        <button className="filter-btn">My posts</button>
        <button className="filter-btn">Mentions</button>
      </div>

      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`notification-card ${notif.highlighted ? "highlighted" : ""}`}
        >
          <div className="notification-content">
            {notif.title && (
              <p>
                <strong>{notif.title}</strong>: {notif.details}{" "}
                <strong>{notif.location}</strong>
              </p>
            )}
            {notif.user && (
              <p>
                <strong>{notif.user}</strong> {notif.action}{" "}
                <strong>{notif.job}</strong> at{" "}
                <strong>{notif.company}</strong>
              </p>
            )}
            {notif.article && (
              <p>
                <strong>{notif.user}</strong> {notif.action} {notif.article}
              </p>
            )}
            {notif.message && <p>{notif.message}</p>}

            {notif.button && <button className="notif-btn">{notif.button}</button>}
          </div>

          <div className="notification-time">{notif.time}</div>

          <div className="notification-menu">
            <FaEllipsisH
              className="menu-icon"
              onClick={() => toggleMenu(notif.id)}
            />
            {openMenuId === notif.id && (
              <div className="dropdown-menu">
                <button onClick={() => deleteNotification(notif.id)}>
                  <FaRegThumbsDown className="menu-icon" /> Delete Notification
                </button>
                <button onClick={changePreferences}>
                  <FaCog className="menu-icon" /> Change Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBody;
