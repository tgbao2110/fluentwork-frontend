import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "./TestResult.module.css";

interface TestResultData {
  level: string;
  message: string;
  score: number;
}

const TestResultPage: React.FC = () => {
  const location = useLocation();

  // Attempt to retrieve result data passed via navigation state.
  const resultDataFromNavigation = location.state?.result as TestResultData | undefined;

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
      <div className={styles.resultCard}>
        <h1 className={styles.resultTitle}>Test Results</h1>
        {usingFakeData && (
          <p style={{ color: "red" }}>
            No result data provided. Displaying fake data.
          </p>
        )}
        <p className={styles.resultMessage}>{resultData.message}</p>
        <p className={styles.resultLevel}>
          Level Assigned: <strong>{resultData.level}</strong>
        </p>
        <p className={styles.resultScore}>
          Score: <strong>{resultData.score}</strong>
        </p>
      </div>
    </div>
  );
};

export default TestResultPage;