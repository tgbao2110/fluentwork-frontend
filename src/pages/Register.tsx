import React, { JSX, useState } from "react";
import "./Register.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="background">
      <div className="register-modal">
        <div className="register-form-container">
          <div className="register-form">
            <h1>Create an account</h1>
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Username" />

            {/* Password Field */}
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                className="icon"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
              />
              <span
                className="icon"
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
            <div className="small-text gap">
              <span>Already have an account?</span>{" "}
              <a href="/register">Log in</a>
            </div>
          </div>
        </div>
        <div className="image">
          <img src="/login.png" alt="Relevant illustration" />
        </div>
      </div>
    </div>
  );
};

export default Register;
