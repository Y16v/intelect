import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {ACTION_TYPES, applyAction} from '../../interactors/count-columns/generator';
import {
  BEGIN_TIME,
  CLEAR,
  CLEAR_ANSWER_FIELD,
  ON_CHANGE_ANSWER,
  SUBMIT_RESULT_FAIL,
  SUBMIT_RESULT_FETCH,
  SUBMIT_RESULT_SUCCESS,
  VERIFY_SUBMIT,
} from '../../actions/games/count-columns-game';
import {
  CLOSE,
  ON_APPLY_SETTINGS,
  ON_CHANGE_ACTION_COUNT,
  ON_CHANGE_DIGIT_COUNT,
  ON_CHANGE_DIGIT_COUNT_MINUS,
  ON_CHANGE_MODULES,
  ON_CHANGE_MODULES_MINUS,
  ON_CHANGE_OPERATION_TYPE,
  OPEN as OPEN_SETTINGS,
} from '../../actions/games/modal/game-count-columns';


const INITIAL_STATE = {
  incrementTimer: 0,
  isStarting: false,
  digits: ACTION_TYPES['+/-'](5, 1),
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
  answerValue: '',
  isSubmitLoading: false,


};

export default createReducer(
    {
      [ON_CHANGE_ANSWER]: (state, action) => merge({}, state, {
        answerValue: action.value,
      }),
      [VERIFY_SUBMIT]: (state, action) => merge({}, state, {
        expect: action.expect,
        result: action.result,
        spentTime: (Date.now() - state.timeBegin) / 1000,
        results: [
          ...state.results, {
            digits: state.digits,
            answer: isNaN(parseFloat(state.answer)) ? null : parseFloat(state.answer),
            exact: action.expect,
            action_count: state.actionCount,
            action_type: state.actionType,
            speed: (Date.now() - state.timeBegin) / 1000,
            count_digits: state.countDigit,
            count_digit_minus: state.countDigitMinus,
            modules: (state.modules || []).join(','),
            modules_minus: (state.modulesMinus || []).join(','),
          }],
      }),
      [CLEAR_ANSWER_FIELD]: (state, action) => merge({}, state, {
        answerValue: '',
      }),
      [CLEAR]: (state, action) => merge({}, state, {
        answerValue: '',
        expect: null,
        result: false,
        digits: applyAction(
            state.actionType,
            state.actionCount,
            state.countDigit,
            state.countDigitMinus,
            state.modules,
            state.modulesMinus,
        ),
      }),
      [BEGIN_TIME]: (state, action) => merge({}, state, {
        timeBegin: action.time,
      }),
      [OPEN_SETTINGS]: (state, action) => merge({}, state, {
        answerValue: '',
        digits: action.digits,
        expect: null,
        result: false,
      }),
      [CLOSE]: (state, action) => merge({}, state, {
        timeBegin: Date.now(),
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
        timeBegin: Date.now(),
      }),
      [SUBMIT_RESULT_SUCCESS]: (state, action) => INITIAL_STATE,
      [SUBMIT_RESULT_FETCH]: (state, action) => merge({}, state, {isSubmitLoading: true}),
      [SUBMIT_RESULT_FAIL]: (state, action) => merge({}, state, {isSubmitLoading: false}),


    }, INITIAL_STATE);
