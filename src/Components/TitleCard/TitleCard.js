import React, { useEffect, useState } from "react";
import { formatRgbValues, generateRandomRgbValues } from "../../util";
import styles from "./TitleCard.module.css";

export default function TitleCard() {
  const [randomColor, setRandomColor] = useState([0, 0, 0]);

  useEffect(() => {
    const colorInterval = setInterval(
      () => setRandomColor(generateRandomRgbValues()),
      2000
    );
    return () => clearInterval(colorInterval);
  }, []);

  return (
    <div
      className={styles.gameTitle}
      style={{ color: formatRgbValues(...randomColor) }}
    >
      rugb
    </div>
  );
}
