import React, { useEffect, useRef, useState } from "react";
import { combineClassNames, gameModes, inputValueIsValid } from "../../util";
import styles from "./RgbInputFields.module.css";

export default function RgbInputFields(props) {
  const [inputRgbValues, setInputRgbValues] = useState(["", "", ""]);
  const [inputIsValid, setInputIsValid] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef()];
  const firstRefCurrent = inputRefs[0] && inputRefs[0].current;
  const isJudged = props.gameMode === gameModes.JUDGED;
  const isExactlyCorrect =
    props.actualColor &&
    props.actualColor
      .map((actual, i) => actual === parseInt(inputRgbValues[i]))
      .reduce((partialAnd, b) => partialAnd && b, true);

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      if (!inputValueIsValid(inputRgbValues[i])) {
        setInputIsValid(false);
        return;
      }
    }
    setInputIsValid(true);
  }, [inputRgbValues, setInputIsValid]);

  function submitAnswer() {
    for (let i = 0; i < 3; i++) {
      if (!inputValueIsValid(inputRgbValues[i])) {
        inputRefs[i].current.focus();
        inputRefs[i].current.select();
        return;
      }
    }
    props.sendAnswer(inputRgbValues.map((val) => parseInt(val)));
  }

  function onKeyDown({ key }) {
    if (key === "Enter" && props.gameMode === gameModes.WAITING_FOR_GUESS) {
      submitAnswer();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (props.gameMode === gameModes.WAITING_FOR_GUESS) {
      setInputRgbValues(["", "", ""]);
      if (firstRefCurrent) {
        firstRefCurrent.focus();
      }
    }
  }, [props.gameMode, firstRefCurrent]);

  function updateRgbValue(position, newValue) {
    setInputRgbValues(
      inputRgbValues.map((value, index) =>
        index === position ? newValue : value
      )
    );
  }

  return (
    <div
      className={combineClassNames(
        styles.rgbInputContainer,
        styles.slightShadow
      )}
    >
      <button
        className={combineClassNames(
          styles.enterPrompt,
          inputIsValid &&
            props.gameMode === gameModes.WAITING_FOR_GUESS &&
            styles.visible
        )}
        onClick={() => {
          submitAnswer();
        }}
      >
        ↩
      </button>
      {"rgb("}
      {[0, 1, 2].map((index) => (
        <span key={index}>
          <input
            className={combineClassNames(
              styles.rgbInputField,
              !isJudged && styles.inheritShadowAndColor,
              isJudged &&
                parseInt(inputRgbValues[index]) !== props.actualColor[index] &&
                styles.strikethrough,
              isJudged &&
                parseInt(inputRgbValues[index]) === props.actualColor[index] &&
                styles.greenText
            )}
            type="text"
            name={`rgb-${index}`}
            maxLength="3"
            onChange={(e) => {
              updateRgbValue(index, e.target.value);
            }}
            value={inputRgbValues[index]}
            placeholder={"RGB".charAt(index)}
            autoComplete="off"
            autoFocus={index === 0}
            ref={inputRefs[index]}
            readOnly={isJudged}
          />
          {index < 2 && ","}
        </span>
      ))}
      {")"}
      <br />
      {isJudged &&
        (isExactlyCorrect ? (
          <span className={styles.greenText}>
            <i>PERFECT!</i>
          </span>
        ) : (
          <span className={styles.invisibleText}>
            {"rgb("}
            {props.actualColor.map((value, index) => (
              <span key={index}>
                <input
                  defaultValue={value}
                  readOnly={true}
                  className={combineClassNames(
                    styles.rgbInputField,
                    parseInt(inputRgbValues[index]) ===
                      props.actualColor[index] && styles.invisibleText
                  )}
                />
                {index < 2 && ","}
              </span>
            ))}
            {")"}
          </span>
        ))}
    </div>
  );
}
