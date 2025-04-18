// CallScreen.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./CallScreen.css";

function CallScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get call type and participants from navigation state
  const { mode: callType = "video", participants = [] } = location.state || {};

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(callType === "video");
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: callType === "video",
      })
      .then((stream) => {
        if (!isMounted) return;
        setLocalStream(stream);
        if (videoRef.current && callType === "video") {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices", err);
        alert("Could not access media devices. Please check permissions.");
      });

    return () => {
      isMounted = false;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [callType]);

  const toggleMute = () => {
    const audioTrack = localStream?.getAudioTracks?.()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    const videoTrack = localStream?.getVideoTracks?.()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  const endCall = () => {
    localStream?.getTracks?.().forEach((track) => track.stop());
    alert("Call ended");

    // Navigate back to home or chat screen
    navigate("/");
  };

  return (
    <div className="call-screen">
      <div className="call-grid">
        <div className="participant">
          {callType === "video" ? (
            <video ref={videoRef} autoPlay muted playsInline />
          ) : (
            <div className="pfp-placeholder">You</div>
          )}
          <span className="label">You</span>
        </div>
        {participants.map((p, index) => (
          <div className="participant" key={index}>
            {callType === "video" ? (
              <div className="video-placeholder">{p.name[0]}</div>
            ) : (
              <div className="pfp-placeholder">{p.name[0]}</div>
            )}
            <span className="label">{p.name}</span>
          </div>
        ))}
      </div>

      <div className="call-controls">
        <button onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
        {callType === "video" && (
          <button
            onClick={toggleCamera}
            title={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
          >
            {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
        )}
        <button className="end-call" onClick={endCall} title="End Call">
          <FaPhoneSlash />
        </button>
      </div>
    </div>
  );
}

export default CallScreen;
