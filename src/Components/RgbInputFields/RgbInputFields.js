import React, { useState } from "react";
import { combineClassNames, shouldUseDarkFont } from "../../util";
import styles from "./RgbInputFields.module.css";

export default function RgbInputFields(props) {
  const [inputRgbValues, setInputRgbValues] = useState(["", "", ""]);
  const darkFont = shouldUseDarkFont(...props.actualColor);

  function updateRgbValue(position, newValue) {
    setInputRgbValues(
      inputRgbValues.map((value, index) =>
        index === position - 1 ? newValue : value
      )
    );
  }

  return (
    <div
      className={combineClassNames(
        styles.rgbInputContainer,
        darkFont ? styles.fainterDarkFont : styles.fainterLightFont,
        styles.slightShadow
      )}
    >
      {"rgb("}
      {[1, 2, 3].map((index) => {
        return (
          <span key={index}>
            <input
              key={index}
              className={combineClassNames(
                styles.rgbInputField,
                darkFont ? styles.darkFont : styles.lightFont
              )}
              type="text"
              name={`rgb-${index}`}
              maxLength="3"
              onChange={(e) => {
                updateRgbValue(index, e.target.value);
              }}
              value={inputRgbValues[index - 1]}
              placeholder={"RGB".charAt(index - 1)}
              autoComplete="off"
              autoFocus={index === 1}
            />
            {index < 3 && ","}
          </span>
        );
      })}
      {")"}
    </div>
  );
}
