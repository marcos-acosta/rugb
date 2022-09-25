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

function shouldUseDarkFont(r, g, b) {
  // return r * 0.299 + g * 0.587 + b * 0.114 > 200;
  return true;
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

function score(actualColor, predictedColor) {
  return Math.max(
    1 -
      actualColor
        .map((value, i) => Math.abs(value - predictedColor[i]))
        .reduce((partialSum, a) => partialSum + a, 0) /
        (128 * 3),
    0
  );
}

const gameModes = {
  WAITING_FOR_GUESS: Symbol("waiting"),
  JUDGED: Symbol("judged"),
};

export {
  generateRandomRgbValues,
  formatRgbValues,
  handleRgbFieldChange,
  shouldUseDarkFont,
  combineClassNames,
  inputValueIsValid,
  score,
  gameModes,
};
