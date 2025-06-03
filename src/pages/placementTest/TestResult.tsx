import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TestResult.module.css";

interface TestResultData {
  level: string;
  message: string;
  score: number;
}

const TestResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resultDataFromNavigation = location.state?.result as
    | TestResultData
    | undefined;

  const fakeData: TestResultData = {
    level: "Beginner",
    message: "Placement test submitted and level assigned.",
    score: 4,
  };

  const resultData: TestResultData = resultDataFromNavigation ?? fakeData;
  console.log("Result Data:", resultData);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftSection}>
        <h3 className={styles.congratulations}>
          Congratulations! Your score is:
        </h3>
        <div className={styles.resultNumber}>
          <span className={styles.resultNumberCircle}>{resultData.score}</span>
        </div>
        <p className={styles.resultText}>
          Proceed to the next lesson or discover our flashcards for a quick
          break
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/learning-path");
            }}
          >
            Next Lesson
          </button>
          <button
            className={styles.breakButton}
            onClick={() => {
              navigate("/flashcards");
            }}
          >
            Take a Break
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
