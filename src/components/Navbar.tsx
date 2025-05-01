import React from "react";
import "./Navbar.css";

interface NavbarProps {
  userName: string;
  profilePicUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, profilePicUrl }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="nav-logo">FluentWork</a>
        <a href="/home" className="nav-link">Home</a>
        <a href="/lessons" className="nav-link">Lessons</a>
        <a href="/results" className="nav-link">Results</a>
      </div>
      <div className="nav-right">
        <span className="nav-username">{userName}</span>
        <img className="nav-profile-pic" src={profilePicUrl} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
