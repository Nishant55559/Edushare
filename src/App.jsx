import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import './App.css'
import Home from './components/home/home';
import Network from './components/network/network';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Notification from "./components/notification/notification";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProfileHead from "./components/profile/profilehead";
import MyProject from "./components/profile/MyProject";
import AllProjects from "./components/project/All_projects";
import Messaging from "./components/messaging/Messaging";
import { NavProvider } from "./NavContext";
import { SearchProvider } from "./SearchContext";
import { LoginForm } from "./components/ui/login-form";
import { SignupForm } from "./components/ui/signup-form";
import CallScreen from "./components/messaging/CallScreen";

const spinnerStyle = {
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
};

function App() {
  const [showFab, setShowFab] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      <AppContent user={user} showFab={showFab} scrollToTop={scrollToTop} />
    </Router>
  );
}

function AppContent({ user, showFab, scrollToTop }) {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/sign-up";

  return (
    <NavProvider>
      <SearchProvider>
        {user ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/network" element={<Network />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/call" element={<CallScreen />} />
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
        ) : isSignUpPage ? (
          <div className="flex flex-col justify-center items-center w-screen min-h-screen">
            <SignupForm />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-screen min-h-screen">
            <LoginForm />
          </div>
        )}
      </SearchProvider>
    </NavProvider>
  );
}

export default App;
