import React, { use, useState } from 'react';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';

function Messaging() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messaging-container">
      <ChatList 
        setSelectedUser={setSelectedUser} 
        selectedUser={selectedUser} 
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