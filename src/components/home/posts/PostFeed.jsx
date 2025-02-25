import React from "react";
import PostCard from "./PostCard";
import postsData from "./postData.json"; // Directly import JSON

const PostFeed = () => {
  return (
    <div>
      {postsData.map((post, index) => (
        <PostCard key={index} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
