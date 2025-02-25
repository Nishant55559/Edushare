import { FaUsers, FaUserPlus, FaUsersCog, FaCalendarAlt, FaFileAlt, FaNewspaper } from "react-icons/fa";
import "./NetworkBody.css";
import p1 from './p1.svg';
import p2 from './p2.svg';
import p3 from './p3.svg';
import p4 from './p4.svg';

import p6 from './p6.svg';
import p7 from './p7.svg';

const NetworkBody = () => {
  const suggestions = [
    { name: "Om Sinkar", img: p1 },
    { name: "Varun Agarwal", img: p2 },
    { name: "Parag Tyagi", img: p3 },
    { name: "Dr. Dhruva Kumar", img: p4 },
    { name: "Dr. Dhruva Kumar", img: p7 },
    { name: "Dr. Dhruva Kumar", img: p6 },
    { name: "Dr. Dhruva Kumar", img: p7 },
    { name: "Dr. Dhruva Kumar", img: p1 },
    { name: "Dr. Dhruva Kumar", img: p2 },
  ];

  return (
    <div className="network-body">
      {/* Sidebar */}
      <div className="network-sidebar">
        <h3>Manage my network</h3>
        <ul>
          <li><FaUsers className="network-icon" /> Connections <span style={{gap:"5px"}}> 136</span></li>
          <li><FaUserPlus className="network-icon" /> Following & followers <span>1</span></li>
          <li><FaUsersCog className="network-icon" /> Groups <span>7</span></li>
          <li><FaCalendarAlt className="network-icon" /> Events</li>
          <li><FaFileAlt className="network-icon" /> Pages <span>1</span></li>
          <li><FaNewspaper className="network-icon" /> Newsletters</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="network-main">
        {/* Invitations */}
        <div className="network-invitations">
          <h4>No pending invitations</h4>
          <button className="manage-btn">Manage</button>
        </div>

        {/* People Suggestions */}
        <div className="network-suggestions">
          <h4>People you may know based on your recent activity</h4>
          <div className="suggestion-list">
            {suggestions.map((person, index) => (
              <div className="suggestion-card" key={index}>
                <img src={person.img} alt={person.name} className="profile-pic" />
                <p>{person.name}</p>
                <button>Connect +</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkBody;
