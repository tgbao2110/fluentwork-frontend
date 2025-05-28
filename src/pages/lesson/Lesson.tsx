// lesson.tsx
import React from "react";
import { useLocation } from "react-router-dom";

const Lesson: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name") || "Lesson";
  const type = queryParams.get("type") || "Vocabulary";
  const level = "Intermediate"; // Temporary static level for now

  return (
    <></>
  );
};

export default Lesson;