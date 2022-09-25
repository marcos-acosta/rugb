import React, { useState } from "react";
import styles from "./Trainer.module.css";
import { generateRandomRgbValues, formatRgbValues } from "../../util";
import RgbInputFields from "../RgbInputFields/RgbInputFields";

export default function Trainer() {
  const [actualColor, setActualColor] = useState(generateRandomRgbValues());

  return (
    <div
      className={styles.colorScreen}
      style={{ backgroundColor: formatRgbValues(...actualColor) }}
    >
      <div className={styles.centerFloaterContainer}>
        <RgbInputFields actualColor={actualColor} />
      </div>
    </div>
  );
}
