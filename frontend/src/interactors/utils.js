import bigInt from 'big-integer';

export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getlength(number) {
  return number.toString().length;
}

export const bitNumbers = (countBit) => {
  return {
    min: bitNumbersMin(countBit),
    max: bitNumbersMax(countBit),
  };
};

function bitNumbersMin(countBit) {
  return Math.pow(10, countBit - 1);
}

function bitNumbersMax(countBit) {
  return Math.pow(10, countBit) - 1;
}

export function randomSign() {
  return !!randomInteger(0, 1);
}

export function arrayRandom(array, bit) {
  const min = 0;
  const max = array.length - 1;
  let result = '';
  if (bit === 1) {
    return array[randomInteger(min + 1, max)];
  }
  for (let i = 0; i < bit; i ++) {
    const element = array[randomInteger(min, max)];
    result += element;
  }
  if (result[0] === '0' && bit > 1) result = result.replace('0', `${array[randomInteger(min + 1, max)]}`);
  return parseFloat(result);
}
export const arrayRandomBigInt = (array, bit) => {
  const min = 0;
  const max = array.length - 1;
  let result = '';
  if (bit === 1) {
    return array[randomInteger(min + 1, max)];
  }
  for (let i = 0; i < bit; i ++) {
    const element = array[randomInteger(min, max)];
    result += element;
  }
  if (result[0] === '0' && bit > 1) result = result.replace('0', `${array[randomInteger(min + 1, max)]}`);
  return bigInt(result);
};

export function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
