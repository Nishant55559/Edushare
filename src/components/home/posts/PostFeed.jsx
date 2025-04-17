import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useSearch } from "../../../SearchContext";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (searchTerm.trim() === "") {
          // 🔄 Fetch from Firestore
          const { collection, getDocs } = await import("firebase/firestore");
          const { db } = await import("../../../firebase");

          const querySnapshot = await getDocs(collection(db, "Projects"));
          const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setPosts(docs);
        } else {
          // 🤖 Fetch from backend recommendation
          const interestsArray = searchTerm
            .split(",")
            .map((term) => term.trim().toLowerCase())
            .filter((term) => term.length > 0);

          const response = await axios.post("https://backend-oybr.onrender.com/recommend", {
            interests: interestsArray,
          });

          const backendPosts = response.data.posts || [];
          const normalizedPosts = backendPosts.map((post) => ({
            id: post.id,
            data: {
              Name: post.name, // You can modify this if backend provides user name
              Title: post.title,
              Describe: post.description,
              Domain: post.domain,
              Tools: post.tools,
              similarity_score: post.similarity_score,
            },
          }));
          setPosts(normalizedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [searchTerm]);

  if (loading) return <p>Loading posts...</p>;
  // if (!loading && posts.length === 0) return <p>No projects found.</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} data={post.data} docId={post.id} />
      ))}
    </div>
  );
};

export default PostFeed;
