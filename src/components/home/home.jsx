import Navbar from "../navbar/navbar";
import PostFeed from "./posts/PostFeed";
import ProfileCard from "./profile snippet/ProfileCard";
import ProjectDetails from "./profile snippet/ProjectStats";
import "./Home.css";
import SuggestedToFollow from "./suggestions/suggestedToFollow/SuggestedToFollow";
import SuggestedProjects from "./suggestions/SuggestedProjects/SuggestedProjects";
function Home(){
    return(
        
        <div className="home-container">
        {/* Navbar */}
 
  
        {/* Main Content Section */}
        <div className="main-content">
          {/* Left Column: Profile Card + Project Details */}
          <div className="left-column">
            <ProfileCard />
            <ProjectDetails />
          </div>
  
          {/* Middle Column: Post Feed */}
          <div className="middle-column">
            <PostFeed />
          </div>
  
          {/* Right Column: Placeholder for Future Component */}
          <div className="right-column">
             <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <SuggestedToFollow />
      <SuggestedProjects />
    </div>
          </div>
        </div>
        
      </div>
    );
};

export default Home;