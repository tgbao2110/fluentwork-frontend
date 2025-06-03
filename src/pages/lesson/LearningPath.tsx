import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import styles from "./LearningPath.module.css";
import TopicCardHorizontal from "./components/TopicCardHorizontal";
import api from "../../utils/api";
import { useUser } from "../../utils/UserContext";

interface Lesson {
  id: number;
  defaultOrder: number;
  title: string;
  description: string;
  level: string;
  type: string;
  vocabulary_topic: string | null;
  grammar_topic: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface LearningPathLesson {
  id: number;
  lesson: Lesson;
  type: string;
  topic: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface LearningPath {
  id: number;
  level: string;
  topics: string[];
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  learningPathLessons: LearningPathLesson[];
}

const LearningPathPage: React.FC = () => {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();


  useEffect(() => {
    if(!isLoggedIn) navigate("/login");
    api
      .get("http://localhost:3000/learning-paths")
      .then((response) => {
        setLearningPath(response.data);
      })
      .catch((error) => {
        console.error("Error fetching learning path:", error);
      });
  }, []);

  if (!learningPath) {
    isLoggedIn
      ? navigate("/placement")
      : navigate("/login");
    return <div>Loading...</div>;
  }
  

  return (
    <div className={styles.pageWrapper}>
      {/* Welcome line instead of the original title */}
      <h1 className={styles.title}>
        <span className={styles.titleHighlight}>{"Welcome! "}</span>
        We’ve tailored a learning path just based on your level
      </h1>
      <p className={styles.description}>{learningPath.description}</p>

      <div className={styles.section}>
        <div className={styles.column}>
          {learningPath.learningPathLessons.map((lessonItem) => (
            <TopicCardHorizontal
              key={lessonItem.id}
              title={lessonItem.lesson.title}
              image="/lesson.png"
              onClick={() => navigate(`/lesson/${lessonItem.lesson.id}`)}
            />
          ))}
        </div>
        {/* Additional prompt before the view all button */}
        <p className={styles.notLooking}>Not what you're looking for?</p>
        <button
          className={styles.viewButton}
          onClick={() => navigate("/lesson")}
        >
          View all lessons <SlArrowRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default LearningPathPage;