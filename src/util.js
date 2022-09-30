import DeltaE from "delta-e";
import space from "color-space";

function generateRandomEightBitInteger() {
  return Math.floor(Math.random() * 255);
}

function generateRandomRgbValues() {
  return [
    generateRandomEightBitInteger(),
    generateRandomEightBitInteger(),
    generateRandomEightBitInteger(),
  ];
}

function formatRgbValues(r, g, b) {
  return `rgb(${r},${g},${b})`;
}

function handleRgbFieldChange(e) {
  const { maxLength, value, name } = e.target;
  const fieldIndex = parseInt(name.split("-")[1]);
  if (value.length >= maxLength) {
    if (fieldIndex < 2) {
      const nextSibling = document.querySelector(
        `input[name=rgb-${fieldIndex + 1}]`
      );
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  }
}

function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function inputValueIsValid(value) {
  return !isNaN(value) && parseInt(value) >= 0 && parseInt(value) < 256;
}

function createDeltaEDict(l, a, b) {
  return {
    L: l,
    A: a,
    B: b,
  };
}

function score(actualColor, predictedColor) {
  const actualColorLab = space.rgb.lab(actualColor);
  const predictedColorLab = space.rgb.lab(predictedColor);
  const distance = DeltaE.getDeltaE00(
    createDeltaEDict(...actualColorLab),
    createDeltaEDict(...predictedColorLab)
  );
  return Math.round(Math.max(100 - Math.pow(distance / 1.9, 1.6), 0));
}

const gameModes = {
  WAITING_FOR_GUESS: Symbol("waiting"),
  JUDGED: Symbol("judged"),
  SHOW_RESULTS: Symbol("results"),
};

export {
  generateRandomRgbValues,
  formatRgbValues,
  handleRgbFieldChange,
  combineClassNames,
  inputValueIsValid,
  score,
  gameModes,
};
