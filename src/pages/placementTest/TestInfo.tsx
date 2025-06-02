import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./TestInfo.module.css";
import api from "../../utils/api";

interface OptionApi {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuestionApi {
  id: number;
  question: {
    id: number;
    type: string;
    vocabulary_topic: string | null;
    grammar_topic: string | null;
    level: string;
    question_text: string;
    explanation: string;
    options?: OptionApi[];
  };
}

interface Duration {
  minutes: number;
}

interface TestData {
  id: number;
  testQuestions: QuestionApi[];
  score: number;
  level: string;
  duration: Duration;
  test_date: string;
  total_correct_answer: number;
  total_incorrect_answer: number;
  is_submitted: boolean;
}

const TestInfoPage: React.FC = () => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.testId;

  useEffect(() => {
    if (!testId) {
      console.error("No test ID provided. Redirecting...");
      navigate("/dashboard"); // Redirect to dashboard if no test ID
      return;
    }

    api.get(`/tests/${testId}`)
      .then((response) => {
        if (!response.data) {
          throw new Error("API returned no data.");
        }

        const rawData = response.data;

        if (!rawData.testQuestions || rawData.testQuestions.length === 0) {
          throw new Error("API response missing 'testQuestions' field.");
        }

        const adaptedTestData: TestData = {
          id: rawData.id,
          testQuestions: rawData.testQuestions,
          score: rawData.score,
          level: rawData.level,
          duration: rawData.duration,
          test_date: rawData.test_date,
          total_correct_answer: rawData.total_correct_answer,
          total_incorrect_answer: rawData.total_incorrect_answer,
          is_submitted: rawData.is_submitted,
        };

        setTestData(adaptedTestData);
      })
      .catch((error) => {
        console.error("Error fetching test data:", error);
      });
  }, [testId]);

  const handleStartTest = () => {
    if (testData) {
      navigate("/test", { state: { testId: testData.id } });
    }
  };

  if (!testData) {
    return <div className={styles.testInfoWrapper}>Loading test details...</div>;
  }

  // Dynamically generate test information
  const title = "Custom Test"; // Placeholder title
  const description = "This test contains multiple questions covering different topics.";
  const numberOfQuestions = testData.testQuestions.length;
  const timeLimit = testData.duration.minutes * 60;

  return (
    <div className={styles.testInfoWrapper}>
      <div className={styles.testCard}>
        <h1 className={styles.testHeading}>{title}</h1>
        <div className={styles.testMeta}>
          <span className={styles.label}>User Level:</span>
          <span className={styles.value}>{testData.level}</span>
        </div>
        <p className={styles.testDescription}>{description}</p>
        <div className={styles.testStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{numberOfQuestions}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{timeLimit / 60}</span>
            <span className={styles.statLabel}>Minutes</span>
          </div>
        </div>
        <button className={styles.startBtn} onClick={handleStartTest}>
          Start Test
        </button>
      </div>
    </div>
  );
};

export default TestInfoPage;