import React, { useState, useEffect } from "react";
import styles from "./Test.module.css";
import Navbar from "../../components/Navbar";

type Question = {
  id: number;
  text: string;
  choices: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "Question oneeeeee?",
    choices: ["aksd", "fdgdfgdfgdf", "asdasd asdasd", "assssssdsd"],
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus"],
  },
  {
    id: 3,
    text: "What is the largest ocean?",
    choices: ["Atlantic", "Indian", "Arctic", "Southern", "Pacific"],
  },
];

const totalTestDuration = 60;

const TestPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(totalTestDuration);

  const allAnswered = answers.every((answer) => answer !== null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectChoice = (index: number) => {
    const updated = [...answers];
    updated[currentQuestionIndex] = index;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    alert("Test submitted! You can now process the answers here.");
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedChoice = answers[currentQuestionIndex];

  return (
      <div className={styles.pageWrapper}>
        <div className={styles.testContainer}>
          <div className={styles.questionBox}>
            <div className={styles.timerCentered}>Time left: {timeLeft}s</div>
            <h2>{currentQuestion.text}</h2>
            <ul className={styles.choicesList}>
              {currentQuestion.choices.map((choice, index) => (
                <li
                  key={index}
                  className={`${styles.choice} ${
                    selectedChoice === index ? styles.selected : ""
                  }`}
                  onClick={() => handleSelectChoice(index)}
                >
                  {choice}
                </li>
              ))}
            </ul>
            <div className={styles.navigationButtons}>
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
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
            disabled={!allAnswered}
          >
            Finish Test
          </button>
        </div>
      </div>
  );
};

export default TestPage;
