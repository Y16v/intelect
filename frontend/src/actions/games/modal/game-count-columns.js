
export const OPEN = 'GAME_COUNT_COLUMNS_MODAL/OPEN';
export const CLOSE = 'GAME_COUNT_COLUMNS_MODAL/CLOSE';
export const ON_CHANGE_MODULES = 'GAME_COUNT_COLUMNS_MODAL/ON_CHANGE_MODULES';
export const ON_APPLY_SETTINGS = 'GAME_COUNT_COLUMNS_MODAL/ON_APPLY_SETTINGS';
export const ON_CHANGE_DIGIT_COUNT_MINUS = 'GAME_COUNT_COLUMNS_MODAL/ON_CHANGE_DIGIT_COUNT_MINUS';
export const ON_CHANGE_MODULES_MINUS = 'GAME_COUNT_COLUMNS_MODAL/ON_CHANGE_MODULES_MINUS';
export const ON_CHANGE_OPERATION_TYPE = 'GAME_COUNT_COLUMNS_MODAL/ON_CHANGE_OPERATION_TYPE';
export const ON_CHANGE_DIGIT_COUNT = 'GAME_COUNT_COLUMNS_MODAL/ON_CHANGE_DIGIT_COUNT';
export const ON_CHANGE_ACTION_COUNT = 'GAME_COUNT_COLUMNS_MODAL/ON_CHANGE_ACTION_COUNT';

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


export const open = () => ({
  type: OPEN,
});

export const close = () => ({
  type: CLOSE,
});
