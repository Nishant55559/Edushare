import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import './chats.css'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import PropTypes from 'prop-types';

function ChatList({ setSelectedUser, selectedUser }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, "users"), where("uid", "!=", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setUsers(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchUsers();
  }, []);

  // Listen for recent conversations
  useEffect(() => {
    const fetchRecentChats = async () => {
      // Get all conversations where current user is involved
      const conversationsQuery = query(
        collection(db, "conversations"),
        where("participants", "array-contains", auth.currentUser.uid),
        orderBy("lastMessage.timestamp", "desc")
      );

      const unsubscribe = onSnapshot(conversationsQuery, async (snapshot) => {
        const chats = [];
        for (const doc of snapshot.docs) {
          const data = doc.data();
          // Get the other user's ID
          const otherUserId = data.participants.find(id => id !== auth.currentUser.uid);
          
          // Get other user's details
          const userDoc = await getDocs(query(
            collection(db, "users"),
            where("uid", "==", otherUserId)
          ));
          
          if (!userDoc.empty) {
            chats.push({
              ...userDoc.docs[0].data(),
              lastMessage: data.lastMessage
            });
          }
        }
        setRecentChats(chats);
      });

      return unsubscribe;
    };

    fetchRecentChats();
  }, []);

  const filteredUsers = [...users, ...recentChats]
    .filter((user, index, self) => 
      index === self.findIndex((t) => t.uid === user.uid) &&
      user.email.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    console.log('ChatList mounted with props:', {
      hasSetSelectedUser: typeof setSelectedUser === 'function',
      selectedUser
    });
  }, []);

  const handleUserSelect = (user) => {
    console.log("ChatList - Attempting to select user:", user);
    console.log("ChatList - setSelectedUser type:", typeof setSelectedUser);
    
    if (typeof setSelectedUser === 'function') {
      setSelectedUser(user);
    } else {
      console.error('setSelectedUser is not a function:', setSelectedUser);
    }
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>CHATS</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="user-list">
        {filteredUsers.map(user => (
          <div 
            key={user.uid} 
            className={`user-item ${selectedUser?.uid === user.uid ? 'active' : ''}`}
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-avatar">
              {user.profilePic ? (
                <img src={user.profilePic} alt="profile" />
              ) : (
                <div className="default-avatar">{user.email[0].toUpperCase()}</div>
              )}
            </div>
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              {user.lastMessage && (
                <span className="last-message">
                  {user.lastMessage.text.substring(0, 30)}
                  {user.lastMessage.text.length > 30 ? '...' : ''}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ChatList.propTypes = {
  setSelectedUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.object
};

export default ChatList;
