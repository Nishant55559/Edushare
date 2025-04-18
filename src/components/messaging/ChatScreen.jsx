// ChatScreen.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaPhone, FaVideo, FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import "./ChatScreen.css";
import { collection, addDoc, serverTimestamp,query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path to your Firebase config
import { useNavigate } from "react-router-dom";
function ChatScreen({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!user?.uid) return;
  
    const q = query(
      collection(db, "chats", user.uid, "messages"),
      orderBy("timestamp", "asc")
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });
  
    return () => unsubscribe(); // cleanup on unmount or user change
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMsg = {
      sender: "me", // you can use actual uid/email here
      text: input,
      timestamp: serverTimestamp(),
    };
  
    setMessages((prev) => [...prev, { ...newMsg, id: Date.now() }]); // optimistic update
    setInput("");
  
    try {
      await addDoc(
        collection(db, "chats", user.uid, "messages"), // e.g., messages subcollection under user
        newMsg
      );
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };
  

  const navigate = useNavigate();
  
  const startAudioCall = () => {
    // Navigate to CallScreen with audio mode and participants list
    navigate("/call", {
      state: {
        mode: "audio",
        participants: [
          {
            name: user.displayName || user.email.split("@")[0],
            email: user.email,
            id: user.uid,
          },
        ],
      },
    });
  };
  
  const startVideoCall = () => {
    // Navigate to CallScreen with video mode and participants list
    navigate("/call", {
      state: {
        mode: "video",
        participants: [
          {
            name: user.displayName || user.email.split("@")[0],
            email: user.email,
            id: user.uid,
          },
        ],
      },
    });
  };
  

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <div className="user-info">
          <strong>{user.email}</strong>
        </div>
        <div className="chat-actions">
          <button onClick={startAudioCall} title="Audio Call">
            <FaPhone />
          </button>
          <button onClick={startVideoCall} title="Video Call">
            <FaVideo />
          </button>
          <button title="More Options">
            <FaEllipsisV />
          </button>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-msg ${msg.sender === "me" ? "my-msg" : "their-msg"}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
