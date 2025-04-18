import React, { useState, useEffect } from "react";
import ChatScreen from "./ChatScreen";
import "./ChatScreen.css";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";

function Messaging() {
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);

      const filteredUsers = querySnapshot.docs
        .filter(doc => doc.id !== currentUser?.uid)
        .map(doc => ({
          uid: doc.id,
          ...doc.data(),
        }));

      setUsersList(filteredUsers);
    }

    fetchUsers();
  }, []);

  return (
    <div className="messaging-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Users</h2>
        </div>
        {usersList.map((user) => (
          <div
            key={user.uid}
            className={`sidebar-user ${selectedUser?.uid === user.uid ? "active" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
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