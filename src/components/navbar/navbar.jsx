import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell } from "react-icons/fa";
import "./Navbar.css";
import logo2 from "./logo2.svg";
import account from "./account.jpg";

const navItems = [
  { name: "Home", icon: <FaHome size={22} />, path: "/" },
  { name: "My Network", icon: <FaUserFriends size={22} />, path: "/network" },
  { name: "Projects", icon: <FaBriefcase size={22} />, path: "/projects" },
  { name: "Messaging", icon: <FaCommentDots size={22} />, path: "/messaging" },
  { name: "Notifications", icon: <FaBell size={22} />, path: "/notifications" },
  { name: "Login", icon: <FaBell size={22} />, path: "/login" },  //login added
];

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo2} alt="Logo" className="navbar-logo-img" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className={`navbar-search-bar ${isSearchActive ? "navbar-active" : ""}`}>
        <FaSearch className="navbar-search-icon" />
        <input
          type="text"
          placeholder="Search"
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
        />
      </div>

      {/* Navigation Icons */}
      <div className="navbar-icons">
        {navItems.map((item, index) => (
          <Link
          key={index}
          to={item.path}
          className={`navbar-item ${activeTab === item.name ? "active" : ""}`}
          onClick={() => setActiveTab(item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
        ))}

        {/* Profile Section */}
        <div className="navbar-item navbar-profile">
          <img src={account} alt="Profile" className="navbar-profile-img" />
          <span>Me</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
