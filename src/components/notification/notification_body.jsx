import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisH, FaRegThumbsDown, FaCog } from "react-icons/fa";
import "./notification_body.css";

const notifications = [
  {
    id: 1,
    category: "Jobs",
    title: "editor",
    details: "10 opportunities in",
    location: "Siliguri",
    time: "11m",
    button: "View jobs",
    highlighted: true,
  },
  {
    id: 2,
    category: "Jobs",
    user: "Mukesh Garg's connection",
    action: "is hiring for a",
    job: "User Experience Designer",
    company: "Tata Consultancy Services",
    time: "41m",
  },
  {
    id: 3,
    category: "My posts",
    user: "Harinder Kumar Sahu",
    action: "published an article:",
    article: "If You Are an Option Seller, Remember These Things",
    time: "1h",
  },
  {
    id: 4,
    category: "Mentions",
    message: "1 person viewed your profile. See the full list with Premium.",
    time: "1h",
    button: "Try Premium for ₹0",
  },
  {
    id: 5,
    category: "All",
    message:
      "Friday Daily Rundown: Globetrotting gets costlier for Indians, What’s driving retail sales, and more.",
    time: "4h",
  },
  {
    id: 6,
    category: "All",
    user: "LinkedIn News India",
    action: "shared a post:",
    article: "Top Skills to Learn in 2025 for Better Job Prospects",
    time: "6h",
  },
];

const NotificationBody = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [active, setActive] = useState("All");

  const menuRef = useRef(null); // Ref to detect outside clicks

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const deleteNotification = (id) => {
    alert(`Deleted notification ${id}`);
  };

  const changePreferences = () => {
    alert("Change notification preferences clicked");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications =
    active === "All"
      ? notifications
      : notifications.filter((notif) => notif.category === active);

  return (
    <div className="notification-container">
      <div className="notification-header">
        {["All", "Jobs", "My posts", "Mentions"].map((tab) => (
          <button
            key={tab}
            className={active === tab ? "filter-btn active" : "filter-btn"}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <p className="no-notifications">No notifications found.</p>
      ) : (
        filteredNotifications.map((notif) => (
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

            <div className="notification-menu" ref={menuRef}>
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
        ))
      )}
    </div>
  );
};

export default NotificationBody;
