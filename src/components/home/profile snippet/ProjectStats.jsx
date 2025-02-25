import React from "react";
import "./ProjectStats.css";

const ProjectStats = () => {
  return (
    <div className="project-stats-card">
      <div className="stat-item">
        <span className="stat-label">Ongoing Projects</span>
        <span className="stat-value">5</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Completed Projects</span>
        <span className="stat-value">4</span>
      </div>
    </div>
  );
};

export default ProjectStats;
