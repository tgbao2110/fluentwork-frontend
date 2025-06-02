import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import api from "../../utils/api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Log in the user and store the access token
      const loginResponse = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      toast.success(loginResponse.data.message?.[0] || "Login successful");

      // Extract token and store it
      const accessToken = loginResponse.data.access_token;
      localStorage.setItem("access_token", accessToken);

      // Fetch the learner profile
      const profileResponse = await api.get("http://localhost:3000/learner-profiles/me");

      // Extract user and additional learner info
      const { id, user, level, total_lessons_completed, hasCreatedPlacement, hasSubmittedPlacement } = profileResponse.data;

      // Create the User object that matches your context's interface
      const userObj = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
        picture: user.picture || "",
        level,
        totalLessonsCompleted: total_lessons_completed,
        hasCreatedPlacement,
        hasSubmittedPlacement,
      };

      // Update the global state and store extra info via context
      setUser(userObj, accessToken);

      // Redirect to dashboard or any other page:
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Login failed";
      try {
        const serverMsg = error?.response?.data?.message;
        errorMessage = Array.isArray(serverMsg)
          ? serverMsg[0]
          : serverMsg || "Invalid credentials";
      } catch (parseErr) {
        console.warn("Failed to parse error message", parseErr);
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.background}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.loginModal}>
        <div className={styles.loginFormContainer}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <h1>Welcome back</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className={styles.icon}
                onClick={togglePasswordVisibility}
                role="button"
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </span>
            </div>
            <div className={`${styles.smallText} ${styles.gap}`}>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit">Log in</button>
            <div className={`${styles.smallText} ${styles.gap}`}>
              <span>No account yet?</span> <a href="/register">Register here</a>
            </div>
          </form>
        </div>
        <div className={styles.image}>
          <img src="/login.png" alt="Relevant illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;