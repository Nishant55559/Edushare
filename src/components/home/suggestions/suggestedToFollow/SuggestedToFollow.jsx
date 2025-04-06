import React from "react";
import "./SuggestedToFollow.css";
import p2 from "../../../../assets/p1.jpg"
import p1 from "../../../../assets/p2.jpg"
const SuggestedToFollow = () => {
  const suggestions = [
    { name: "Name", bio: "Bio" ,avatar:p2},
    { name: "Name", bio: "Bio" ,avatar:p1},
    { name: "Name", bio: "Bio" ,avatar:p2},
  ];

  return (
    <div className="follow-container">
      <h4>Suggested to follow</h4>
      {suggestions.map((user, index) => (
        <div className="follow-item" key={index}>
          <div className="follow-avatar-wrapper">
            <img src={user.avatar} className="follow-avatar" alt={user.name}/>
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
