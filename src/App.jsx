import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import './App.css'
import Home from './components/home/home';
import Network from './components/network/network';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import NotificationBody from "./components/notification/notification_body";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./components/notification/notification";
import Login from "./components/login/login";
import { auth } from "./firebase"; // Import Firebase
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./components/messaging/ChatList";
import ChatScreen from "./components/messaging/ChatScreen";
import Profile from "./components/profile/profilehead";

function App() {
  const [showFab, setShowFab] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to show the FAB only when user scrolls down
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    });
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Router>
      {user ? (<>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/network" element={<Network />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messaging" element={
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "left", padding: "10px" }} >
              <ChatList />
              <ChatScreen />
            </div>
          } />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {/* Scroll to Top FAB */}
        {showFab && (
          <button className="fab" onClick={scrollToTop}>
            <FaArrowUp size={24} />
          </button>
        )}
        <Footer />
      </>) : (<Login />)}

    </Router>
  );
};

export default App
