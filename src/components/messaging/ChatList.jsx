import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import './chats.css';
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("uid"));
        const querySnapshot = await getDocs(q);
        const allUsers = querySnapshot.docs
          .map(doc => doc.data())
          .filter(user => user.uid !== auth.currentUser.uid);
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRecentChats = async () => {
      const conversationsQuery = query(
        collection(db, "conversations"),
        where("participants", "array-contains", auth.currentUser.uid),
        orderBy("lastMessage.timestamp", "desc")
      );

      const unsubscribe = onSnapshot(conversationsQuery, async (snapshot) => {
        const chats = [];
        for (const doc of snapshot.docs) {
          const data = doc.data();
          const otherUserId = data.participants.find(id => id !== auth.currentUser.uid);
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

  const handleUserSelect = (user) => {
    console.log(typeof setSelectedUser);
      setSelectedUser(user);
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

// ChatList.propTypes = {
//   setSelectedUser: PropTypes.func.isRequired,
//   selectedUser: PropTypes.object
// };

export default ChatList;