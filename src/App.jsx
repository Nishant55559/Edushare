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
import ProfileHead from "./components/profile/profilehead";
import MyProject from "./components/profile/MyProject";
import AllProjects from "./components/project/All_projects";
import Messaging from "./components/messaging/Messaging";
import { NavProvider } from "./NavContext";
// Spinner CSS
const spinnerStyle = {
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw", // <-- Add this
};

function App() {
  const [showFab, setShowFab] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false); // Stop loading once we get the user status
    });

    return () => unsubscribe();
  }, []);

  // Show FAB only on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={spinnerStyle}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
   
    <Router>
       <NavProvider>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/network" element={<Network />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/notifications" element={<Notification />} />
            <Route
              path="/messaging"
              element={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "left",
                    padding: "10px",
                  }}
                >
                  <Messaging />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <ProfileHead />
                  <MyProject />
                </>
              }
            />
          </Routes>
          {showFab && (
            <button className="fab" onClick={scrollToTop}>
              <FaArrowUp size={24} />
            </button>
          )}
          <Footer />
        </>
      ) : (
        <Login />
      )}
      </NavProvider>
    </Router>
    
  );
}

export default App
