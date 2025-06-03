import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/learning-path");
  };

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.left}>
        <h1 className={styles.title}>Start Your Learning Journey</h1>
        <h2 className={styles.with}>with</h2>
        <h1 className={styles.name}>FluentWork</h1>
        <button className={styles.startButton} onClick={handleStartClick}>
          START NOW ▶
        </button>
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <img src="/home.png" alt="Home" className={styles.image} />
      </div>
    </div>
  );
};

export default Home;
