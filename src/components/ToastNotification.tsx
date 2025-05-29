import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ToastNotification.module.css";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const ToastNotification: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>✖</button>
    </div>,
    document.getElementById("toast-root") as HTMLElement
  );
};

export default ToastNotification;