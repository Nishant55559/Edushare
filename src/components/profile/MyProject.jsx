import "./MyProject.css";
import pr1 from './pr1.svg';
import pr2 from './pr2.svg';
import pr3 from './pr3.svg';
import pr4 from './pr4.svg';
import pr5 from './pr5.svg';
import pr6 from './pr6.svg';
import pr7 from './pr7.svg';
import pr8 from './pr8.svg';
import pr9 from './pr9.svg';
import pr10 from './pr10.svg';




const projects = [
  {
    title: "Start from AI",
    image: pr1,
    description: "Start from AI magic",
    button: "Open",
  },
  {
    title: "Blank Project",
    image: pr2,
    description: "Start from scratch",
    button: "Open",
  },
  {
    title: "Use your own Design",
    image: pr3,
    description: "Start from screenshot",
    button: "Open",
  },
  {
    title: "Play with Uizard",
    image: pr4,
    description: "Play with Uizard",
    button: "Open",
  },
  {
    title: "Google Material Design Web App",
    image: pr5,
    button: "Open",
  },
  {
    title: "Google Material Design Email App",
    image: pr10,
    button: "Open",
  },
  {
    title: "Google Material You",
    image: pr7,
    button: "Open",
  },
  {
    title: "IBM Carbon Cloud Dashboard",
    image: pr8,
    button: "Open",
  },
  {
    title: "IBM Carbon Cloud Dashboard",
    image: pr9,
    button: "Open",
  },
];

const MyProject = () => {
  return (
    <div className="project-container">
      {projects.map((project, index) => (
        <div className="project-card" key={index}>
          <img src={project.image} alt={project.title} className="project-image" />
          <div className="project-info">
            <h3>{project.title}</h3>
            {project.description && <p>{project.description}</p>}
            {project.button && <button className="create-btn">{project.button}</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProject;
