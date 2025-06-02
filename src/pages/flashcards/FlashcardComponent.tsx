import React from "react";
import styles from "./Flashcard.module.css";

interface FlashcardComponentProps {
  vocab: string;
  meaning: string;
  isFlipped: boolean;
  setIsFlipped: (flip: boolean) => void;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({
  vocab,
  meaning,
  isFlipped,
  setIsFlipped,
}) => {
  return (
    <div className={styles.flashcardWrapper}>
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>{vocab}</div>
          <div className={styles.cardBack}>{meaning}</div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;