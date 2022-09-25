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

export default function Trainer() {
  const [actualColor, setActualColor] = useState(generateRandomRgbValues());
  const [predictedColor, setPredictedColor] = useState([]);
  const [gameMode, setGameMode] = useState(gameModes.WAITING_FOR_GUESS);

  function acceptAnswer(predColor) {
    setPredictedColor(predColor);
    setGameMode(gameModes.JUDGED);
    console.log(`Actual color: ${actualColor}`);
    console.log(`Score: ${score(actualColor, predColor)}`);
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
