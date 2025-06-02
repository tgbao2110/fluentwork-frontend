import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TestInfo.module.css";
import api from "../../utils/api";

// --- 1. Define interfaces for the raw API response ---
interface TestTemplateApi {
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

interface OptionApi {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuestionApi {
  questionId: number;
  questionText: string;
  explanation: string;
  options: OptionApi[];
  selectedOptionId: number | null;
  isCorrect: boolean;
}

interface RawTestData {
  testId: number;
  testDate: string;
  score: number;
  isSubmitted: boolean;
  level: string;
  duration: { minutes: number };
  template: TestTemplateApi;
  questions: QuestionApi[];
}

// --- 2. Define your app’s interfaces (which test.tsx expects) ---
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
  type: string; // API did not provide a specific type, so we'll default to empty string
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

// --- 3. The TestInfoPage component ---
const TestInfoPage: React.FC = () => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Notice we use the RawTestData type here
    api
      .get<RawTestData>("/tests/placement/me")
      .then((response) => {
        const rawData = response.data;
        // map the raw response into our interface that test.tsx expects:
        const adaptedTestData: TestData = {
          id: rawData.testId,
          test_date: rawData.testDate,
          score: rawData.score,
          is_submitted: rawData.isSubmitted,
          level: rawData.level,
          duration: rawData.duration,
          testMistakes: [],
          total_correct_answer: 0,
          total_incorrect_answer: 0,
          // Map the template directly – keys match for our purposes.
          testTemplate: rawData.template,
          // Transform questions array:
          testQuestions: rawData.questions.map((q) => ({
            id: q.questionId,
            question: {
              id: q.questionId,
              type: "", // since the API response doesn’t include a type, default to empty
              vocabulary_topic: null,
              grammar_topic: null,
              level: rawData.level,
              question_text: q.questionText,
              explanation: q.explanation,
              options: q.options.map((opt) => ({
                id: opt.id,
                option_text: opt.text,
                is_correct: opt.isCorrect,
              })),
            },
          })),
        };

        setTestData(adaptedTestData);
      })
      .catch((error) =>
        console.error("Error fetching test data from API:", error)
      );
  }, []);

  const handleStartTest = () => {
    if (testData) {
      // Pass the adapted testData to the test page
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