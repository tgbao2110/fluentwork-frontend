import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar";
import { FaUser, FaEnvelope, FaCalendarAlt, FaLevelUpAlt, FaChartBar } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar
        userName="User Name"
        profilePicUrl="https://via.placeholder.com/150"
      />
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {/* User Profile Summary */}
        <section className={`${styles.card} ${styles.userProfile}`}>
          <h2><FaUser className={styles.icon} /> Profile Overview</h2>
          <div className={styles.profileInfo}>
            <div className={styles.profileText}>
              <strong>Gia Bao</strong>
              <span className={styles.label}>Full Name</span>
            </div>
            <div className={styles.profileText}>
              <strong>john.doe@example.com</strong>
              <span className={styles.label}>Email</span>
            </div>
            <div className={styles.profileBadge}>
              <FaLevelUpAlt />
              <span>Intermediate</span>
            </div>
            <div className={styles.profileText}>
              <FaCalendarAlt className={styles.smallIcon} />
              <span>Registered: 10/01/2025</span>
            </div>
          </div>
        </section>

        {/* Progress Summary */}
        <section className={`${styles.card} ${styles.progressSummary}`}>
          <h2><FaChartBar className={styles.icon} /> Progress Summary</h2>
          <div className={styles.progressStats}>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>8</span>
              <span className={styles.statLabel}>Lessons Started</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Lessons Completed</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statNumber}>62%</span>
              <span className={styles.statLabel}>Completion Rate</span>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className={`${styles.card} ${styles.recentActivity}`}>
          <h2><MdOutlineHistory className={styles.icon} /> Recent Activity</h2>
          <div className={styles.activityTable}>
            <div className={styles.activityHeader}>
              <span>Lesson</span>
              <span>Status</span>
              <span>Result</span>
              <span>Date</span>
            </div>
            {[
              { name: "Finance Vocabulary", status: "Completed", result: "8/10", date: "22/05/2025" },
              { name: "Business Basics", status: "In Progress", result: "3/10", date: "21/05/2025" },
              { name: "Marketing 101", status: "Not Started", result: "-", date: "20/05/2025" },
              { name: "Workplace Ethics", status: "Completed", result: "10/10", date: "19/05/2025" },
              { name: "Email Writing", status: "In Progress", result: "5/10", date: "18/05/2025" },
            ].map((activity, index) => (
              <div className={styles.activityRow} key={index}>
                <span>{activity.name}</span>
                <span className={styles.status}>{activity.status}</span>
                <span>{activity.result}</span>
                <span>{activity.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
