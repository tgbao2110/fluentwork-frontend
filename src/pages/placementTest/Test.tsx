import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Test.module.css";
import Clock from "../../components/Clock";
import api from "../../utils/api";
import { useUser } from "../../utils/UserContext";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionId: number;
  questionText: string;
  explanation: string;
  options: Option[];
  selectedOptionId: number | null;
  isCorrect: boolean | null;
}

interface Duration {
  minutes: number;
}

interface TestData {
  testId: number;
  testDate: string;
  score: number;
  isSubmitted: boolean;
  level: string;
  duration: Duration;
  questions: Question[];
}

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get user data from context
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDoingPlacement, setIsDoingPlacement] = useState<boolean>(false);

  // Fetch test data when the page loads
  useEffect(() => {
    if (!user) {
      console.error("User not found, redirecting...");
      navigate("/");
      return;
    }

    setIsDoingPlacement(!user.hasSubmittedPlacement); // Set before submission

    const endpoint = user.hasSubmittedPlacement ? "/tests/me" : "/tests/placement/me";

    api.get(endpoint)
      .then((response) => {
        console.log("API Response:", response.data);

        if (!response.data || !response.data.questions) {
          throw new Error("API returned invalid test data.");
        }

        setTestData(response.data);
        setAnswers(Array(response.data.questions.length).fill(null));
        setTimeLeft(response.data.duration.minutes * 60);
      })
      .catch((error) => {
        console.error("Error fetching test data:", error);
      });
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
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
    }
  }, [timeLeft]);

  if (!testData || answers.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <div>Loading test details...</div>
      </div>
    );
  }

  const currentQuestion = testData.questions[currentQuestionIndex];

  if (!currentQuestion || !currentQuestion.options || currentQuestion.options.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <div>Error: No options available for this question.</div>
      </div>
    );
  }

  const handleSelectChoice = (selectedIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedIndex;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    if (!testData || !user) return;

    const endpoint = user.hasSubmittedPlacement ? "/tests/submit" : "/tests/submit-placement";

    const payload = {
      answers: testData.questions.map((question, index) => ({
        testQuestionId: question.questionId,
        selectedOptionId: question.options[answers[index] as number]?.id,
      })),
    };

    console.log("Submission payload:", payload);
    try {
      // const response = await api.post(endpoint, payload);
      // console.log("Submission response:", response.data);

      // Navigate based on `isDoingPlacement`, regardless of `hasSubmittedPlacement`
      navigate("/placement-test-result");
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.testContainer}>
        <div className={styles.questionBox}>
          <div className={styles.timerCentered}>
            Time left: <Clock seconds={timeLeft} />
          </div>
          <h2>{currentQuestion.questionText}</h2>
          <ul className={styles.choicesList}>
            {currentQuestion.options.map((option, index) => (
              <li
                key={option.id}
                className={`${styles.choice} ${
                  answers[currentQuestionIndex] === index ? styles.selected : ""
                }`}
                onClick={() => handleSelectChoice(index)}
              >
                {option.text}
              </li>
            ))}
          </ul>
          <div className={styles.navigationButtons}>
            <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === testData.questions.length - 1}
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