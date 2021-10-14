import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  SEARCH_SCHOOLS_FAIL,
  SEARCH_SCHOOLS_SUCCESS,
  SET_PAGE,
  SET_PAGINATION_COUNT,
  SET_SEARCH_QUERY_VALUE,
} from '../../actions/super-admin/search-schools';


const INITIAL_STATE = {
  searchResult: {
    total: null,
    schools: [],
  },
  q: '',
  page: 1,
  paginationCount: 10,
  searchSchoolsError: '',
  loading: true,
};


export default createReducer({
  [SEARCH_SCHOOLS_SUCCESS]: (state, action) => ({...state, searchResult: action.searchResult, loading: true}),
  [SEARCH_SCHOOLS_FAIL]: (state, action) => merge({}, state, {searchSchoolsError: action.error}),

  [SET_SEARCH_QUERY_VALUE]: (state, action) => merge({}, state, {q: action.q}),
  [SET_PAGE]: (state, action) => merge({}, state, {page: action.page}),
  [SET_PAGINATION_COUNT]: (state, action) => merge({}, state, {paginationCount: action.paginationCount}),

}, INITIAL_STATE);
