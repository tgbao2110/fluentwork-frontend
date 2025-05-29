import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useUser } from "../ultils/UserContext";


const Navbar: React.FC = () => {
  const { userName, profilePicUrl } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <a href="/" className={styles.navLogo}>FluentWork</a>
        <a href="/" className={styles.navLink}>Home</a>
        <div 
          className={styles.navDropdownTrigger} 
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          Tests
          {isDropdownOpen && (
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
        <span className={styles.navUsername}>{userName}</span>
        <img className={styles.navProfilePic} src={profilePicUrl} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;