import React, { useState } from "react";
import styles from "./Flashcard.module.css";
import Flashcard from "./Flashcard";
import Navbar from "../../components/Navbar";

const vocabList = [
  { vocab: "Abcd", meaning: "Nghĩa" },
  { vocab: "Efghiasd", meaning: "Là" },
  { vocab: "Yo12sd", meaning: "Gì" },
];

const Flashcards: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev < vocabList.length - 1 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className={styles.flashcardWrapper}>
      <Flashcard vocab={vocabList[index].vocab} meaning={vocabList[index].meaning} />
      <div className={styles.navigation}>
        <button onClick={handleBack} disabled={index === 0}>Back</button>
        <button onClick={handleNext} disabled={index === vocabList.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default Flashcards;