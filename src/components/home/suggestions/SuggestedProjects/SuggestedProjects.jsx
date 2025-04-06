import React from "react";
import "./SuggestedProjects.css";
import p2 from "../../../../assets/p1.jpg";
import { useNavigate } from "react-router-dom";

const SuggestedProjects = () => {
  const navigate = useNavigate();

  const projects = [
    { 
      name: "Nishant Raj", 
      user: "CodeCollab Pro: Real-Time Coding & Review Platform",
      avatar: p2,
      category: "web"
    },
    { 
      name: "Rajbir Ray", 
      user: "NeuroLens: AI-Based Eye Tracking for Neurological Diagnosis",
      avatar: p2,
      category: "ai"
    },
    { 
      name: "Apurva Ishan", 
      user: "AutoFarmX: Smart IoT System for Precision Agriculture",
      avatar: p2,
      category: "iot"
    },
  ];

  const handleProjectClick = (category) => {
    navigate('/projects', { 
      state: { 
        activeCategory: category,
        scrollToSection: true 
      }
    });
  };

  return (
    <div className="suggested-container">
      <h4>Suggested Projects</h4>
      {projects.map((project, index) => (
        <div 
          className="suggested-item" 
          key={index}
          onClick={() => handleProjectClick(project.category)}
        >
          <div className="avatar-container">
            <img src={project.avatar} className="avatar" alt={project.name} />
          </div>
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
