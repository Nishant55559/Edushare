import React, { useRef, useEffect } from "react";
import "./PostCard.css";

const PostCard = ({ data }) => {
  const { name, bio, profileImage, mediaType, mediaUrl, caption } = data;
  const videoRef = useRef(null);

  // Autoplay video when in view
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="post-card">
      {/* Profile Section */}
      <div className="post-header">
        <div style={{ display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center" }}>
        <img src={profileImage} alt="Profile" className="profile-img" />
        <div style={{ textAlign:"left",alignItems:"center",justifyContent:"center" }}>
          <h4 style={{marginBottom:"0px"}}>{name}</h4>
          <p className="bio">{bio}</p>
        </div>
        </div>
        
        <button className="menu-btn">⋮</button>
      </div>

      {/* Caption */}
      <p className="caption">{caption}</p>

      {/* Media Section */}
      {mediaType === "image" && <img src={mediaUrl} alt="Post" className="post-media" />}
      {mediaType === "video" && (
        <video ref={videoRef} src={mediaUrl} className="post-media" muted loop playsInline />
      )}
      {mediaType === "gif" && <img src={mediaUrl} alt="GIF" className="post-media" />}

      {/* Action Buttons */}
      <div className="post-footer">
        <button className="action-btn">Like</button>
        <button className="action-btn">Comment</button>
        <button className="action-btn">Save</button>
        <button className="join-btn">Join</button>
      </div>
    </div>
  );
};

export default PostCard;
