import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PlacementTestResult.module.css";
import LevelBadge from "../../components/LevelBadge";
import api from "../../utils/api";

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

const PlacementTestResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

const resultDataFromNavigation = location.state?.result as TestResultData | undefined;
const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

if (!resultDataFromNavigation) {
  return (
    <div className={styles.pageWrapper}>
      <p>Error: No result data found. Please retake the test.</p>
    </div>
  );
}


const resultData = resultDataFromNavigation;

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async () => {
    const topicsToSend = selectedTopics.length > 0 ? selectedTopics : topics;

    const payload = {
      level: resultData.level,
      title: "UserA's Learning Path",
      description: `A custom path for ${resultData.level.toLowerCase()} learners interested in ${topicsToSend.join(", ")}`,
      vocabularyTopics: topicsToSend,
    };

    try {
      await api.post("/learning-paths", payload);
      navigate("/learning-path");
    } catch (error) {
      console.error("Failed to submit learning path:", error);
    }
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

export default PlacementTestResultPage;
