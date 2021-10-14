import {arrayRandom, bitNumbers, randomInteger, randomSign} from '../utils';

export const ACTION_COUNT_DEFAULT = 5;
export const DIGIT_COUNT_DEFAULT = 5;

export function getListArithmeticOnlyPlus(count, bit) {
  const result = [];
  const {min, max} = bitNumbers(bit);
  for (let i = 0; i < count; i++) {
    result.push(randomInteger(min, max));
  }
  return result;
}

export function getListArithmetic(count, bit) {
  const {min, max} = bitNumbers(bit);
  const result = [randomInteger(min, max)];
  for (let i = 1; i < count; i++) {
    if (randomSign()) {
      result.push(randomInteger(min, max));
    } else {
      result.push(generateNegativeNumber(min, max, result));
    }
  }
  return result;
}

export function getListArithmeticOnlyMinus(count, bit) {
  const {min, max} = bitNumbers(bit);
  let result = [];
  for (let i = 0; i < count - 1; i++) {
    result.push(randomInteger(min, max));
  }
  const startNumber = executeArithmetic(result) + randomInteger(0, max);
  result = result.map((n) => -n);
  result.unshift(startNumber);
  return result;
}

export function getPlayerArithmetic(count, bit, playerCount) {
  const result = Array(playerCount);
  return result.map(() => getListArithmetic(count, bit));
}

function generateNegativeNumber(min, max, results) {
  const sum = executeArithmetic(results);
  let answer = min;
  if (min < sum && sum < max) {
    answer = randomInteger(min, sum);
  } else if (sum >= max) {
    answer = randomInteger(min, max);
  } else {
    answer = min;
  }
  return sum === 0 || sum < answer ? answer : -answer;
}

export function executeArithmetic(array) {
  return array.reduce((a, b) => a + b, 0);
}


export const ACTION_TYPES = {
  '+': getDigitsOnlyPlus,
  '+/-': getDigits,
  '-': getDigitsOnlyMinus,
};

export const applyAction = (actionType, actionCount, countDigit, countDigitMinus, modules, modulesMinus) => {
  let digits = [];
  if (actionType === ACTION_SYMBOL.plus) {
    digits = getListArrayOnlyPlus(actionCount, countDigit, [0, ...modules]);
  } else if (actionType === ACTION_SYMBOL.minus) {
    digits = getListArrayOnlyMinus(actionCount, countDigitMinus, [0, ...modulesMinus]);
  } else {
    digits = getPlusMinusArithmeticDiff(
        actionCount,
        countDigit,
        countDigitMinus,
        [0, ...modules],
        [0, ...modulesMinus]);
  }
  return digits;
};

export const ACTION_SYMBOL = {
  plus: '+',
  plus_minus: '+/-',
  minus: '-',
};

export function getListArrayOnlyMinus(count, bit, array) {
  let result = [];
  for (let i = 0; i < count - 1; i++) {
    result.push(arrayRandom(array, bit));
  }
  const startNumber = executeArithmetic(result) + randomInteger(0, Math.pow(10, bit % 3 + 1));
  result = result.map((n) => -n);
  result.unshift(startNumber);
  return result;
}

export function getListArrayOnlyPlus(count, bit, array) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(arrayRandom(array, bit));
  }
  if (bit === 1 && array.length === 2) result[0] = randomInteger(0, 10);
  return result;
}

export function getPlusMinusArithmetic(count, bit, array) {
  const results = [arrayRandom(array, bit)];
  for (let i = 1; i < count; i++) {
    if (randomSign()) {
      results.push(arrayRandom(array, bit));
    } else {
      results.push(generateNegativeNumberArray(results, array, bit));
    }
  }
  return results;
}

export function generateNegativeNumberArray(results, array, bit) {
  const sum = executeArithmetic(results);
  const res = arrayRandom(array, bit);
  return sum > res ? -res : res;
}

export function getDigits(count, bit, array) {
  if (array === undefined || (array && array.length > 9)) {
    return getListArithmetic(count, bit);
  } else {
    return getPlusMinusArithmetic(count, bit, array);
  }
}

export function getDigitsOnlyMinus(count, bit, array) {
  if (array === undefined || (array && array.length > 9)) {
    return getListArithmeticOnlyMinus(count, bit);
  } else {
    return getListArrayOnlyMinus(count, bit, array);
  }
}

export function getDigitsOnlyPlus(count, bit, array) {
  if (array === undefined || (array && array.length > 9)) {
    return getListArithmeticOnlyPlus(count, bit);
  } else {
    return getListArrayOnlyPlus(count, bit, array);
  }
}

export function getPlusMinusArithmeticDiff(count, bit, bitMinus, array, arrayMinus) {
  const results = [arrayRandom(array, bit)];
  for (let i = 1; i < count; i++) {
    if (randomSign()) {
      results.push(arrayRandom(array, bit));
    } else {
      results.push(generateNegativeNumberArray(results, arrayMinus, bitMinus));
    }
  }
  return results;
}
