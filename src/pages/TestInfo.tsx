import React from "react";
import styles from"./TestInfo.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const TestInfoPage: React.FC = () => {
  const navigate = useNavigate();
  // Test details
  const testName = "Vocabulary Test About ABC";
  const creator = "userasdasd";
  const description =
    "This is a function named handleFinish that, when called, displays an alert box with a message indicating that the test .";
  const numberOfQuestions = 15;
  const timeLimit = 600; // seconds

  const handleStartTest = () => {
    navigate("/test");
  };

  return (
    <div>
        <Navbar userName="User Name" profilePicUrl="https://via.placeholder.com/150" />
    <div className={styles.testInfoWrapper}>
      <div className={styles.testCard}>
        <h1 className={styles.testHeading}>{testName}</h1>

        <div className={styles.testMeta}>
          <span className={styles.label}>Creator:</span>
          <span className={styles.value}>{creator}</span>
        </div>

        <p className={styles.testDescription}>{description}</p>

        <div className={styles.testStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{numberOfQuestions}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{timeLimit / 60} </span>
            <span className={styles.statLabel}>Minutes</span>
          </div>
        </div>

        <button className={styles.startBtn} onClick={handleStartTest}>
          Start Test
        </button>
      </div>
    </div>
    </div>
  );
};

export default TestInfoPage;
