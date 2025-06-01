import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Topics.module.css";
import TopicCard from "./TopicCard";

interface Lesson {
  id: number;
  title: string;
  level: string;
  type: string;
  vocabulary_topic: string | null;
  grammar_topic: string | null;
}

const Topics: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/lessons/")
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error("Error fetching lessons:", error));
  }, []);

  const handleTopicClick = (id: number) => {
    navigate(`/lesson/${id}`);
  };

  // Group lessons by type
  const groupedByType: Record<string, Lesson[]> = lessons.reduce((acc, lesson) => {
    const type = lesson.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Choose a Topic</h1>

      {Object.entries(groupedByType).map(([type, topicList]) => (
        <div key={type} className={styles.section}>
          <h2 className={styles.sectionTitle}>{type}</h2>
          <div className={styles.grid}>
            {topicList.map((topic) => {
              const name = topic.vocabulary_topic || topic.grammar_topic || topic.title;
              return (
                <TopicCard
                  key={topic.id}
                  title={`${name} - ${topic.level}`}
                  image="/defaultTopic.png"
                  onClick={() => handleTopicClick(topic.id)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
