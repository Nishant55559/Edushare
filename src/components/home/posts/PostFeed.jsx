import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import postsData from "./postData.json"; // Directly import JSON
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "Projects"));
      const docs = querySnapshot.docs;
      setPosts(docs);
    };

    fetchPosts();
  }, []);
  return (
    <div>
      {posts.map((doc) => (
        <PostCard key={doc.id} data={doc.data()} docId={doc.id}  />
      ))}
    </div>
  );
};

export default PostFeed;
