import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Topics.module.css";
import TopicCard from "./components/TopicCard";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{
    type: string | null;
    topic: string | null;
    level: string | null;
  }>({
    type: null,
    topic: null,
    level: null,
  });

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

  const allTypes = Array.from(new Set(lessons.map((l) => l.type).filter(Boolean)));
  const allLevels = Array.from(new Set(lessons.map((l) => l.level).filter(Boolean)));

  const filteredTopics = Array.from(
    new Set(
      lessons
        .filter((l) => !filters.type || l.type === filters.type)
        .map((l) =>
          filters.type === "vocabulary"
            ? l.vocabulary_topic
            : filters.type === "grammar"
            ? l.grammar_topic
            : l.vocabulary_topic || l.grammar_topic
        )
        .filter((t): t is string => !!t)
    )
  );

  const filteredLessons = lessons.filter((lesson) => {
    const name = lesson.vocabulary_topic || lesson.grammar_topic || lesson.title;

    if (filters.type && lesson.type !== filters.type) return false;
    if (filters.topic) {
      const topic = lesson.vocabulary_topic || lesson.grammar_topic;
      if (topic !== filters.topic) return false;
    }
    if (filters.level && lesson.level !== filters.level) return false;

    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const groupedByType: Record<string, Lesson[]> = filteredLessons.reduce((acc, lesson) => {
    const type = lesson.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <div className={styles.pageWrapper}>
      <div className="searchFilter">
      {/* Search */}
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className="filters">
      {/* Type Filter */}
      <select
        value={filters.type || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            type: e.target.value || null,
            topic: null, // Reset topic filter on type change
          })
        }
        className={styles.filterSelect}
      >
        <option value="">All Types</option>
        {allTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Topic Filter (depends on type) */}
      <select
        value={filters.topic || ""}
        onChange={(e) => setFilters({ ...filters, topic: e.target.value || null })}
        className={styles.filterSelect}
        disabled={!filters.type}
      >
        <option value="">All Topics</option>
        {filteredTopics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>

      {/* Level Filter */}
      <select
        value={filters.level || ""}
        onChange={(e) => setFilters({ ...filters, level: e.target.value || null })}
        className={styles.filterSelect}
      >
        <option value="">All Levels</option>
        {allLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      </div>
      </div>

      {/* Grouped Lessons */}
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
                  image="/lesson.png"
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
