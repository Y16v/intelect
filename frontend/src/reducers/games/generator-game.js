import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  ON_APPLY_SETTINGS,
  ON_CHANGE_ACTION_COUNT,
  ON_CHANGE_COLUMN_COUNT,
  ON_CHANGE_DIGIT_COUNT,
  ON_CHANGE_DIGIT_COUNT_MINUS,
  ON_CHANGE_MODULES,
  ON_CHANGE_MODULES_MINUS,
  ON_CHANGE_OPERATION_TYPE,
  ON_CHANGE_TABLE_COUNT,
} from '../../actions/games/modal/generator-game';
import {applySettings, executeArithmeticDigits} from '../../interactors/generator-game';
import {REPLAY_ON_CLICK_GAME} from '../../actions/games/generator-game';

const INITIAL_STATE = {
  digits: applySettings(
      1,
      10,
      '+/-',
      5,
      1,
      1,
      [0, 1, 2, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 4, 5, 6, 7, 8, 9],
  ),
  actionCount: 5,
  step: 0,
  answer: NaN,
  expect: null,
  timeBegin: null,
  spentTime: null,
  actionType: '+/-',
  countDigit: 1,
  countDigitMinus: 1,
  modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  modulesMinus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  results: [],
  columnCount: 10,
  tableCount: 1,
  answers: [],
};

export default createReducer({
  [ON_CHANGE_OPERATION_TYPE]: (state, action) => merge({}, state, {
    actionType: action.value,
    countDigitMinus: state.countDigitMinus > state.countDigit && action.value === '+/-' ?
            state.countDigit : state.countDigitMinus,
  }),
  [ON_CHANGE_DIGIT_COUNT]: (state, action) => merge({}, state, {
    countDigit: action.value,
    countDigitMinus: state.countDigitMinus > action.value && state.actionType === '+/-' ?
            action.value : state.countDigitMinus,
  }),
  [ON_CHANGE_DIGIT_COUNT_MINUS]: (state, action) => merge({}, state, {
    countDigitMinus: action.value,
  }),
  [ON_CHANGE_ACTION_COUNT]: (state, action) => merge({}, state, {
    actionCount: action.value,
  }),
  [ON_CHANGE_MODULES]: (state, action) => merge({}, state, {
    modules: action.value,
  }),
  [ON_CHANGE_MODULES_MINUS]: (state, action) => merge({}, state, {
    modulesMinus: action.value,
  }),
  [ON_CHANGE_COLUMN_COUNT]: (state, action) => merge({}, state, {
    columnCount: action.value,
  }),
  [ON_CHANGE_TABLE_COUNT]: (state, action) => merge({}, state, {
    tableCount: action.value,
  }),
  [ON_APPLY_SETTINGS]: (state, action) => {
    const digits = applySettings(
        state.tableCount,
        state.columnCount,
        state.actionType,
        state.actionCount,
        state.countDigit,
        state.countDigitMinus,
        state.modules,
        state.modulesMinus,
    );
    const answers = executeArithmeticDigits(digits);
    return merge({}, state, {
      digits,
      answers,
    });
  },
  [REPLAY_ON_CLICK_GAME]: (state, action) => {
    const digits = applySettings(
        state.tableCount,
        state.columnCount,
        state.actionType,
        state.actionCount,
        state.countDigit,
        state.countDigitMinus,
        state.modules,
        state.modulesMinus,
    );
    const answers = executeArithmeticDigits(digits);
    return merge({}, state, {
      digits,
      answers,
    });
  },
}, INITIAL_STATE);
