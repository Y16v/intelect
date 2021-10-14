import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  CBRT,
  DIGIT_COUNT_ONE_DEFAULT,
  DIGIT_COUNT_TWO_DEFAULT,
  getDigits,
  MULTIPLY,
  SQRT,
  STEP_ONE,
  STEP_START,
  STEP_TWO,
} from '../../interactors/multiplier/multiplier';
import {
  ANSWER_VALUE_ON_CHANGE,
  CLOSE_ALL_RESULT_MODAL,
  ON_ANSWER,
  ON_FINISH,
  ON_NEXT,
  ON_SUBMIT_FETCH,
  OPEN_ALL_RESULT_MODAL,
  START_GAME,
  SUBMIT_RESULT_ERROR,
  SUBMIT_RESULT_SUCCESS,
} from '../../actions/games/multiplier';
import {
  APPLY_SETTINGS,
  ON_CHANGE_MODULES_ONE,
  ON_CHANGE_MODULES_TWO,
  ON_CHANGE_RTL,
  ON_SELECT_DIGIT_ONE,
  ON_SELECT_DIGIT_TWO,
  SELECT_ACTION_TYPE,
} from '../../actions/games/modal/settings-game-operation-modal';

const INITIAL_STATE = {
  step: STEP_START,
  timeBegin: null,
  spentTime: null,
  isError: false,
  answerValue: '',
  expect: null,
  digits: getDigits(5, 5, [], [], MULTIPLY),
  actionType: MULTIPLY,
  digitCountOne: DIGIT_COUNT_ONE_DEFAULT,
  digitCountTwo: DIGIT_COUNT_TWO_DEFAULT,
  modulesOne: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  modulesTwo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  results: [],
  isSubmitLoading: false,
  isRTL: false,
  isOpenAllResultModal: false,
};

export default createReducer(
    {
      [START_GAME]: (state, action) => merge({}, state, {
        timeBegin: Date.now(),
        step: STEP_ONE,
      }),
      [ANSWER_VALUE_ON_CHANGE]: (state, action) => merge({}, state, {
        answerValue: action.value,
      }),
      [ON_NEXT]: (state, action) => merge({}, state, {
        step: STEP_ONE,
        timeBegin: Date.now(),
        digits: getDigits(
            state.digitCountOne,
            state.digitCountTwo,
            state.modulesOne,
            state.modulesTwo,
            state.actionType,
        ),
        isError: false,
        answerValue: '',
      }),
      [ON_ANSWER]: (state, action) => {
        const spentTime = (Date.now() - state.timeBegin) / 1000;
        return merge({}, state, {
          expect: action.expect,
          isError: action.isError,
          answerValue: action.answer,
          spentTime,
          step: STEP_TWO,
          results: [...state.results, {
            digits: state.digits,
            answer: isNaN(parseFloat(action.answer)) ? null : action.answer,
            exact: `${action.expect}`,
            action_count: null,
            action_type: state.actionType,
            speed: spentTime,
            count_digits: state.digitCountOne,
            count_digit_minus: state.digitCountTwo,
            modules: (state.modulesOne || []).join(','),
            modules_minus: (state.modulesTwo || []).join(','),
          }],
        });
      },
      [ON_FINISH]: (state, action) => merge({}, INITIAL_STATE, {
        digits: getDigits(
            DIGIT_COUNT_ONE_DEFAULT, DIGIT_COUNT_TWO_DEFAULT, [], [], state.actionType,
        ),
      }),
      [SELECT_ACTION_TYPE]: (state, action) => merge({}, state, {
        actionType: action.value,
        digitCountOne: [SQRT, CBRT].includes(action.value) && state.digitCountOne > 4 ? 4: state.digitCountOne,
      }),
      [ON_SELECT_DIGIT_ONE]: (state, action) => merge({}, state, {
        digitCountOne: action.value,
        digitCountTwo: action.value < state.digitCountTwo ? action.value : state.digitCountTwo,
      }),
      [ON_SELECT_DIGIT_TWO]: (state, action) => merge({}, state, {
        digitCountTwo: action.value,
      }),
      [APPLY_SETTINGS]: (state, action) => merge({}, state, {
        digits: getDigits(
            state.digitCountOne,
            state.digitCountTwo,
            state.modulesOne,
            state.modulesTwo,
            state.actionType,
        ),
      }),
      [ON_CHANGE_MODULES_ONE]: (state, action) => merge({}, state, {
        modulesOne: action.value,
      }),
      [ON_CHANGE_MODULES_TWO]: (state, action) => merge({}, state, {
        modulesTwo: action.value,
      }),
      [ON_SUBMIT_FETCH]: (state, action) => merge({}, state, {isSubmitLoading: true}),
      [SUBMIT_RESULT_SUCCESS]: (state, action) => merge({}, state, {isSubmitLoading: false}),
      [SUBMIT_RESULT_ERROR]: (state, action) => merge({}, state, {isSubmitLoading: false}),
      [ON_CHANGE_RTL]: (state, action) => merge({}, state, {isRTL: !state.isRTL}),
      [OPEN_ALL_RESULT_MODAL]: (state, action) => merge({}, state, {
        isOpenAllResultModal: true,
      }),
      [CLOSE_ALL_RESULT_MODAL]: (state, action) => merge({}, state, {
        isOpenAllResultModal: false,
      }),

    }, INITIAL_STATE);
