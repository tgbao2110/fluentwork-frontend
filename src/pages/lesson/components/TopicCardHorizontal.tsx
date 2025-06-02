import React from "react";
import styles from "./TopicCardHorizontal.module.css";

interface TopicCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const TopicCardHorizontal: React.FC<TopicCardProps> = ({ title, image, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <img src={image} alt={title} className={styles.image} />
    </div>
  );
};

export default TopicCardHorizontal;