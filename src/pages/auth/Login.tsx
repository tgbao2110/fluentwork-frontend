import React, { useState } from "react";
import styles from "./Login.module.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={styles.background}>
      <div className={styles.loginModal}>
        {/* Login Form Section */}
        <div className={styles.loginFormContainer}>
          <div className={styles.loginForm}>
            <h1>Welcome back</h1>

            {/* --- Username Input --- */}
            <input type="text" placeholder="Username" />

            {/* --- Password Input with Toggle Icon --- */}
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                className={styles.icon}
                onClick={togglePasswordVisibility}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </span>
            </div>

            {/* --- Forgot Password --- */}
            <div className={styles.smallText + " " + styles.gap}>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            {/* --- Login Button --- */}
            <button>Log in</button>

            {/* --- Register Link --- */}
            <div className={styles.smallText + " " + styles.gap}>
              <span>No account yet?</span> <a href="/register">Register here</a>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.image}>
          <img src="/login.png" alt="Relevant illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
