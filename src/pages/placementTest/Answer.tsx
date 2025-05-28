import React, { useState } from "react";
import styles from "./Answer.module.css";
import Navbar from "../../components/Navbar";

type Question = {
  id: number;
  text: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation: string;
};

const questions: Question[] = [
  {
    id: 1,
    text: "Question oneeeeee?",
    choices: ["aksd", "fdgdfgdfgdf", "asdasd asdasd", "assssssdsd"],
    correctAnswerIndex: 1,
    explanation: "Explanation for question 1.",
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus"],
    correctAnswerIndex: 1,
    explanation: "Mars is known as the Red Planet due to its reddish appearance.",
  },
  {
    id: 3,
    text: "What is the largest ocean?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswerIndex: 3,
    explanation: "The Pacific Ocean is the largest ocean on Earth.",
  },
];

const Answer: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  // Handle selecting an answer
  const handleSelectChoice = (index: number) => {
    const updated = [...answers];
    updated[currentQuestionIndex] = index;
    setAnswers(updated);
  };

  // Move to the next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Move to the previous question
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
      <div className={styles.pageWrapper}>
        <div className={styles.testContainer}>
          <div className={styles.flexRow}>
            {/* Left side - Question and Answers */}
            <div className={styles.questionBox}>
              <h2>{currentQuestion.text}</h2>
              <ul className={styles.choicesList}>
                {currentQuestion.choices.map((choice, choiceIndex) => {
                  const isCorrect = choiceIndex === currentQuestion.correctAnswerIndex;
                  const isIncorrect = answers[currentQuestionIndex] === choiceIndex && !isCorrect;
                  return (
                    <li
                      key={choiceIndex}
                      className={`${styles.choice} ${isCorrect ? styles.correct : ""} ${isIncorrect ? styles.incorrect : ""}`}
                      onClick={() => handleSelectChoice(choiceIndex)}
                    >
                      {choice}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right side - Explanation */}
            <div className={styles.explanationBox}>
              <h3>Explanation:</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigationButtons}>
            <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
              Back
            </button>
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default Answer;
