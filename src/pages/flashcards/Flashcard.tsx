import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";
import styles from "./Flashcard.module.css";
import FlashcardComponent from "./FlashcardComponent";
import api from "../../utils/api";

interface FlashcardItem {
  id: number;
  topic: string;
  word: string;
  definition: string;
}

const Flashcard: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const topic = query.get("topic");

  useEffect(() => {
    const url = topic
      ? `http://localhost:3000/flashcards?topic=${topic}`
      : "http://localhost:3000/flashcards";

    api
      .get(url)
      .then((res) => {
        setFlashcards(res.data.flashcards || []);
        setIndex(0); // Reset index when new data comes
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, [topic]);

  // Function to handle index change only after the card is unflipped
  const flipBackAndChangeIndex = (newIndex: number) => {
    if (isFlipped) {
      setIsFlipped(false);
      // Wait for the unflip animation to complete (300ms)
      setTimeout(() => {
        setIndex(newIndex);
      }, 300);
    } else {
      setIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (index < flashcards.length - 1) {
      flipBackAndChangeIndex(index + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      flipBackAndChangeIndex(index - 1);
    }
  };

  if (flashcards.length === 0)
    return (
      <div className={styles.flashcardWrapper}>
        <div>No flashcards available.</div>
      </div>
    );

  // Determine if navigation icons should be interactive or not.
  const isBackDisabled = index === 0;
  const isNextDisabled = index === flashcards.length - 1;

  return (
    <div className={styles.flashcardWrapper}>

    <button className={styles.closeButton} onClick={() => navigate("/flashcards")}>
      <BiX size={30} />
    </button>
      <div className={styles.navigationContainer}>
        <BiChevronLeft
          onClick={!isBackDisabled ? handleBack : undefined}
          className={`${styles.navIcon} ${isBackDisabled ? styles.disabled : ""}`}
        />
        <FlashcardComponent
          vocab={flashcards[index].word}
          meaning={flashcards[index].definition}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
        <BiChevronRight
          onClick={!isNextDisabled ? handleNext : undefined}
          className={`${styles.navIcon} ${isNextDisabled ? styles.disabled : ""}`}
        />
      </div>
    </div>
  );
};

export default Flashcard;