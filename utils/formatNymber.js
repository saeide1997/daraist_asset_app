// utils/formatNumber.js

export const formatNumber = (number) => {
  return new Intl.NumberFormat('fa-IR').format(number);
};

export const formatScientificNotation = (number) => {
  const exp = number.toExponential(); // "4e+4"  
  const [base, exponent] = exp.split('e');
  const expNumber = exponent.replace('+', '');
  return `${parseFloat(base)} × 10${toSuperscript(expNumber)}`;
}
function toSuperscript(num) {
  const superscriptMap = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '-': '⁻',
  };
  return num.split('').map(char => superscriptMap[char] || char).join('');
}