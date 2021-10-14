import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  GET_SCHOOLS_SUCCESS,
  GET_SCHOOLS_FAIL,
  SEARCH_TEXT_FILTER,
  GET_SCHOOL_ADMIN_SUCCESS,
  RETRIEVE_SCHOOL_SUCCESS,
  SHOW_SCHOOL_ACTIONS_MENU, CLOSE_SCHOOL_ACTIONS_MENU,
} from '../../actions/super-admin/common';
import {LOGOUT} from '../../actions/login/login';

const INITIAL_STATE = {
  schools: [],
  error: '',
  schoolsWithOut: [],
  loading: false,
  retrieveSchool: {},
  schoolAdminToShow: {},
  actionMenuAttrs: {
    schoolId: null,
    adminId: null,
    anchorEl: null,
  },
};

export default createReducer({
  [GET_SCHOOLS_SUCCESS]: (state, action) => merge({}, state, {
    schools: action.schools,
    schoolsWithOut: action.schools,
    loading: true,
  }),
  [GET_SCHOOLS_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [SEARCH_TEXT_FILTER]: (state, action) => merge({}, state, state, {
    schools: state.schoolsWithOut.filter(
        (school) =>
          `${(school.name || '').toLowerCase()} `.includes(action.value.toLowerCase()),
    ),
  }),
  [GET_SCHOOL_ADMIN_SUCCESS]: (state, action) => merge({}, state, {
    schoolAdminToShow: action.schoolAdmin,
  }),
  [RETRIEVE_SCHOOL_SUCCESS]: (state, action) => merge({}, state, {
    retrieveSchool: action.school,
  }),
  [SHOW_SCHOOL_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: {...action},
  }),
  [CLOSE_SCHOOL_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: {
      schoolId: null,
      adminId: null,
      anchorEl: null,
    },
  }),
  [LOGOUT]: (state, action) => INITIAL_STATE,
}, INITIAL_STATE);
