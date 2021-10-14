import {
  ON_CHANGE_OPERATION_TYPE,
  ON_CHANGE_DIGIT_COUNT,
  ON_CHANGE_SPEED,
  ON_CHANGE_ACTION_COUNT,
} from './navbar-game-actions';


export const OPEN = 'GAME_AFTERBURNER_MODAL/OPEN';
export const CLOSE = 'GAME_AFTERBURNER_MODAL/CLOSE';
export const ON_CHANGE_MODULES = 'GAME_AFTERBURNER_MODAL/ON_CHANGE_MODULES';
export const ON_APPLY_SETTINGS = 'GAME_AFTERBURNER_MODAL/ON_APPLY_SETTINGS';
export const ON_CHANGE_DIGIT_COUNT_MINUS = 'GAME_AFTERBURNER_MODAL/ON_CHANGE_DIGIT_COUNT_MINUS';
export const ON_CHANGE_MODULES_MINUS = 'GAME_AFTERBURNER_MODAL/ON_CHANGE_MODULES_MINUS';
export const ON_CHANGE_FONT_VALUE = 'GAME_AFTERBURNER_MODAL/ON_CHANGE_FONT_VALUE';
export const ON_CHANGE_IS_VOICE = 'GAME_AFTERBURNER_MODAL/ON_CHANGE_IS_VOICE';

export const open = () => ({
  type: OPEN,
});

export const close = () => ({
  type: CLOSE,
});

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

export function speedOnChange(value) {
  return {
    type: ON_CHANGE_SPEED,
    value,
  };
}

export function onChangeFount(value) {
  return {
    type: ON_CHANGE_FONT_VALUE,
    value,
  };
}

export function onChangeIsVoice(value) {
  return {
    type: ON_CHANGE_IS_VOICE,
    value,
  };
}
