import React, { useState } from "react";
import "./Login.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="background">
      <div className="login-modal">
        {/* Login Form Section */}
        <div className="login-form-container">
          <div className="login-form">
            <h1>Welcome back</h1>

            {/* --- Username Input --- */}
            <input type="text" placeholder="Username" />

            {/* --- Password Input with Toggle Icon --- */}
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

            {/* --- Forgot Password --- */}
            <div className="small-text gap">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            {/* --- Login Button --- */}
            <button>Log in</button>

            {/* --- Register Link --- */}
            <div className="small-text gap">
              <span>No account yet?</span> <a href="/register">Register here</a>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="image">
          <img src="/login.png" alt="Relevant illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
