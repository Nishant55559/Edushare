import React, { useRef, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import "./PostCard.css";
import { Button } from "@/components/ui/button";

const PostCard = ({ data }) => {
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
  };
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const {
    Name,
    ContactNumber,
    Title,
    Description,
    Domain,
    Status,
    Tools,
    ImageURL
  } = data;
  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
    // Scroll to comment section if needed
    // commentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleShare = async () => {
    const shareText = `${Title} - ${Description}`; // Or customize as needed
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        alert('Failed to copy link');
      }
    }
  };
  
  return (
    <div className="POST-card">
      {/* Header */}
      <div className="POST-header">
        <div className="POST-profile-info">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(Name)}`}
            alt="Profile"
            className="POST-profile-img"
          />
          <div>
            <h4 className="POST-name">{Name}</h4>
            <p className="POST-domain">{Domain}</p>
          </div>
        </div>
        <button className="POST-menu-btn">⋮</button>
      </div>

      {/* Title */}
      <div className="POST-title-status-row">
  <h3 className="POST-title">{Title}</h3>
  <span className="POST-status">{Status}</span>
</div>

      {/* Description */}
      <p><strong>Description:</strong> {Description}</p>

      {/* Tools Used */}
      <p><strong>Tools Used:</strong> {Tools}</p>

      {/* Bottom Content */}
      {ImageURL ? (
        <div className="POST-content-img-wrapper">
          <img src={ImageURL} alt="Project Preview" className="POST-content-img" />
        </div>
      ) : null}
    
      {/* Timestamp */}
     

      {/* Action Button (Optional) */}
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
        {/* <button className="join-btn">Join</button> */}
        <Button/>
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
