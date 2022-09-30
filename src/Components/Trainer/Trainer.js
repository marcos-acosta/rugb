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
import ReviewScreen from "../ReviewScreen/ReviewScreen";

export default function Trainer() {
  const [actualColor, setActualColor] = useState(generateRandomRgbValues());
  const [predictedColor, setPredictedColor] = useState([]);
  const [gameMode, setGameMode] = useState(gameModes.WAITING_FOR_GUESS);
  const [roundScores, setRoundScores] = useState([]);
  const [cumulativeScores, setCumulativeScores] = useState([]);
  const [actualColorHistory, setActualColorHistory] = useState([]);
  const [predictedColorHistory, setPredictedColorHistory] = useState([]);

  const NUM_ROUNDS = 10;

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
    setActualColorHistory([...actualColorHistory, actualColor]);
    setPredictedColorHistory([...predictedColorHistory, predColor]);
  }

  function resetToNextColor() {
    setActualColor(generateRandomRgbValues());
    setGameMode(gameModes.WAITING_FOR_GUESS);
  }

  function showResults() {
    setGameMode(gameModes.SHOW_RESULTS);
  }

  function resetToNewGame() {
    setActualColorHistory([]);
    setRoundScores([]);
    setPredictedColor([]);
    setCumulativeScores([]);
    setPredictedColorHistory([]);
    resetToNextColor();
  }

  function onKeyDown({ key }) {
    if (key === "Enter" && gameMode === gameModes.JUDGED) {
      if (roundScores.length === NUM_ROUNDS) {
        showResults();
      } else {
        resetToNextColor();
      }
    } else if (key === "Enter" && gameMode === gameModes.SHOW_RESULTS) {
      resetToNewGame();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      className={combineClassNames(
        styles.colorScreen,
        gameMode === gameModes.SHOW_RESULTS && styles.colorScreenUp
      )}
      style={{ backgroundColor: formatRgbValues(...actualColor) }}
    >
      {gameMode === gameModes.SHOW_RESULTS ? (
        <ReviewScreen
          scores={roundScores}
          predictedColors={predictedColorHistory}
          actualColors={actualColorHistory}
          totalScore={cumulativeScores.slice(-1)[0]}
        />
      ) : (
        <Score
          cumulativeScores={cumulativeScores}
          roundScore={roundScores.length === 0 ? 0 : roundScores.slice(-1)[0]}
          gameMode={gameMode}
          numRounds={NUM_ROUNDS}
        />
      )}
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
        {gameMode !== gameModes.SHOW_RESULTS && (
          <RgbInputFields
            actualColor={actualColor}
            sendAnswer={acceptAnswer}
            gameMode={gameMode}
          />
        )}
      </div>
    </div>
  );
}
