import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useUser } from "../utils/UserContext";
import LevelBadge from "../components/LevelBadge";

const Navbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useUser();
  const [isTestsDropdownOpen, setTestsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const isValidLevel = (
    level: string
  ): level is "Beginner" | "Intermediate" | "Advanced" => {
    return ["Beginner", "Intermediate", "Advanced"].includes(level);
  };

  // Global click listener: close dropdowns when clicking anywhere on the document.
  useEffect(() => {
    const handleClickAnywhere = () => {
      setTestsDropdownOpen(false);
      setProfileDropdownOpen(false);
    };

    document.addEventListener("click", handleClickAnywhere);
    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []);

  // When the tests dropdown trigger is clicked, stop propagation, toggle tests dropdown and close the profile dropdown.
  const handleTestsTriggerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setTestsDropdownOpen((prev) => !prev);
    setProfileDropdownOpen(false); // close profile dropdown if open
  };

  // When the profile dropdown trigger is clicked, stop propagation, toggle profile dropdown and close tests dropdown.
  const handleProfileTriggerClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setProfileDropdownOpen((prev) => !prev);
    setTestsDropdownOpen(false); // close tests dropdown if open
  };

  // Handler for logout: stop propagation, log out and close profile dropdown.
  const handleLogout = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    logout();
    setProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.navLogo}>
          FluentWork
        </Link>
        <Link to="/learning-path" className={styles.navLink}>
          Learning Path
        </Link>
        <Link to="/lesson" className={styles.navLink}>
          Lessons
        </Link>
        <Link to="/flashcards" className={styles.navLink}>
          Flashcards
        </Link>
      </div>
      <div className={styles.navRight}>
        {isLoggedIn && user ? (
          <div className={styles.profileContainer}>
            <img
              className={styles.navProfilePic}
              src={user.picture || "/defaultProfile.png"}
              alt="Profile"
              onClick={handleProfileTriggerClick}
            />
            {isProfileDropdownOpen && (
              <div className={styles.profileDropdown}>
                <Link
                  to="/dashboard"
                  className={`${styles.dropdownItem} ${styles.dropdownUserName}`}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className={styles.userInfoWrapper}>
                    <span>{user.username}</span>
                    {isValidLevel(user.level) && (
                      <LevelBadge level={user.level} />
                    )}
                  </div>
                </Link>

                <Link
                  to="/results"
                  className={styles.dropdownItem}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Your Results
                </Link>
                <span
                  className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginButton}>
              Log In
            </Link>
            <Link to="/register" className={styles.registerButton}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
