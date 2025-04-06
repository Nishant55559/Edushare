import React, { useRef, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import "./PostCard.css";

const PostCard = ({ data }) => {
  const { name, bio, profileImage, mediaType, mediaUrl, caption } = data;
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
    // Scroll to comment section if needed
    // commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post',
          text: caption,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
      <div className="media-container">
  {mediaType === "image" && <img src={mediaUrl} alt="Post" className="post-media" />}
  {mediaType === "video" && (
    <video ref={videoRef} src={mediaUrl} className="post-media" muted loop playsInline />
  )}
  {mediaType === "gif" && <img src={mediaUrl} alt="GIF" className="post-media" />}
  {mediaType === "svg" && <img src={mediaUrl} alt="SVG" className="post-media" />}
</div>
      {/* Action Buttons */}
      <div className="post-footer">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? <FaHeart size={24} color="#e0245e" /> : <FaRegHeart size={24} />}
          <span>{likeCount > 0 && likeCount}</span>
        </button>
        <button 
          className="action-btn"
          onClick={handleComment}
        >
          <FaComment size={24} />
        </button>
        <button 
          className="action-btn"
          onClick={handleShare}
        >
          <FaShare size={24} />
        </button>
        <button className="join-btn">Join</button>
      </div>

      {/* Comment Input Section */}
      {showCommentInput && (
        <div className="comment-section">
          <input 
            type="text" 
            placeholder="     Write a comment..."
            className=" comment-input"
          />
          <button className="comment-submit">Post</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
