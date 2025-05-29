import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );

      toast.success(response.data.message?.[0] || "Login successful");
      localStorage.setItem("access_token", response.data.access_token);
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

      toast.error(errorMessage); // ✅ Now working
    }
  };

  return (
    <div className={styles.background}>
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      {/* ✅ Always add this */}
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
