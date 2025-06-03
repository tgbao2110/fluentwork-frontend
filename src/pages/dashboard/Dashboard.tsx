import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar";
import { FaUser, FaEnvelope, FaCalendarAlt, FaLevelUpAlt, FaChartBar } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { useUser } from "../../utils/UserContext"; // Adjust path as needed
import LevelBadge from "../../components/LevelBadge";

const Dashboard: React.FC = () => {
  const { user } = useUser(); // Access user data from context

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        
        {/* User Profile Summary */}
        <section className={`${styles.card} ${styles.userProfile}`}>
          <h2><FaUser className={styles.icon} /> Profile Overview</h2>
          <div className={styles.profileInfo}>
            <div className={styles.profileText}>
              <strong>{user?.fullname}</strong>
              <span className={styles.label}>Full Name</span>
            </div>
            <div className={styles.profileText}>
              <strong>{user?.email}</strong>
              <span className={styles.label}>Email</span>
            </div>
            {user?.level && (
                  <LevelBadge level={user.level as "Beginner" | "Intermediate" | "Advanced"} />
              )}
            <div className={styles.profileText}>
              <FaCalendarAlt className={styles.smallIcon} />
              <span>Registered: {/* optional date if you want */}</span>
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
  );
};

export default Dashboard;
