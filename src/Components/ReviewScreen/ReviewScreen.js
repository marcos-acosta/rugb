import PredictionSummary from "../PredictionSummary.js/PredictionSummary";
import styles from "./ReviewScreen.module.css";

export default function ReviewScreen(props) {
  return (
    <div className={styles.reviewScreenContainer}>
      <div className={styles.summaryTable}>
        {props.scores.map((score, i) => {
          const predictedColor = props.predictedColors[i];
          const actualColor = props.actualColors[i];
          return (
            <PredictionSummary
              score={score}
              predictedColor={predictedColor}
              actualColor={actualColor}
              key={i}
            />
          );
        })}
      </div>
      <div className={styles.totalScore}>
        TOTAL
        <div className={styles.bigFont}>{props.totalScore}</div>
        <div className={styles.restartTextTable}>
          <div className={styles.enterSymbol}>↩</div>
          <div className={styles.restOfTryAgainText}>to try again</div>
        </div>
      </div>
    </div>
  );
}
