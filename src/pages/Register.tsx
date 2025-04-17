import React from "react";
import "./Login.css";

const Register: React.FC = () => {
  return (
    <div className="background">
      <div className="login-modal">
        {/* Login Form Section */}
        <div className="login-form-container">
          <div className="login-form">
            <h1>Create an account</h1>
            {/* --- Username and Password --- */}
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            {/* --- Username and Password --- */}
            <br/>
            {/* --- Login Button --- */}
            <button>Register</button>
            {/* --- Login Button --- */}
            <div className="small-text gap">
              <span>Already have an account?</span> <a href="/login">Log in</a>
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

export default Register;
