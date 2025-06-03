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

const TestResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const resultDataFromNavigation = location.state?.result as TestResultData | undefined;

  const fakeData: TestResultData = {
    level: "Beginner",
    message: "Placement test submitted and level assigned.",
    score: 4,
  };

  const resultData: TestResultData = resultDataFromNavigation ?? fakeData;

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

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
      description: `A custom path for beginner learners interested in ${topicsToSend.join(", ")} topics`,
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
    </div>
  );
};

export default TestResultPage;
