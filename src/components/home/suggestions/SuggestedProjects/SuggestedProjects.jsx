import React from "react";
import "./SuggestedProjects.css";

const SuggestedProjects = () => {
  const projects = [
    { name: "Name", user: "User" },
    { name: "Name", user: "User" },
    { name: "Name", user: "User" },
  ];

  return (
    <div className="suggested-container">
      <h4>Suggested Projects</h4>
      {projects.map((project, index) => (
        <div className="suggested-item" key={index}>
          <div className="avatar"></div>
          <div className="project-info">
            <span className="project-name">{project.name}</span>
            <span className="project-user">{project.user}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedProjects;
