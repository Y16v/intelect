import {arrayRandom, arrayRandomBigInt, randomInteger} from '../utils';
import bigInt from 'big-integer';
export const STEP_START = 0;
export const STEP_ONE = 1;
export const STEP_TWO = 2;
export const STEP_THREE = 2;

export const MULTIPLY = '×';
export const DIVIDE = '/';
export const QUIRE = '2';
export const CUBE = '3';
export const CBRT = '∛';
export const SQRT = '√';

export const DIGIT_COUNT_ONE_DEFAULT = 5;
export const DIGIT_COUNT_TWO_DEFAULT = 3;

export function getDigit(bit, modules = []) {
  if (!modules.length) modules = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (bit > 1) modules = [...modules];
  return arrayRandomBigInt(modules, bit);
}

export function getDigits(bitOne, bitTwo, modulesOne = [], modulesTwo = [], type = CUBE) {
  if (type === MULTIPLY) {
    return [
      getDigit(bitOne, modulesOne),
      getDigit(bitTwo, modulesTwo),
    ];
  } else if (type === DIVIDE) {
    const diffBit = bitOne - bitTwo;
    const digitTwo = getDigit(bitTwo, modulesTwo);
    let digitOne;
    if (typeof digitTwo === 'number') digitOne = digitTwo * randomInteger(2, Math.pow(10, diffBit || 1));
    else digitOne = digitTwo.multiply(bigInt(`${randomInteger(2, Math.pow(10, diffBit || 1))}`));
    return [
      digitOne,
      digitTwo,
    ];
  } else if (type === SQRT) {
    const sqrt = arrayRandom(modulesOne, bitOne);
    return [
      sqrt ** 2,
      undefined,
    ];
  } else if (type === CBRT) {
    const cbrt = arrayRandom(modulesOne, bitOne);
    return [
      cbrt ** 3,
      undefined,
    ];
  } else {
    return [
      getDigit(bitOne, modulesOne),
      null,
    ];
  }
}

export const getExpect = (digitOne, digitTwo, type) => {
  if (type === MULTIPLY) {
    return typeof digitOne === 'number' ? digitOne * digitTwo : digitOne.multiply(digitTwo);
  } else if (type === DIVIDE) {
    return typeof digitOne === 'number' ? digitOne / digitTwo : digitOne.divide(digitTwo);
  } else if (type === QUIRE) {
    return typeof digitOne === 'number' ? digitOne * digitOne : digitOne.square();
  } else if (type === CUBE) {
    return typeof digitOne === 'number' ? digitOne * digitOne * digitOne : digitOne.multiply(digitOne.square());
  } else if (type === SQRT) {
    return Math.sqrt(digitOne);
  } else if (type === CBRT) {
    return Math.cbrt(digitOne);
  }
};

export const isEqualBigInt = (digitOne, digitTwo) => {
  return digitOne.eq ? digitOne.eq(digitTwo) : `${digitOne}` === `${digitTwo}`;
};

export const getSpaces = (count) => {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += ' ';
  }
  return result;
};
