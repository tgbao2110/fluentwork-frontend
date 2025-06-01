import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Register the user
    const response = await axios.post("http://localhost:3000/auth/register", formData);
    toast.success("User registered successfully!");
    console.log("Registration successful:", response.data);

    // Placement test data
    const placementTestData = {
      duration: "15m",
      test_date: new Date().toISOString(),
      total_correct_answers: 0,
      total_incorrect_answers: 0,
    };

    // Create placement test
    await axios.post("http://localhost:3000/tests/placement", placementTestData);
    navigate("/login");
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message[0] || "Registration failed");
    } else {
      toast.error(error.message || "An error occurred");
    }
  }
};
  return (
    <div className={styles.background}>
      <div className={styles.registerModal}>
        <div className={styles.registerFormContainer}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h1>Create an account</h1>
            <input type="text" name="fullname" placeholder="Full name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />

            {/* Password Field */}
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span className={styles.icon} onClick={togglePasswordVisibility} role="button">
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </span>
            </div>

            <button type="submit">Register</button>

            <div className={styles.smallText}>
              <span>Already have an account?</span> <a href="/login">Log in</a>
            </div>
          </form>
        </div>
        <div className={styles.image}>
          <img src="/login.png" alt="Relevant illustration" />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
