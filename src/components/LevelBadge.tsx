import React from "react";
import styles from "./LevelBadge.module.css";

interface LevelBadgeProps {
  level: "Beginner" | "Intermediate" | "Advanced";
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  const lower = level.toLowerCase(); // for class name

  return (
    <span className={`${styles.badge} ${styles[lower]}`}>
      {level}
    </span>
  );
};

export default LevelBadge;
