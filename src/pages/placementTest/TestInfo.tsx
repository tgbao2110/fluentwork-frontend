import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TestInfo.module.css";
import api from "../../utils/api";

// Define the interfaces based on the API response.
interface TestTemplate {
  id: number;
  title: string;
  description: string;
  type: string;
  vocabulary_topic: string[];
  grammar_topic: string[];
  level: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: number;
  type: string;
  vocabulary_topic: string | null;
  grammar_topic: string | null;
  level: string;
  question_text: string;
  explanation: string;
  options: Option[];
}

interface TestQuestion {
  id: number;
  question: Question;
}

interface Duration {
  minutes: number;
}

interface TestData {
  id: number;
  testTemplate: TestTemplate;
  testMistakes: any[];
  testQuestions: TestQuestion[];
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

  // Fetch the test data using the API instance.
  useEffect(() => {
    api
      .get<TestData[]>("/tests/placement/me")
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          setTestData(data[0]);
        }
      })
      .catch((error) =>
        console.error("Error fetching test data from API:", error)
      );
  }, []);

  const handleStartTest = () => {
    if (testData) {
      navigate("/test", { state: { testData } });
    }
  };

  if (!testData) {
    return (
      <div className={styles.testInfoWrapper}>
        <div>Loading test details...</div>
      </div>
    );
  }

  const { testTemplate, testQuestions, duration } = testData;
  const { title, description } = testTemplate;
  const numberOfQuestions = testQuestions.length;
  const timeLimit = duration.minutes * 60;

  return (
    <div className={styles.testInfoWrapper}>
      <div className={styles.testCard}>
        <h1 className={styles.testHeading}>{title}</h1>
        <div className={styles.testMeta}>
          <span className={styles.label}>Creator:</span>
          <span className={styles.value}>Unknown</span>
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