

export function abacusChipToNumber(array) {
  const fivePart = array.slice(0, 2);
  const fourPart = array.slice(2);
  return fivePart.indexOf(1) * 5 + fourPart.indexOf(0);
}

export const abacusToNumber = (array) => {
  let number = '';
  array.forEach((row) => {
    number += `${abacusChipToNumber(row)}`;
  });
  return number;
};

export function abacusChangeChip(array, i, j) {
  if (j > 1) {
    array[i][2 + array[i].slice(2).indexOf(0)] = 1;
  } else {
    array[i][j === 0 ? 1 : 0] = 1;
  }
  array[i][j] = 0;
  return array;
}
