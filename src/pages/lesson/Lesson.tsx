import React from "react";
import styles from "./Lesson.module.css";
import { useLocation, useParams } from "react-router-dom";

const Lesson: React.FC = () => {
  const { name } = useParams(); // get from path: /lesson/:name
  const location = useLocation();
  const state = location.state || {};
  const type = state.type || "Unknown";
  const level = state.level || "Intermediate";

  const displayName = name?.replace(/-/g, " ") || "Unknown";

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1> {displayName}</h1>
        <div className={styles.details}>
          <span className={styles.badge}>{type}</span>
          <span className={`${styles.badge} ${styles[level.toLowerCase()]}`}>{level}</span>
        </div>
      </div>
      <div className={styles.content}>
        <p>content hereeeeeeeeeeeee.</p>
      </div>
    </div>
  );
};

export default Lesson;
