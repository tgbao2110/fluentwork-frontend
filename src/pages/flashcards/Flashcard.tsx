import React, { useState } from "react";
import styles from "./Flashcard.module.css";

const Flashcard: React.FC<{ vocab: string; meaning: string }> = ({ vocab, meaning }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={styles.flashcardWrapper}>
      <h2 className={styles.title}>Vocabulary Flashcard</h2>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>{vocab}</div>
          <div className={styles.cardBack}>{meaning}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;