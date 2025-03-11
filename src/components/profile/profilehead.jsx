import React from "react";
import "./profile.css";
import profile1 from './profile1.jpg';
const ProfileHead = () => {
  return (
    <div className="profile-container">
      {/* Background Header */}
      <div className="profile-header">
        <div className="profile-overlay"></div>
        <button className="edit-icon">✏️</button>
      </div>

      {/* Profile Info */}
      <div className="profile-content">
        <div className="profile-info">
          <img
            src={profile1}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-details">
            <h2 className="profile-name">Emma Smith</h2>
            <p className="profile-role">Software Engineer</p>
            <p className="profile-location">Los Angeles, California</p>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions">
          <button className="btn edit-btn">Edit Profile</button>
          <button className="btn settings-btn">Settings</button>
        </div>

        {/* Role and Skills */}
        <div className="profile-meta">
          <div className="current-role">
            <span>Current role:</span>
            <span className="role-badge">Software Engineer</span>
          </div>
          <div className="skills">
            <span>Skills:</span>
            <div className="skills-list">
              <span className="skill">HTML</span>
              <span className="skill">CSS</span>
              <span className="skill">Dart</span>
              <span className="skill">C++</span>
              <span className="skill">UI Design</span>
            </div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="profile-options">
          <div className="option-card">
            <p className="option-title">Ready for work</p>
            <p className="option-desc">Show recruiters that you're ready for work.</p>
            <span className="arrow">→</span>
          </div>
          <div className="option-card">
            <p className="option-title">Share posts</p>
            <p className="option-desc">Share latest news to get connected with others.</p>
            <span className="arrow">→</span>
          </div>
          <div className="option-card">
            <p className="option-title">Update</p>
            <p className="option-desc">Keep your profile updated so that recruiters know you better.</p>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
