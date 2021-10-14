export const OPEN = 'GENERATOR_GAME/OPEN';
export const CLOSE = 'GENERATOR_GAME/CLOSE';
export const ON_CHANGE_MODULES = 'GENERATOR_GAME/ON_CHANGE_MODULES';
export const ON_APPLY_SETTINGS = 'GENERATOR_GAME/ON_APPLY_SETTINGS';
export const ON_CHANGE_DIGIT_COUNT_MINUS = 'GENERATOR_GAME/ON_CHANGE_DIGIT_COUNT_MINUS';
export const ON_CHANGE_MODULES_MINUS = 'GENERATOR_GAME/ON_CHANGE_MODULES_MINUS';
export const ON_CHANGE_OPERATION_TYPE = 'GENERATOR_GAME/ON_CHANGE_OPERATION_TYPE';
export const ON_CHANGE_DIGIT_COUNT = 'GENERATOR_GAME/ON_CHANGE_DIGIT_COUNT';
export const ON_CHANGE_ACTION_COUNT = 'GENERATOR_GAME/ON_CHANGE_ACTION_COUNT';
export const ON_CHANGE_COLUMN_COUNT = 'GENERATOR_GAME/ON_CHANGE_COLUMN_COUNT';
export const ON_CHANGE_TABLE_COUNT = 'GENERATOR_GAME/ON_CHANGE_TABLE_COUNT';

export function applySettings() {
  return {
    type: ON_APPLY_SETTINGS,
  };
}

export function onChangeModules(value) {
  return {
    type: ON_CHANGE_MODULES,
    value,
  };
}

export function onChangeModulesMinus(value) {
  return {
    type: ON_CHANGE_MODULES_MINUS,
    value,
  };
}

export function actionTypeOnChange(value) {
  return {
    type: ON_CHANGE_OPERATION_TYPE,
    value,
  };
}

export function onChangeDigitCount(value) {
  return {
    type: ON_CHANGE_DIGIT_COUNT,
    value,
  };
}

export function onChangeDigitCountMinus(value) {
  return {
    type: ON_CHANGE_DIGIT_COUNT_MINUS,
    value,
  };
}


export function onChangeActionCount(value) {
  return {
    type: ON_CHANGE_ACTION_COUNT,
    value,
  };
}

export const onChangeColumnCount = (value) => ({
  type: ON_CHANGE_COLUMN_COUNT,
  value,
});

export const onChangeTableCount = (value) => ({
  type: ON_CHANGE_TABLE_COUNT,
  value,
});


export const open = () => ({
  type: OPEN,
});

export const close = () => ({
  type: CLOSE,
});
