import React, { useState } from "react";
import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell } from "react-icons/fa";
import "./Navbar.css";
import logo from './logo.svg'
import account from './account.jpg'

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <nav className="navbar">
      {/* LinkedIn Logo */}
      <div className="navbar-logo">
        <span className="navbar-linkedin-logo"><img src={logo} alt="logo" /></span>
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
        <div className="navbar-item">
        <FaHome size={22} />
          <span>Home</span>
        </div>
        <div className="navbar-item">
          <FaUserFriends size={22}/>
          <span>My Network</span>
        </div>
        <div className="navbar-item">
          <FaBriefcase size={22} />
          <span>Projects</span>
        </div>
        <div className="navbar-item">
          <FaCommentDots size={22}/>
          <span>Messaging</span>
        </div>
        <div className="navbar-item">
          <FaBell size={22}/>
          <span>Notifications</span>
        </div>
        <div className="navbar-item navbar-profile">
          <img src={account} alt="Profile" className="navbar-profile-img" />
          <span>Me </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
