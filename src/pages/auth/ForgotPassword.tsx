import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/change-password", { state: { email } }); // Pass email to ChangePassword
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginModal}>
        <div className={styles.loginFormContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>Submit</button>
              <button type="button" className={styles.cancelButton} onClick={() => navigate("/login")}>
                Back to login
              </button>
            </div>
          </form>
        </div>
        <div className={styles.image}>
          <img src="/login.png" alt="Forgot Password Illustration" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;