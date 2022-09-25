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
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

function handleRgbFieldChange(e) {
  const { maxLength, value, name } = e.target;
  const fieldIndex = parseInt(name.split("-")[1]);
  if (value.length >= maxLength) {
    if (fieldIndex < 3) {
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

export {
  generateRandomRgbValues,
  formatRgbValues,
  handleRgbFieldChange,
  shouldUseDarkFont,
  combineClassNames,
};
