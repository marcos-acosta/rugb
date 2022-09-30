import React from "react";
import { formatRgbValues } from "../../util";
import styles from "./PredictionSummary.module.css";

export default function PredictionSummary(props) {
  return (
    <div className={styles.predictionSummaryContainer}>
      <div
        className={styles.colorContainerLeft}
        style={{ backgroundColor: formatRgbValues(...props.actualColor) }}
      />
      <div
        className={styles.colorContainerRight}
        style={{ backgroundColor: formatRgbValues(...props.predictedColor) }}
      />
      <div className={styles.scoreContainer}>
        +<span className={styles.boldText}>{props.score}</span>
      </div>
    </div>
  );
}
