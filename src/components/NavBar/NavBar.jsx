import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">SocialApp</div>
        <button className="navbar-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <a href="#" className="navbar-icon">
            <FaHome />
          </a>
          <a href="#" className="navbar-icon">
            <FaSearch />
          </a>
          <a href="#" className="navbar-icon">
            <FaBell />
          </a>
          <a href="#" className="navbar-icon">
            <FaEnvelope />
          </a>
          <a href="#" className="navbar-icon">
            <FaUserCircle />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
