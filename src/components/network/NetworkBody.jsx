
import { FaUsers, FaUserPlus, FaUsersCog, FaCalendarAlt, FaFileAlt, FaNewspaper } from "react-icons/fa";
import "./NetworkBody.css";

const NetworkBody = () => {
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
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Om Sinkar</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Varun Agarwal</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Parag Tyagi</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Dr. Dhruva Kumar</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Dr. Dhruva Kumar</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Dr. Dhruva Kumar</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Dr. Dhruva Kumar</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Dr. Dhruva Kumar</p>
              <button>Connect</button>
            </div>
            <div className="suggestion-card">
              <div className="profile-pic"></div>
              <p>Dr. Dhruva Kumar</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkBody;
