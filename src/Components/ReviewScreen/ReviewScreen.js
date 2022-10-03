import { getRankingsWithTies } from "../../util";
import PredictionSummary from "../PredictionSummary.js/PredictionSummary";
import ScoreboardEntry from "../ScoreboardEntry/ScoreboardEntry";
import styles from "./ReviewScreen.module.css";

export default function ReviewScreen(props) {
  const [leaderboardRankings, yourRanking] = getRankingsWithTies(
    props.scoreboard.scores,
    props.submittedScoreId
  );

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
        <div className={styles.bigFont}>
          {props.totalScore}
          <span className={styles.yourRanking}>#{yourRanking}</span>
        </div>
        <div className={styles.restartTextTable}>
          <div className={styles.enterSymbol}>↩</div>
          <div className={styles.restOfTryAgainText}>to try again</div>
        </div>
      </div>
      <div className={styles.scoreboardContainer}>
        {props.scoreboard.loading ? (
          <div>loading...</div>
        ) : props.scoreboard.error ? (
          <div>error</div>
        ) : (
          props.scoreboard.scores
            .slice(0, 10)
            .map((scoreEntry, i) => (
              <ScoreboardEntry
                key={scoreEntry.id}
                screenName={scoreEntry.data().screenName}
                score={scoreEntry.data().score}
                ranking={leaderboardRankings[i]}
                isYourScore={props.submittedScoreId === scoreEntry.id}
              />
            ))
        )}
      </div>
    </div>
  );
}
