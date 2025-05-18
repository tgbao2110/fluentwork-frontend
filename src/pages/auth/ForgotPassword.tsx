// ForgotPassword.tsx

import React from "react";
import "./ForgotPassword.css";

const ForgotPassword: React.FC = () => {
  return (
    <div className="background">
      <div className="login-modal">
        <div className="login-form-container">
          <div className="login-form">
            <h1>Forgot Password</h1>

            {/* --- Email Input --- */}
            <input type="email" placeholder="Email address" />

            {/* --- Submit Button --- */}
            <button>Reset Password</button>
          </div>
        </div>

        {/* Image Section (Optional) */}
        <div className="image">
          <img src="/login.png" alt="Forgot Password Illustration" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
