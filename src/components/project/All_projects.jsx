import React, { useState } from "react";
import "./All_projects.css";
import { FaBookmark } from "react-icons/fa";
import cyber from './cyber.svg';
import python from './python.svg';
import full from './full.svg';
import react from './react.svg';
import ui from './ui.svg';
import blockchain from './blockchain.svg';
import cloud from './cloud.svg';
import iot from './iot.svg';
import ai from './ai.svg';

const projects = [
  {
    id: 1,
    title: "Web Development using React JS",
    description: "Learn to build interactive UIs with React.js, a popular JavaScript library.",
    image: react
  },
  {
    id: 2,
    title: "Machine Learning with Python",
    description: "Explore AI and machine learning concepts using Python libraries like TensorFlow and scikit-learn.",
    image: python
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and experience design for modern applications.",
    image: ui
  },
  {
    id: 4,
    title: "Full-Stack Development with Node.js",
    description: "Learn backend development using Node.js and Express.js with a MongoDB database.",
    image: full
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description: "Understand the basics of network security, encryption, and ethical hacking.",
    image: cyber
  },
  {
    id: 6,
    title: "Blockchain and Smart Contracts",
    description: "Get hands-on with blockchain technology and build smart contracts using Solidity.",
    image: blockchain
  },
  {
    id: 7,
    title: "AI Chatbots",
    description: "Learn to build AI-powered chatbots using NLP techniques with Python and TensorFlow.",
    image: ai
  },
  {
    id: 8,
    title: "Cloud Computing Basics",
    description: "Explore cloud platforms like AWS, Azure, and Google Cloud, and deploy scalable applications.",
    image: cloud
  },
  {
    id: 9,
    title: "IoT and Smart Devices",
    description: "Understand how to connect and control IoT devices using Raspberry Pi and Arduino.",
    image: iot
  },
];

const AllProjects = () => {
  const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="all-projects-container">
      {projects.map((project) => (
        <div className="all-project-card" key={project.id}>
          <img src={project.image} alt={project.title} className="all-project-image" />
          <div className="all-project-info">
            <div className="all-project-header">
              <span className="all-project-date">20 Mar, 2025</span>
              <FaBookmark
                className={`all-bookmark-icon ${bookmarked[project.id] ? "all-bookmarked" : ""}`}
                onClick={() => toggleBookmark(project.id)}
              />
            </div>
            <h3 className="all-project-title">{project.title}</h3>
            <p className="all-project-description">{project.description}</p>
            <div className="all-project-footer">
              <button className="all-open-button">Open</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProjects;
