import React, { useState, useEffect } from "react";
import styles from "./Trainer.module.css";
import {
  generateRandomRgbValues,
  formatRgbValues,
  gameModes,
  combineClassNames,
  score,
} from "../../util";
import RgbInputFields from "../RgbInputFields/RgbInputFields";
import Score from "../Score/Score";

export default function Trainer() {
  const [actualColor, setActualColor] = useState(generateRandomRgbValues());
  const [predictedColor, setPredictedColor] = useState([]);
  const [gameMode, setGameMode] = useState(gameModes.WAITING_FOR_GUESS);
  const [roundScores, setRoundScores] = useState([]);
  const [cumulativeScores, setCumulativeScores] = useState([]);

  console.log(roundScores);
  console.log(cumulativeScores);

  function acceptAnswer(predColor) {
    setPredictedColor(predColor);
    setGameMode(gameModes.JUDGED);
    const roundScore = score(actualColor, predColor);
    setRoundScores([...roundScores, roundScore]);
    setCumulativeScores([
      ...cumulativeScores,
      cumulativeScores.length === 0
        ? roundScore
        : cumulativeScores.slice(-1)[0] + roundScore,
    ]);
  }

  function resetToNextColor() {
    setActualColor(generateRandomRgbValues());
    setGameMode(gameModes.WAITING_FOR_GUESS);
  }

  function onKeyDown({ key }) {
    if (key === "Enter" && gameMode === gameModes.JUDGED) {
      resetToNextColor();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      className={styles.colorScreen}
      style={{ backgroundColor: formatRgbValues(...actualColor) }}
    >
      <Score
        cumulativeScores={cumulativeScores}
        roundScore={roundScores.length === 0 ? 0 : roundScores.slice(-1)[0]}
        gameMode={gameMode}
      />
      <div
        className={combineClassNames(
          styles.predictedColorScreen,
          gameMode === gameModes.JUDGED && styles.predictedColorScreenDown
        )}
        style={{ backgroundColor: formatRgbValues(...predictedColor) }}
      />
      <div
        className={combineClassNames(
          styles.centerFloaterContainer,
          gameMode === gameModes.JUDGED && styles.centerFloaterContainerUp
        )}
      >
        <RgbInputFields
          actualColor={actualColor}
          sendAnswer={acceptAnswer}
          gameMode={gameMode}
        />
      </div>
    </div>
  );
}
