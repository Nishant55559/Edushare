// Footer.jsx
import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>EduKollab</h2>
        </div>
        
        <div className="footer-links">
          <h3 style={{color:"white"}}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Home</li>
            <li>My Network</li>
            <li>Projects</li>
            <li>Messages</li>
          </ul>
        </div>

        <div className="footer-programs">
          <h3 style={{color:"white"}}>Programs</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>find peer</li>
            <li>Large Projects</li>
          </ul>
        </div>

        <div className="footer-resources">
          <h3 style={{color:"white"}}>Resources</h3>
          <ul style={{ listStyle: 'none' ,padding:0}}>
            <li>FAQ</li>
            <li>Figma Template</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3 style={{color:"white"}}>Newsletter</h3>
          <p style={{color:"white"}}>Subscribe to our newsletter for updates.</p>
          <div className="footer-newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button onClick={()=>signOut(auth)}>➤</button>
          </div>
          <div className="footer-social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
