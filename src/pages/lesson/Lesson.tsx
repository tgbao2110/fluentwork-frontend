import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import styles from "./Lesson.module.css";
import api from "../../utils/api"; // Import API utility
import { useUser } from "../../utils/UserContext"; // Use the custom hook

interface LessonDetail {
  id: number;
  title: string;
  description: string;
  level: string;
  type: string;
  content: string;
  vocabulary_topic: string | null;
  grammar_topic: string | null;
  createdAt: string;
  updatedAt: string;
}

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser(); // Use context hook
  const [lesson, setLesson] = useState<LessonDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/lessons/${id}`)
      .then((res) => res.json())
      .then((data) => setLesson(data))
      .catch((err) => console.error("Error fetching lesson:", err));
  }, [id]);

  useEffect(() => {
    document.querySelectorAll("div[data-oembed-url]").forEach((element) => {
      (element as HTMLElement).classList.add("parent_container_iframe");

      let child = element.firstChild as HTMLElement;
      if (child) child.classList.add("video_container_iframe");

      let iframe = child?.firstChild as HTMLIFrameElement;
      if (iframe) iframe.classList.add("video_iframe");
    });
  }, [lesson]);

  if (!lesson) return <div className={styles.page}>Loading lesson...</div>;

  const handleProceedToTest = async () => {
  if (!isLoggedIn || !user) {
    console.error("User not logged in. Redirecting to login...");
    navigate("/login");
    return;
  }

  if (!lesson) {
    console.error("Lesson data missing, unable to start test.");
    return;
  }

  const testPayload = {
    "level": user.level || "Beginner",
    "type": lesson.type,
    ...(lesson.type === "Vocabulary" && { 
      "vocabulary_topic": Array.isArray(lesson.vocabulary_topic) ? lesson.vocabulary_topic : [lesson.vocabulary_topic] 
    }),
    ...(lesson.type === "Grammar" && { 
      "grammar_topic": Array.isArray(lesson.grammar_topic) ? lesson.grammar_topic : [lesson.grammar_topic] 
    }),
    "duration": "15m",
    "test_date": new Date().toISOString(),
    "total_correct_answers": 0,
    "total_incorrect_answers": 0,
  };

  console.log("Test Payload:", testPayload);

  try {
    const response = await api.post("/tests", testPayload);
    console.log("Test created:", response.data);

    // Navigate to test-info, passing the new test ID
    navigate("/test-info", { state: { testId: response.data.id, isPlacementTest: false } });
  } catch (error) {
    console.error("Error creating test:", error);
  }
};

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{lesson.title}</h1>
        <div className={styles.details}>
          <span className={styles.badge}>{lesson.type}</span>
          <span
            className={`${styles.badge} ${styles[lesson.level.toLowerCase()]}`}
          >
            {lesson.level}
          </span>
        </div>
        <p className={styles.description}>{lesson.description}</p>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />

      {/* Test Section */}
      <div className={styles.testSection}>
        <p className={styles.testPrompt}>Test your understanding?</p>
        <button className={styles.testButton} onClick={handleProceedToTest}>
          Proceed to Test <SlArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Lesson;
