import React from "react";

interface ClockProps {
  seconds: number;
}

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else if (mins > 0) {
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  } else {
    return secs.toString().padStart(2, "0");
  }
};

const Clock: React.FC<ClockProps> = ({ seconds }) => {
  return <span>{formatTime(seconds)}</span>;
};

export default Clock;