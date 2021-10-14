import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  CHANGE_SEARCH_VALUE,
  CLEAR_RATINGS,
  GET_RATING_FAIL,
  GET_RATING_SUCCESS,
  GET_SEARCH_STUDENT_RATING_FAIL,
  GET_SEARCH_STUDENT_RATING_SUCCESS,
  MORE_STUDENT_RATINGS,
} from '../../actions/games/rating/student-rating-actions';

const INITIAL_STATE = {
  students: [],
  ratings: [],
  page: 1,
  searchValue: '',
};

export default createReducer({
  [GET_RATING_SUCCESS]: (state, action) => merge({}, state, {
    ratings: state.page <= 0 ? action.ratings : [...state.ratings, ...action.ratings],
  }),
  [GET_RATING_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [CLEAR_RATINGS]: (state, action) => merge({}, state, INITIAL_STATE),
  [MORE_STUDENT_RATINGS]: (state, action) => merge({}, state, {
    page: state.page + 1,
  }),
  [CHANGE_SEARCH_VALUE]: (state, action) => merge({}, state, {
    searchValue: action.value,
  }),
  [GET_SEARCH_STUDENT_RATING_SUCCESS]: (state, action) => merge({}, state, {
    ratings: [...action.ratings],
    searchValue: '',
    page: 0,
  }),
  [GET_SEARCH_STUDENT_RATING_FAIL]: (state, action) => merge({}, state, {
    error: action.error,
  }),
}, INITIAL_STATE);
