import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function ChatList({ setSelectedUser }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const q = query(collection(db, "users"), where("uid", "!=", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setUsers(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchChats();
  }, []);

  return (
    <div className="chat-list">
      <h2>CHATS</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="user-list">
        {users
          .filter(user => user.email.toLowerCase().includes(search.toLowerCase()))
          .map(user => (
            <div key={user.uid} className="user-item" onClick={() => setSelectedUser(user)}>
              <img src={user.pfp} alt="pfp" className="user-avatar" />
              <span>{user.email}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatList;
