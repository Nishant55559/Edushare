
import "./Footer.css"; 
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & University Name */}
        <div className="footer-section">
          <h2 className="footer-logo">EduKollab</h2>
          
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">My Network</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Messages</a></li>
          </ul>
        </div>

        {/* Programs */}
        <div className="footer-section">
          <h3>Programs</h3>
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#">find peer</a></li>
            <li><a href="#">Large Projects</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Figma Template</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for updates.</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button style={{borderRadius: "90px"}}>&gt;</button>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

      

      {/* Scroll to Top Button */}
      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ⬆
      </button>
    </footer>
  );
};

export default Footer;
