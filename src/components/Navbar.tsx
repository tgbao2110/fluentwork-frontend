import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useUser } from "../utils/UserContext";

const Navbar: React.FC = () => {
  const { userName, profilePicUrl, isLoggedIn } = useUser();
  const [isTestsDropdownOpen, setTestsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <a href="/" className={styles.navLogo}>FluentWork</a>
        <a href="/" className={styles.navLink}>Home</a>

        {/* Tests Dropdown */}
        <div 
          className={styles.navDropdownTrigger} 
          onClick={() => setTestsDropdownOpen(!isTestsDropdownOpen)}
        >
          Tests
          {isTestsDropdownOpen && (
            <div className={styles.navDropdown}>
              <a href="/test-info" className={styles.dropdownItem}>Vocabulary</a>
              <a href="/test-info" className={styles.dropdownItem}>Grammar</a>
              <a href="/test-info" className={styles.dropdownItem}>Mix</a>
            </div>
          )}
        </div>

        <a href="/flashcards" className={styles.navLink}>Flashcards</a>
        <a href="/results" className={styles.navLink}>Results</a>
      </div>

      <div className={styles.navRight}>
        {isLoggedIn ? (
          // Profile Dropdown
          <div className={styles.profileContainer}>
            <img 
              className={styles.navProfilePic} 
              src={profilePicUrl} 
              alt="Profile" 
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            />
            {isProfileDropdownOpen && (
              <div className={styles.profileDropdown}>
                <a href="/profile" className={styles.dropdownItem}>Profile</a>
                <a href="/settings" className={styles.dropdownItem}>Settings</a>
                <a href="/logout" className={styles.dropdownItem}>Logout</a>
              </div>
            )}
          </div>
        ) : (
          // Login & Register Buttons
          <div className={styles.authButtons}>
            <a href="/login" className={styles.loginButton}>Log In</a>
            <a href="/register" className={styles.registerButton}>Register</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;