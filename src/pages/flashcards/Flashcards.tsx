import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Flashcards.module.css";
import TopicCardHorizontal from "../lesson/components/TopicCardHorizontal";

const topics = [
  { label: "All", value: "", image: "/flashcard/all.png" },
  { label: "Business", value: "Business", image: "/flashcard/business.png" },
  { label: "Information Technology", value: "Information%20Technology", image: "/flashcard/it.png" },
  { label: "Finance", value: "Finance", image: "/flashcard/finance.png" },
];

const Flashcards: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    navigate(`/flashcard?topic=${value}`);
  };

  return (
    <div className={styles.flashcardsWrapper}>
      <h1 className={styles.title}>Choose a Flashcard Topic</h1>
      <div className={styles.cardGroup}>
        {topics.map((topic) => (
          <TopicCardHorizontal 
            key={topic.label}
            title={topic.label}
            image={topic.image}
            onClick={() => handleClick(topic.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Flashcards;