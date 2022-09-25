import React, { useEffect, useRef, useState } from "react";
import { combineClassNames, gameModes, inputValueIsValid } from "../../util";
import styles from "./RgbInputFields.module.css";

export default function RgbInputFields(props) {
  const [inputRgbValues, setInputRgbValues] = useState(["", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef()];
  const firstRefCurrent = inputRefs[0] && inputRefs[0].current;

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
      {"rgb("}
      {[0, 1, 2].map((index) => {
        return (
          <span key={index}>
            <input
              className={combineClassNames(styles.rgbInputField)}
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
              readOnly={props.gameMode === gameModes.JUDGED}
            />
            {index < 2 && ","}
          </span>
        );
      })}
      {")"}
    </div>
  );
}
