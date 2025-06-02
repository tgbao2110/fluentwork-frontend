import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TestResult.module.css";

interface TestResultData {
  level: string;
  message: string;
  score: number;
}

const TestResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Attempt to retrieve result data passed via navigation state.
  const resultDataFromNavigation = location.state?.result as
    | TestResultData
    | undefined;

  // Create fake data if no result data is provided.
  const fakeData: TestResultData = {
    level: "Beginner",
    message: "Placement test submitted and level assigned.",
    score: 4,
  };

  // Use the provided result data; fall back to fakeData if necessary.
  const resultData: TestResultData = resultDataFromNavigation ?? fakeData;
  const usingFakeData = !resultDataFromNavigation;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftSection}>
        <h3 className={styles.congratulations}>Congratulations! Your score is:</h3>
        <div className={styles.resultNumber}>
          <span className={styles.resultNumberCircle}>{resultData.score}</span>
        </div>
        <p className={styles.resultLevel}>
          Your current Level is: <strong>{resultData.level}</strong>
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.resultCard}>
          <h1 className={styles.resultTitle}>What’s Next?</h1>
          <img src="/result.png" alt="result" className={styles.resultImage} />
          <p className={styles.resultMessage}>Your personalized roadmap has been carefully crafted to align with your current level, ensuring that each step supports your learning journey. </p>
          <button className={styles.button} onClick={() => {navigate('/learning-path')}}>Let's take a look</button>
        </div>
        </div>
      </div>
  );
};

export default TestResultPage;
