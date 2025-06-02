// placement.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Placement.module.css";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1. Discover Your Level",
    description:
      "Begin with our placement test. That's the best way we can figure out your level.",
    image: "/step1.png",
  },
  {
    title: "Step 2. Get Personalized Results",
    description:
      "Once you complete the test, we analyze your answers and determine your current level.",
    image: "/step2.png",
  },
  {
    title: "Step 3. Start Your Journey",
    description:
      "Dive into lessons tailored to your level. Track your progress, and celebrate any improvement.",
    image: "/step3.png",
  },
];

const Placement: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>How It Works</h1>
      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={styles.stepCard}
            initial={{ opacity: 0, y: 20 }}
            animate={
              currentStep >= index
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <img
              src={step.image}
              alt={`Step ${index + 1}`}
              className={styles.image}
            />
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p className={styles.description}>{step.description}</p>
          </motion.div>
        ))}
      </div>

      <p className={styles.subtitle}>
        Are you ready to take a quick placement test to find out your level?
      </p>

      <button className={styles.button} onClick={() => navigate("/test-info")}>
        Let's begin!
      </button>
    </div>
  );
};

export default Placement;
