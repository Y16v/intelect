import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  CLOSE_RESULT_ITEMS_DIALOG,
  GET_RESULT_ARCHIVES_FAIL,
  GET_RESULT_ARCHIVES_SUCCESS,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAIL,
  SHOW_RESULT_ITEMS_DIALOG,
  SET_ARCHIVES_DATE_RANGE,
  SET_ARCHIVES_DATE_RANGE_SELECT_OPTIONS, SET_ARCHIVES_IS_LOADING,
} from '../../actions/school/student-result-archive';


export const INITIAL_STATE = {
  student: {},
  archives: [],
  showResultItems: {
    open: false,
    items: [],
  },
  dateRanges: [],
  selectedDateRange: {
    startDate: '',
    endDate: '',
  },
  isResultsLoading: true,
  chartData: {
    dates: [],
    points: [],
  },
  getResultArchivesError: '',
  notFoundOrPermissionDenied: false,
  unknownError: false,
  errorMessage: '',
};


export default createReducer({
  [GET_STUDENT_SUCCESS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [GET_STUDENT_FAIL]: (state, action) => merge({}, state, {...action}),
  [SET_ARCHIVES_IS_LOADING]: (state, action) => merge({}, state, {isResultsLoading: true}),
  [GET_RESULT_ARCHIVES_SUCCESS]: (state, action) => ({
    ...state,
    ...action,
    isResultsLoading: false,

  }),
  [GET_RESULT_ARCHIVES_FAIL]: (state, action) => merge({}, state, {
    getResultArchivesError: action.error,
    isResultsLoading: false,
  }),
  [SET_ARCHIVES_DATE_RANGE_SELECT_OPTIONS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [SET_ARCHIVES_DATE_RANGE]: (state, action) => ({
    ...state,
    selectedDateRange: {
      ...action,
    },
  }),
  [SHOW_RESULT_ITEMS_DIALOG]: (state, action) => ({
    ...state,
    showResultItems: {
      open: true,
      items: action.items,
    },
  }),
  [CLOSE_RESULT_ITEMS_DIALOG]: (state, action) => ({
    ...state,
    showResultItems: {
      open: false,
      items: [],
    },
  }),
}, INITIAL_STATE);
