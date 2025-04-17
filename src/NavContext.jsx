import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  // Sync activeTab with URL on location change
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveTab("Home");
        break;
      case "/network":
        setActiveTab("Network");
        break;
      case "/projects":
        setActiveTab("Projects");
        break;
      case "/notifications":
        setActiveTab("Notifications");
        break;
      case "/messaging":
        setActiveTab("Messaging");
        break;
      case "/profile":
        setActiveTab("Profile");
        break;
      default:
        setActiveTab(""); // or null
    }
  }, [location.pathname]);

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
