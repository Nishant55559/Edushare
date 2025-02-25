import React from "react";
import "./SuggestedProjects.css";
import p2 from "../../../../assets/p1.jpg"
const SuggestedProjects = () => {
  const projects = [
    { name: "Name", user: "User" ,avatar:p2},
    { name: "Name", user: "User" ,avatar:p2},
    { name: "Name", user: "User" ,avatar:p2},
  ];

  return (
    <div className="suggested-container">
      <h4>Suggested Projects</h4>
      {projects.map((project, index) => (
        <div className="suggested-item" key={index}>
          <img src={project.avatar}className="avatar"/>
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
