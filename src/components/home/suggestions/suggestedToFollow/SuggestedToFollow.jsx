import React from "react";
import "./SuggestedToFollow.css";
import dp1 from "./dp1.svg";
import p2 from "../../../../assets/p1.jpg";
import p1 from "../../../../assets/p2.jpg";

const SuggestedToFollow = () => {
  const suggestions = [
    { name: "John Doe", bio: "Software Developer", avatar: p2 },
    { name: "Alice Smith", bio: "UI/UX Designer", avatar: dp1 },
    { name: "Mike Johnson", bio: "Product Manager", avatar: p1 },
  ];

  return (
    <div className="follow-container">
      <h4>Suggested to follow</h4>
      {suggestions.map((user, index) => (
        <div className="follow-item" key={index}>
          <div className="follow-avatar-wrapper">
            <img 
              src={user.avatar} 
              className="follow-avatar" 
              alt={user.name}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = p1; // Fallback image if SVG fails to load
              }}
            />
          </div>
          <div className="follow-user-info">
            <span className="follow-user-name">{user.name}</span>
            <span className="follow-user-bio">{user.bio}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedToFollow;
