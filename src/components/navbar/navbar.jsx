import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaCommentDots,
  FaBell,
} from "react-icons/fa";

import "./navbar.css";
import logo2 from "./logo2.svg";
import account from "./account.jpg";
import { useNav } from "../../NavContext";
import { useSearch } from "../../SearchContext";

const navItems = [
  { name: "Home", icon: <FaHome size={22} />, path: "/" },
  { name: "My Network", icon: <FaUserFriends size={22} />, path: "/network" },
  { name: "Projects", icon: <FaBriefcase size={22} />, path: "/projects" },
  { name: "Messaging", icon: <FaCommentDots size={22} />, path: "/messaging" },
  { name: "Notifications", icon: <FaBell size={22} />, path: "/notifications" },
];

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { activeTab, setActiveTab } = useNav();
  const { searchTerm, setSearchTerm } = useSearch();

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
          placeholder="Search interests (e.g. AI, ML, Flutter)"
          value={searchTerm}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        <Link
          to="/profile"
          className={`navbar-item navbar-profile ${
            activeTab === "Profile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Profile")}
        >
          <img src={account} alt="Profile" className="navbar-profile-img" />
          <span>Me</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
