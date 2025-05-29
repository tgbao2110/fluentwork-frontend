import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ChangePassword.module.css";

const ChangePassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/forgot-password", {
        email,
        ...formData,
      });

      toast.success(response.data.message?.[0] || "Password changed successfully");
      navigate("/login"); // Redirect to login after success
    } catch (error: any) {
      const errorMsg = error.response?.data?.message?.[0] || "Password reset failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className={styles.background}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.loginModal}>
        <div className={styles.loginFormContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h1>Change Password</h1>

            {/* Non-editable email input */}
            <input
              type="email"
              name="email"
              value={email}
              readOnly
              className={styles.disabledInput}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />

            {/* Buttons container */}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>Submit</button>
              <button type="button" className={styles.changeEmailButton} onClick={() => navigate("/forgot-password")}>
                Change Email
              </button>
            </div>
          </form>
        </div>
        <div className={styles.image}>
          <img src="/login.png" alt="Change Password Illustration" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;