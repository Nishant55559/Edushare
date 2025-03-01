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
function App(){
  const [showFab, setShowFab] = useState(false);

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
    return(
        <Router>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        <Route path="/notifications" element={<Notification />} />
        {/* <Route path="/projects" element={<Projects />} />
        <Route path="/messaging" element={<Messaging />} />
       
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
       {/* Scroll to Top FAB */}
       {showFab && (
        <button className="fab" onClick={scrollToTop}>
          <FaArrowUp size={24} />
        </button>
      )}
      <Footer/>
    </Router>
    );
    };



export default App
