import React, { useEffect, useState } from "react";
import styles from "./Lesson.module.css";
import { useParams } from "react-router-dom";

interface LessonDetail {
  id: number;
  title: string;
  description: string;
  level: string;
  type: string;
  content: string;
}

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/lessons/${id}`)
      .then((res) => res.json())
      .then((data) => setLesson(data))
      .catch((err) => console.error("Error fetching lesson:", err));
  }, [id]);

  useEffect(() => {
    document.querySelectorAll('div[data-oembed-url]').forEach(element => {
      (element as HTMLElement).classList.add("parent_container_iframe");

      let child = element.firstChild as HTMLElement;
      if (child) child.classList.add("video_container_iframe");

      let iframe = child?.firstChild as HTMLIFrameElement;
      if (iframe) iframe.classList.add("video_iframe");
    });
  }, [lesson]);
  if (!lesson) return <div className={styles.page}>Loading lesson...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{lesson.title}</h1>
        <div className={styles.details}>
          <span className={styles.badge}>{lesson.type}</span>
          <span className={`${styles.badge} ${styles[lesson.level.toLowerCase()]}`}>
            {lesson.level}
          </span>
        </div>
        <p className={styles.description}>{lesson.description}</p>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />
    </div>
  );
};

export default Lesson;