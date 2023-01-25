import React from "react";
import styles from "./ProgressBar.module.css";

interface progressBarProps {
  progress: number;
}

const ProgressBar = (props: progressBarProps) => {
  const progressStyles = {
    width: `${props.progress}%`,
  };

  return (
    <div className={styles.progressBarOf}>
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-label="Progresso dos hábitos do dia"
        aria-valuenow={props.progress}
        style={progressStyles}
      ></div>
    </div>
  );
};

export default ProgressBar;
