import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="background">
      <div className="login-modal">
        {/* Login Form Section */}
        <div className="login-form-container">
          <div className="login-form">
            <h1>Welcome back</h1>
            {/* --- Username and Password --- */}
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            {/* --- Username and Password --- */}
            <div className="small-text gap">
            <a href="/forgot-password">Forgot password?</a>
            </div>
            {/* --- Login Button --- */}
            <button>Log in</button>
            {/* --- Login Button --- */}
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
