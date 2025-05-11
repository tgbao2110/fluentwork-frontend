import React, { useState } from "react";
import styles from "./Results.module.css";
import Navbar from "../components/Navbar";

// Example user data
const user = {
  name: "User Name",
  level: "Advanced",
};

const generateRandomDate = () => {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() - Math.floor(Math.random() * 30)); // Random date in the last 30 days

  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toLocaleDateString();
};

// Example tests data, now with completion date
const tests = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Test ${i + 1}`,
  createdBy: "User 123213",
  correct: 9 + (i % 6),
  total: 20,
  time: "5m 30s",
  dateCompleted: new Date().toLocaleDateString(), // Add the current date as test completion date
}));

const ITEMS_PER_PAGE = 4;

const Results: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tests.length / ITEMS_PER_PAGE);
  const displayedTests = tests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Navbar userName="User Name" profilePicUrl="https://via.placeholder.com/150" />
      <div className={styles.completedTestsWrapper}>
        <div className={styles.userHeader}>
          <h2>
            {user.name} <span className={`${styles.userLevel} ${styles[user.level.toLowerCase()]}`}>{user.level}</span>
          </h2>
        </div>

        <div className={styles.testList}>
          {displayedTests.map((test) => {
            const scorePercentage = (test.correct / test.total) * 100;
            const resultClass = scorePercentage > 50 ? styles.pass : styles.fail;

            return (
              <div className={styles.testCard} key={test.id}>
                <div className={styles.testInfo}>
                  <h3>{test.name}</h3>
                  <p>Created by: {test.createdBy}</p>
                  <p>Completed on: {test.dateCompleted}</p> {/* Display the completion date */}
                </div>
                <div className={styles.testResults}>
                  <p className={`${styles.score} ${resultClass}`}>
                    {test.correct}/{test.total}
                  </p>
                  <p className={styles.time}>{test.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.pagination}>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? styles.active : ""}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
