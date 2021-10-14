import {applyAction, executeArithmetic} from './count-columns/generator';

export const applySettings = (tableCount, columnCount, actionType, actionCount, countDigit, countDigitMinus, modules, modulesMinus) => {
  const results = [];
  for (let j = 0; j < tableCount; j ++) {
    const result = [];
    for (let i = 0; i < columnCount; i++) {
      result.push(applyAction(actionType, actionCount, countDigit, countDigitMinus, modules, modulesMinus));
    }
    results.push(result);
  }
  return results;
};

export const executeArithmeticDigits = (digits=[]) => {
  return digits.map((table) => table.map((column) => executeArithmetic(column)));
};
