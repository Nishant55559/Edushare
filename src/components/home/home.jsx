import Navbar from "../navbar/navbar";
import PostFeed from "./posts/PostFeed";
import ProfileCard from "./profile snippet/ProfileCard";
import ProjectDetails from "./profile snippet/ProjectStats";
import "./Home.css";
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
            <div className="placeholder-component">Placeholder</div>
          </div>
        </div>
      </div>
    );
};

export default Home;