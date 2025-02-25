import { useState } from 'react'
import './App.css'
import Home from './components/home/home';
import Network from './components/network/network';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App(){
    return(
        <Router>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/network" element={<Network />} />
        {/* <Route path="/projects" element={<Projects />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
    );
    };



export default App
