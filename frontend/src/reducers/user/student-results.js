import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  CLOSE_RESULT_ITEMS_DIALOG,
  GET_LOOK_UP_STUDENT_SUCCESS,
  GET_STUDENT_RESULTS_FAIL,
  GET_STUDENT_RESULTS_SUCCESS,
  OPEN_RESULT_ITEMS_DIALOG,
  RETRIEVE_RESULT_SUCCESS,
  SET_DIALOG_TO_PRINT,
  SET_PRINT_RESULTS_FORM_VALUE,
  SET_READY_TO_PRINT,
  SET_RESULT_TOTAL,
  SET_RESULTS_DATE_RANGE,
  SET_RESULTS_DATE_RANGE_SELECT_OPTIONS,
  SET_RESULTS_IS_LOADING,
} from '../../actions/user/student';
import {LOGOUT} from '../../actions/login/login';

const INITIAL_STATE = {
  student: {},
  dateRanges: [],
  selectedDateRange: {
    startDate: '',
    endDate: '',
  },
  isResultsLoading: true,
  showResultItems: {
    open: false,
    items: [],
  },
  studentResults: [],
};


export default createReducer({
  [GET_LOOK_UP_STUDENT_SUCCESS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [SET_RESULTS_IS_LOADING]: (state) => merge({}, state, {isResultsLoading: true}),
  [GET_STUDENT_RESULTS_SUCCESS]: (state, action) => merge({}, state, {
    studentResults: action.results,
    total: action.total,
    isResultsLoading: false,
  }),
  [GET_STUDENT_RESULTS_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [SET_RESULT_TOTAL]: (state, action) => merge({}, state, {total: action.total}),
  [SET_RESULTS_DATE_RANGE_SELECT_OPTIONS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [SET_RESULTS_DATE_RANGE]: (state, action) => ({
    ...state,
    selectedDateRange: {...action},
  }),
  [RETRIEVE_RESULT_SUCCESS]: (state, action) => merge({}, state, {lookUpResult: action.result}),
  [SET_DIALOG_TO_PRINT]: (state, action) => merge({}, state, {resultsToPrint: {...action}}),
  [SET_READY_TO_PRINT]: (state, action) => merge({}, state, {resultsToPrint: {...action}}),
  [SET_PRINT_RESULTS_FORM_VALUE]: (state, action) => merge({}, state, {
    resultsToPrint: {
      ...state.resultsToPrint,
      [action.field]: action.value,
    },
  }),
  [LOGOUT]: (state, action) => INITIAL_STATE,
  [OPEN_RESULT_ITEMS_DIALOG]: (state, action) => ({
    ...state,
    showResultItems: {
      open: true,
      items: action.items,
    },
  }),
  [CLOSE_RESULT_ITEMS_DIALOG]: (state) => ({
    ...state,
    showResultItems: {
      open: false,
      items: [],
    },
  }),
}, INITIAL_STATE);
