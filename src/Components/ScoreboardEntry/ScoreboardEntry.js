import React from "react";
import { combineClassNames } from "../../util";
import styles from "./ScoreboardEntry.module.css";

export default function ScoreboardEntry(props) {
  return (
    <div
      className={combineClassNames(
        styles.scoreboardEntry,
        props.isYourScore && styles.selectedEntry
      )}
    >
      <div>#{props.ranking}</div>
      <div className={styles.screenName}>{props.screenName}</div>
      <div className={styles.score}>{props.score}</div>
    </div>
  );
}
