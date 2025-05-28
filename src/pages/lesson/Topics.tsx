import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Topics.module.css";
import TopicCard from "./TopicCard";

const topics = {
  Vocabulary: [
    { name: "IT", image: "/images/it.jpg" },
    { name: "Business", image: "/images/business.jpg" },
    { name: "Finance", image: "/images/finance.jpg" },
    { name: "Marketing", image: "/images/marketing.jpg" },
    { name: "Legal", image: "/images/legal.jpg" },
  ],
  Grammar: [
    { name: "Passive Voice", image: "/images/passive.jpg" },
    { name: "Conditional Sentences", image: "/images/conditional.jpg" },
    { name: "Reported Speech", image: "/images/reported.jpg" },
    { name: "Tenses", image: "/images/tenses.jpg" },
  ],
};

const Topics: React.FC = () => {
  const navigate = useNavigate();

  const handleTopicClick = (name: string, type: string) => {
    navigate(`/lesson?name=${name}&type=${type}`);
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Choose a Topic</h1>

      {Object.entries(topics).map(([type, topicList]) => (
        <div key={type} className={styles.section}>
          <h2 className={styles.sectionTitle}>{type}</h2>
          <div className={styles.grid}>
            {topicList.map((topic) => (
              <TopicCard
                key={topic.name}
                title={topic.name}
                image={topic.image}
                onClick={() => handleTopicClick(topic.name, type)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Topics;