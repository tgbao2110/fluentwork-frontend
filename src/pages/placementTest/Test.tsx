import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Test.module.css";
import Clock from "../../components/Clock";  // Adjust the path as needed
import api from "../../utils/api";              // Import the API instance

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

const TestPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Always initialize testData from the router state.
  const initialTestData: TestData | null = location.state?.testData || null;
  const [testData] = useState<TestData | null>(initialTestData);

  // Initialize our other hooks unconditionally.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    testData ? Array(testData.testQuestions.length).fill(null) : []
  );
  const [timeLeft, setTimeLeft] = useState(
    testData ? testData.duration.minutes * 60 : 0
  );

  // Always run this effect to redirect if no testData is present.
  useEffect(() => {
    if (!testData) {
      navigate("/");
    }
  }, [testData, navigate]);

  // Timer effect: decrement time left every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Conditionally render a loading state only after all hooks have been called.
  if (!testData || answers.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <div>Loading test details...</div>
      </div>
    );
  }

  const { testQuestions } = testData;
  const currentQuestion = testQuestions[currentQuestionIndex].question;

  // Event handlers.
  const handleSelectChoice = (selectedIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedIndex;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  
const handleFinish = () => {
  // Build the payload by mapping each testQuestion and its selected answer.
  const payload = {
    answers: testData.testQuestions.map((testQuestion, index) => ({
      testQuestionId: testQuestion.id,
      selectedOptionId:
        testQuestion.question.options[answers[index] as number].id,
    })),
  };

  // Submit the payload using the API instance and then navigate to the results page
  api
    .post("/tests/submit-placement", payload)
    .then((response) => {
      console.log("Submission response:", response.data);
      // Navigate to the TestResultPage with the result data
      navigate("/test-result", { state: { result: response.data } });
    })
    .catch((error) => {
      console.error("Error submitting test:", error);
    });
};

  const options = currentQuestion.options;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.testContainer}>
        <div className={styles.questionBox}>
          <div className={styles.timerCentered}>
            Time left: <Clock seconds={timeLeft} />
          </div>
          <h2>{currentQuestion.question_text}</h2>
          <ul className={styles.choicesList}>
            {options.map((option, index) => (
              <li
                key={option.id}
                className={`${styles.choice} ${
                  answers[currentQuestionIndex] === index ? styles.selected : ""
                }`}
                onClick={() => handleSelectChoice(index)}
              >
                {option.option_text}
              </li>
            ))}
          </ul>
          <div className={styles.navigationButtons}>
            <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === testQuestions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className={styles.finishButtonWrapper}>
        <button
          className={styles.finishButton}
          onClick={handleFinish}
          disabled={answers.some((answer) => answer === null)}
        >
          Finish Test
        </button>
      </div>
    </div>
  );
};

export default TestPage;