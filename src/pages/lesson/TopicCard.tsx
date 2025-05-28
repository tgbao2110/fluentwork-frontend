import React from "react";
import styles from "./TopicCard.module.css";

interface TopicCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, image, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.overlay}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
};

export default TopicCard;