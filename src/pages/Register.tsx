import React, { JSX, useState } from "react";
import styles from "./Register.module.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className={styles.background}>
      <div className={styles.registerModal}>
        <div className={styles.registerFormContainer}>
          <div className={styles.registerForm}>
            <h1>Create an account</h1>
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Username" />

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div className={styles.passwordField}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
              />
              <span
                className={styles.icon}
                onClick={toggleConfirmPasswordVisibility}
                role="button"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <HiEye size={20} />
                ) : (
                  <HiEyeOff size={20} />
                )}
              </span>
            </div>

            <button>Register</button>
            <div className={styles.smallText + " " + styles.gap}>
              <span>Already have an account?</span>{" "}
              <a href="/register">Log in</a>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <img src="/login.png" alt="Relevant illustration" />
        </div>
      </div>
    </div>
  );
};

export default Register;
