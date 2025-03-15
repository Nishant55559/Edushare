import React from "react";
import "./ProfileCard.css";
import bannerImage from "../../../assets/banner.jpg";
import profileImage from "../../../assets/p2.jpg";

const ProfileCard = () => {
  return (
    <div className="profile-card">
      {/* Banner Image */}
      <img src={bannerImage} alt="Profile Banner" className="banner-image" />
      {/* Profile Image */}
      <div className="profile-image-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      {/* Profile Info */}
      <div className="profile-info">
        <h3 style={{marginTop: "20px",padding: "0px"}}>Gary Chettiar</h3>
        <p className="bio">Flutter Developer</p>
        <p className="location">Mumbai</p>
      </div>
    </div>
  );
};

export default ProfileCard;
