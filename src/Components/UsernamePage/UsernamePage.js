import React, { useEffect, useState } from "react";
import {
  combineClassNames,
  formatRgbValues,
  generateRandomRgbValues,
} from "../../util";
import styles from "./UsernamePage.module.css";

export default function UsernamePage(props) {
  const [currentUsername, setCurrentUsername] = useState("");
  const [randomColor, setRandomColor] = useState([0, 0, 0]);

  function onKeyDown({ key }) {
    if (key === "Enter" && currentUsername) {
      props.setUsername(currentUsername);
    }
  }

  useEffect(() => {
    const colorInterval = setInterval(
      () => setRandomColor(generateRandomRgbValues()),
      2000
    );
    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      className={combineClassNames(
        styles.fullWidthContainer,
        props.disappear && styles.invisible
      )}
    >
      <div className={styles.usernameInputContainer}>
        <div
          className={styles.gameTitle}
          style={{ color: formatRgbValues(...randomColor) }}
        >
          rugb
        </div>
        <input
          className={styles.usernameInput}
          maxLength="10"
          placeholder="screen name"
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
          autoFocus={true}
          style={{
            width: currentUsername
              ? `calc(${currentUsername.length}ch + 40px)`
              : "800px",
          }}
        />
        {currentUsername && (
          <button
            className={combineClassNames(
              styles.enterPrompt,
              currentUsername && styles.visible
            )}
            onClick={() => props.setUsername(currentUsername)}
          >
            ↩
          </button>
        )}
      </div>
    </div>
  );
}
