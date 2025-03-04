import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

function ChatScreen({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!selectedUser?.uid) return;
    const messagesRef = collection(db, "users", selectedUser.uid, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "users", selectedUser.uid, "messages"), {
        text: input,
        sender: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (<>
    {selectedUser && (<div className="chat-screen">
      <div className="chat-header">
        {selectedUser?.profilePic && (
          <img src={selectedUser.profilePic} alt="pfp" className="chat-avatar" />
        )}
        <span>{selectedUser?.name}</span>
        <div className="chat-header-buttons">
          <button className="chat-icon-button">📞</button>
          <button className="chat-icon-button">📹</button>
          <button className="chat-icon-button">⋮</button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender === auth.currentUser.uid ? "message sent" : "message received"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage} className="send-button">➤</button>
      </div>
    </div>)}
    </>
  );
}

export default ChatScreen;
