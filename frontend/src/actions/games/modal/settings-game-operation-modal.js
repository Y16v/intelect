export const OPEN_SETTINGS = 'GAME_OPERATION_MODAL/OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'GAME_OPERATION_MODAL/CLOSE_SETTINGS';
export const CHOOSE_ACTION_TYPE_MODAL_CLOSE= 'GAME_OPERATION_MODAL/CHOOSE_ACTION_TYPE_MODAL_CLOSE';
export const CHOOSE_ACTION_TYPE_MODAL_OPEN = 'GAME_OPERATION_MODAL/CHOOSE_ACTION_TYPE_MODAL_OPEN';
export const SELECT_ACTION_TYPE = 'GAME_OPERATION_MODAL/SELECT_ACTION_TYPE';
export const ON_SELECT_DIGIT_ONE = 'GAME_OPERATION_MODAL/ON_SELECT_DIGIT_ONE';
export const ON_SELECT_DIGIT_TWO = 'GAME_OPERATION_MODAL/ON_SELECT_DIGIT_TWO';
export const APPLY_SETTINGS = 'GAME_OPERATION_MODAL/APPLY_SETTINGS';
export const ON_CHANGE_MODULES_ONE = 'GAME_OPERATION_MODAL/ON_CHANGE_MODULES_ONE';
export const ON_CHANGE_MODULES_TWO = 'GAME_OPERATION_MODAL/ON_CHANGE_MODULES_TWO';
export const ON_CHANGE_RTL = 'GAME_OPERATION_MODAL/ON_CHANGE_RTL';

export const open = () => ({
  type: OPEN_SETTINGS,
});

export const close = () => ({
  type: CLOSE_SETTINGS,
});

export const handleCloseActionTypeModal = () => ({
  type: CHOOSE_ACTION_TYPE_MODAL_CLOSE,
});

export const openActionTypeModal = () => ({
  type: CHOOSE_ACTION_TYPE_MODAL_OPEN,
});

export const onSelectActionType = (value) => ({
  type: SELECT_ACTION_TYPE,
  value,
});

export const onSelectDigitCountOne = (value) => ({
  type: ON_SELECT_DIGIT_ONE,
  value,
});

export const onSelectDigitCountTwo = (value) => ({
  type: ON_SELECT_DIGIT_TWO,
  value,
});

export const applySettings = () => ({
  type: APPLY_SETTINGS,
});

export const onChangeModulesOne = (value) => ({
  type: ON_CHANGE_MODULES_ONE,
  value,
});

export const onChangeModulesTwo = (value) => ({
  type: ON_CHANGE_MODULES_TWO,
  value,
});

export const onChangeRTL = () => ({
  type: ON_CHANGE_RTL,
});
