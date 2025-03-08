import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';

function Messaging() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    console.log("Selecting user:", user);
    setSelectedUser(user);
  };

  return (
    <div className="messaging-container">
      <ChatList 
        selectedUser={selectedUser} 
        setSelectedUser={handleUserSelect} 
      />
      {selectedUser && (
        <ChatScreen 
          selectedUser={selectedUser} 
        />
      )}
    </div>
  );
}

export default Messaging; 