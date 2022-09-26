import React from "react";
import CountUp from "react-countup";
import { gameModes } from "../../util";
import styles from "./Score.module.css";

export default function Score(props) {
  const cumulativeScores = props.cumulativeScores;
  const start =
    cumulativeScores.length < 2
      ? 0
      : cumulativeScores[cumulativeScores.length - 2];
  const end = cumulativeScores.length === 0 ? 0 : cumulativeScores.slice(-1)[0];
  return (
    <div className={styles.scoreContainerWrapper}>
      <div className={styles.scoreContainer}>
        <CountUp start={start} end={end} delay={0} duration={0.75}>
          {({ countUpRef }) => (
            <div>
              <span className={styles.roundTracker}>
                {cumulativeScores.length}/10{" "}
              </span>
              <>&ensp;</>
              <span ref={countUpRef} />
              {props.gameMode === gameModes.JUDGED && (
                <span className={styles.newPoints}> +{props.roundScore}</span>
              )}
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
}
