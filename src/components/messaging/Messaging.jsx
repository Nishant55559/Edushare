// Messaging.jsx
import React, { useState, useEffect } from "react";
import ChatScreen from "./ChatScreen";
import "./ChatScreen.css";

const usersMock = [
  {
    uid: "user1",
    email: "alice@example.com",
    peerId: "user1-peer"
  },
  {
    uid: "user2",
    email: "bob@example.com",
    peerId: "user2-peer"
  },
];

function Messaging() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messaging-container">
      <div className="sidebar">
        <h2>Users</h2>
        {usersMock.map((user) => (
          <div
            key={user.uid}
            className={`sidebar-user ${selectedUser?.uid === user.uid ? "active" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            {user.email}
          </div>
        ))}
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <ChatScreen user={selectedUser} />
        ) : (
          <div className="empty-chat">Open a chat to start messaging</div>
        )}
      </div>
    </div>
  );
}

export default Messaging;
