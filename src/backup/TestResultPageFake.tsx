import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelBadge from "../components/LevelBadge";
import styles from "../pages/placementTest/TestResult.module.css";

type Level = "Beginner" | "Intermediate" | "Advanced";

interface TestResultData {
  level: string;
  message: string;
  score: number;
}

const isValidLevel = (level: string): level is Level => {
  return ["Beginner", "Intermediate", "Advanced"].includes(level);
};

const topics = ["Business", "Information Technology", "Finance"];

const PlacementTestResultPageFake: React.FC = () => {
  const navigate = useNavigate();

  const resultData: TestResultData = {
    level: "Beginner",
    message: "Placement test submitted and level assigned.",
    score: 4,
  };

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = () => {
    const topicsToSend = selectedTopics.length > 0 ? selectedTopics : topics;

    // Simulated payload submission (no API call)
    console.log("Fake Submission Payload:", {
      level: resultData.level,
      title: "UserA's Learning Path",
      description: `A custom path for beginner learners interested in ${topicsToSend.join(", ")} topics`,
      vocabularyTopics: topicsToSend,
    });

    // Navigate without actual API response
    navigate("/learning-path");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftSection}>
        <h3 className={styles.congratulations}>Congratulations! Your score is:</h3>
        <div className={styles.resultNumber}>
          <span className={styles.resultNumberCircle}>{resultData.score}</span>
        </div>
        <p className={styles.resultLevel}>
          Your current Level is:{" "}
          <strong>
            {isValidLevel(resultData.level) ? (
              <LevelBadge level={resultData.level} />
            ) : (
              resultData.level
            )}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default PlacementTestResultPageFake;