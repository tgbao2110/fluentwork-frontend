import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/placementTest/PlacementTestResult.module.css";
import LevelBadge from "../components/LevelBadge";

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

  // Hardcoded fake result data for guaranteed execution
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

      <div className={styles.rightSection}>
        <div className={styles.resultCard}>
          <h1 className={styles.resultTitle}>One Last Step</h1>
          <div style={{ marginTop: "20px" }}>
            <h4 className={styles.topicTitle}>Select topics you're interested in (up to 3):</h4>
            <div className={styles.topicButtons}>
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`${styles.topicButton} ${
                    selectedTopics.includes(topic) ? styles.selected : ""
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          <p className={styles.resultMessage}>
            Your personalized roadmap has been carefully crafted to align with your current level,
            ensuring that each step supports your learning journey.
          </p>
          <button className={styles.button} onClick={handleSubmit}>
            Let's take a look
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementTestResultPageFake;