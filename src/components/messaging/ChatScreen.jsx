import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import Peer from 'peerjs';
import './chats.css'

function ChatScreen({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [calling, setCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [stream, setStream] = useState(null);
  const [callType, setCallType] = useState(null);
  const [callStatus, setCallStatus] = useState('');
  const [incomingCallData, setIncomingCallData] = useState(null);

  const peerRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const currentCallRef = useRef(null);
  const audioRef = useRef(null);

  // Get or create conversation ID between two users
  useEffect(() => {
    const getOrCreateConversation = async () => {
      if (!selectedUser?.uid) return;

      // Create a unique conversation ID by sorting UIDs
      const uids = [auth.currentUser.uid, selectedUser.uid].sort();
      const conversationId = `${uids[0]}_${uids[1]}`;
      setConversationId(conversationId);

      // Listen for messages in this conversation
      const messagesRef = collection(db, "conversations", conversationId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });

      return unsubscribe;
    };

    getOrCreateConversation();
  }, [selectedUser]);

  // Initialize PeerJS with specific configuration
  useEffect(() => {
    const initializePeer = () => {
      if (!selectedUser?.uid) {
        console.log("undefined uid")
        return};
      const peerId = `${auth.currentUser.uid}-${Math.random().toString(36).substr(2, 9)}`;
      const peer = new Peer(peerId, {
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { 
              urls: "turn:numb.viagenie.ca",
              username: "webrtc@live.com",
              credential: "muazkh"
            }
          ]
        },
        debug: 3 // Enable detailed debug logs
      });

      peer.on('open', (id) => {
        console.log('Peer connected with ID:', id);
        updateDoc(doc(db, "users", auth.currentUser.uid), {
          peerId: id
        });
      });

      peer.on('error', (err) => {
        console.error('PeerJS error:', err);
        setCallStatus('Connection error');
        cleanup();
      });

      peerRef.current = peer;
    };

    initializePeer();
    return () => peerRef.current?.destroy();
  }, []);

  // Handle incoming calls
  useEffect(() => {
    if (!peerRef.current) return;

    const handleIncomingCall = async (call) => {
      try {
        console.log('Incoming call received', call);
        setIncomingCall(true);
        setCallStatus('Incoming call...');
        
        // Store call data for the notification
        setIncomingCallData({
          call,
          isVideo: call.metadata?.isVideo || false
        });
        
        // Play audio indicator for incoming call
        if (!audioRef.current) {
          audioRef.current = new Audio('/path-to-your-ringtone.mp3');
          audioRef.current.loop = true;
          audioRef.current.play().catch(console.error);
        }

        // Clean up if call is not answered
        call.on('close', () => {
          console.log('Call closed');
          setCallStatus('Call ended');
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }
          cleanup();
        });

      } catch (err) {
        console.error('Error in handling incoming call:', err);
        setCallStatus('Failed to connect');
        cleanup();
      }
    };

    peerRef.current.on('call', handleIncomingCall);
    
    return () => {
      if (peerRef.current) {
        peerRef.current.off('call', handleIncomingCall);
      }
    };
  }, []);

  const acceptCall = async () => {
    try {
      if (!incomingCallData) return;
      
      const { call, isVideo } = incomingCallData;
      console.log('Accepting call, isVideo:', isVideo);
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: isVideo
      });
      
      setStream(stream);
      setCallType(isVideo ? 'video' : 'audio');
      setCalling(true);
      setIncomingCall(false);  // Change this to false as we're now in an active call
      
      // Stop ringtone
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Display local video stream if it's a video call
      if (isVideo && localVideoRef.current) {
        console.log('Setting local video stream for receiver');
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch(console.error);
      }

      // Answer the call with our stream
      call.answer(stream);
      currentCallRef.current = call;

      // Handle the remote stream
      call.on('stream', (remoteStream) => {
        console.log('Received remote stream in acceptCall:', remoteStream.getTracks());
        
        if (isVideo && remoteVideoRef.current) {
          console.log('Setting remote video stream for receiver');
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play().catch(console.error);
        } else {
          // For audio calls
          const audioElement = new Audio();
          audioElement.srcObject = remoteStream;
          audioElement.play().catch(console.error);
        }
        
        setCallStatus('Connected');
      });

      setIncomingCallData(null);

    } catch (err) {
      console.error('Error accepting call:', err);
      setCallStatus('Failed to connect');
      cleanup();
    }
  };

  const declineCall = () => {
    if (incomingCallData) {
      incomingCallData.call.close();
    }
    
    // Stop ringtone
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    cleanup();
  };

  const startCall = async (isVideo) => {
    if (!selectedUser?.uid) {
      console.log("undefined uid")
      return;
    }
    
    try {
      setCallStatus('Initiating call...');
      setCalling(true);
      setCallType(isVideo ? 'video' : 'audio');

      // Get media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: isVideo
      });
      
      console.log('Local stream obtained:', stream.getTracks());
      setStream(stream);

      // Display local video stream if it's a video call
      if (isVideo && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch(console.error);
      }

      // Get recipient's peer ID
      const recipientDoc = await getDoc(doc(db, "users", selectedUser.uid));
      const recipientPeerId = recipientDoc.data()?.peerId;

      if (!recipientPeerId) {
        throw new Error('Recipient not available');
      }

      // Store call information
      await setDoc(doc(db, "calls", selectedUser.uid), {
        from: auth.currentUser.uid,
        type: isVideo ? 'video' : 'audio',
        timestamp: serverTimestamp()
      });

      // Make the call with metadata
      const call = peerRef.current.call(recipientPeerId, stream, {
        metadata: { isVideo }
      });
      currentCallRef.current = call;

      // Handle the remote stream
      call.on('stream', (remoteStream) => {
        console.log('Caller received remote stream:', remoteStream.getTracks());
        
        if (isVideo && remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play().catch(console.error);
        } else {
          // For audio calls
          const audioElement = new Audio();
          audioElement.srcObject = remoteStream;
          audioElement.play().catch(console.error);
        }
        
        setCallStatus('Connected');
      });

      // Handle call closure
      call.on('close', () => {
        console.log('Call closed');
        setCallStatus('Call ended');
        cleanup();
      });

      // Handle call errors
      call.on('error', (err) => {
        console.error('Call error:', err);
        setCallStatus('Call error');
        cleanup();
      });

    } catch (error) {
      console.error('Error in startCall:', error);
      setCallStatus('Failed to start call');
      cleanup();
    }
  };

  const cleanup = () => {
    console.log('Cleaning up call resources');
    
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('Stopping track:', track.kind);
        track.stop();
      });
    }
    
    if (currentCallRef.current) {
      currentCallRef.current.close();
    }
    
    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    
    // Remove call information from Firebase
    if (selectedUser?.uid) {
      deleteDoc(doc(db, "calls", selectedUser.uid)).catch(console.error);
    }
    deleteDoc(doc(db, "calls", auth.currentUser.uid)).catch(console.error);

    setStream(null);
    setCalling(false);
    setIncomingCall(false);
    setCallType(null);
    setCallStatus('');
    setIncomingCallData(null);
  };

  const sendMessage = async () => {
    if (!selectedUser?.uid) {
      console.log("undefined uid")
      return;
    }
    
    if (!input.trim() || !conversationId) return;

    try {
      // Add message to the conversation
      await addDoc(collection(db, "conversations", conversationId, "messages"), {
        text: input,
        sender: auth.currentUser.uid,
        senderEmail: auth.currentUser.email,
        receiver: selectedUser.uid,
        timestamp: serverTimestamp(),
      });

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-header">
        {selectedUser?.profilePic && (
          <img src={selectedUser.profilePic} alt="pfp" className="chat-avatar" />
        )}
        <span>{selectedUser?.email}</span>
        <div className="chat-header-buttons">
          <button 
            className="chat-icon-button"
            onClick={() => startCall(false)}
            disabled={calling || incomingCall}
          >📞</button>
          <button 
            className="chat-icon-button"
            onClick={() => startCall(true)}
            disabled={calling || incomingCall}
          >📹</button>
        </div>
      </div>

      {incomingCallData && !calling && (
        <div className="call-notification">
          <div className="call-notification-content">
            <div className="caller-info">
              <h3>Incoming {incomingCallData.isVideo ? 'Video' : 'Audio'} Call</h3>
              <p>From: {selectedUser?.email}</p>
            </div>
            <div className="call-actions">
              <button 
                className="accept-call-button"
                onClick={acceptCall}
              >
                Accept
              </button>
              <button 
                className="decline-call-button"
                onClick={declineCall}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {((calling || incomingCall) && callType === 'video') && (
        <div className="call-container">
          <div className="call-status-indicator">
            {callStatus}
          </div>
          
          <div className="video-container">
            <video
              ref={remoteVideoRef}
              className="remote-video"
              autoPlay
              playsInline
            />
            <video
              ref={localVideoRef}
              className="local-video"
              autoPlay
              playsInline
              muted
            />
          </div>

          <div className="call-controls">
            <button onClick={cleanup} className="end-call-button">
              End Call
            </button>
          </div>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.sender === auth.currentUser.uid ? "sent" : "received"}`}
          >
            <div className="message-content">
              {msg.text}
            </div>
            <div className="message-timestamp">
              {msg.timestamp?.toDate().toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
}

export default ChatScreen;