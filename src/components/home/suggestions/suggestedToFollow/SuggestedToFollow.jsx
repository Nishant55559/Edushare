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
    <div className="suggested-container">
      <h4>Suggested to follow</h4>
      {suggestions.map((user, index) => (
        <div className="suggested-item" key={index}>
          <img src={user.avatar}className="avatar"/>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-bio">{user.bio}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedToFollow;
