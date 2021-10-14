import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  ANSWER_ON_CHANGE,
  INCREMENT_ACTION, ON_NEXT,
  ON_SUBMIT_ANSwER,
  START_ANSWER_STEP,
  START_DIGITS,
  START_GAME, STOP_PROCESS,
} from '../../actions/games/after_burner_game';
import {ACTION_TYPES, applyAction} from '../../interactors/count-columns/generator';
import {
  CLEAR_GAME,
  ON_CHANGE_ACTION_COUNT,
  ON_CHANGE_DIGIT_COUNT,
  ON_CHANGE_OPERATION_TYPE,
  ON_CHANGE_SPEED,
} from '../../actions/games/modal/navbar-game-actions';
import {
  ON_APPLY_SETTINGS, ON_CHANGE_DIGIT_COUNT_MINUS, ON_CHANGE_IS_VOICE,
  ON_CHANGE_MODULES,
  ON_CHANGE_MODULES_MINUS,
} from '../../actions/games/modal/game-afterburner';
import {LOGOUT} from '../../actions/login/login';

export const STEP_ONE = 1;
export const STEP_TWO = 2;
export const STEP_THREE = 3;
export const STEP_FOUR = 4;

const INITIAL_STATE = {
  incrementTimer: 0,
  isStarting: false,
  digits: ACTION_TYPES['+/-'](5, 1),
  actionCount: 5,
  step: 0,
  answer: 'NONE',
  exact: null,
  timeBegin: null,
  spentTime: null,
  actionType: '+/-',
  countDigit: 1,
  countDigitMinus: 1,
  speed: 1,
  modules: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  modulesMinus: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  results: [],
  isVoice: false,
};

export default createReducer(
    {
      [INCREMENT_ACTION]: (state, action) => merge({}, state, {
        incrementTimer: state.incrementTimer + 1,
      }),
      [START_GAME]: (state, action) => merge({}, state, {
        isStarting: true,
        step: STEP_ONE,
      }),
      [START_DIGITS]: (state, action) => merge({}, state, {
        step: STEP_TWO,
        incrementTimer: 0,
      }),
      [START_ANSWER_STEP]: (state, action) => merge({}, state, {
        step: STEP_THREE,
        incrementTimer: 0,
        timeBegin: Date.now(),
      }),
      [ON_SUBMIT_ANSwER]: (state, action) => merge({}, state, {
        step: STEP_FOUR,
        incrementTimer: 0,
        exact: action.exact,
        spentTime: (Date.now() - state.timeBegin) / 1000,
        results: [...state.results, {
          digits: state.digits,
          answer: isNaN(parseFloat(state.answer)) ? null : parseFloat(state.answer),
          exact: action.exact,
          action_count: state.actionCount,
          action_type: state.actionType,
          speed: state.speed,
          count_digits: state.countDigit,
          count_digit_minus: state.countDigitMinus,
          modules: (state.modules || []).join(','),
          modules_minus: (state.modulesMinus || []).join(','),
        }],
      }),
      [ANSWER_ON_CHANGE]: (state, action) => merge({}, state, {
        answer: action.value,
      }),
      [ON_NEXT]: (state, action) => merge({}, state, {
        step: STEP_ONE,
        incrementTimer: 0,
        digits: applyAction(
            state.actionType,
            state.actionCount,
            state.countDigit,
            state.countDigitMinus,
            state.modules,
            state.modulesMinus,
        ),
        spentTime: null,
        answer: '',
      }),
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
      [ON_CHANGE_SPEED]: (state, action) => merge({}, state, {
        speed: action.value,
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
      [ON_APPLY_SETTINGS]: (state, action) => merge({}, state, {
        digits: applyAction(
            state.actionType,
            state.actionCount,
            state.countDigit,
            state.countDigitMinus,
            state.modules,
            state.modulesMinus,
        ),
      }),
      [CLEAR_GAME]: (state, action) => merge({}, state, INITIAL_STATE),
      [LOGOUT]: (state, action) => INITIAL_STATE,
      [STOP_PROCESS]: (state, action) => merge({}, state, {
        incrementTimer: 0,
        isStarting: false,
        digits: applyAction(
            state.actionType,
            state.actionCount,
            state.countDigit,
            state.countDigitMinus,
            state.modules,
            state.modulesMinus,
        ),
        step: 0,
        answer: 'NONE',
        exact: null,
        timeBegin: null,
        spentTime: null,
      }),
      [ON_CHANGE_IS_VOICE]: (state, action) => merge({}, state, {
        isVoice: action.value,
      }),

    }, INITIAL_STATE);
