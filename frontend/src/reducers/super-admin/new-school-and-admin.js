import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  CREATE_SCHOOL_ADMIN_FAIL,
  CREATE_SCHOOL_FAIL,
  CREATE_SCHOOL_SUCCESS,
  CREATE_SCHOOL_ADMIN_SUCCESS,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FAIL,
  UPDATE_SCHOOL_ADMIN_SUCCESS,
  UPDATE_SCHOOL_ADMIN_FAIL,
  FINISH_UPDATE_OR_CREATE_SCHOOL,
} from '../../actions/super-admin/common';
import {LOGOUT} from '../../actions/login/login';

const INITIAL_STATE = {
  newSchoolAdmin: {},
  newSchool: {},
  updatedSchoolAdmin: {},
  updatedSchool: {},
  error: '',
};


export default createReducer({
  [CREATE_SCHOOL_ADMIN_SUCCESS]: (state, action) => merge({}, state, {newSchoolAdmin: action.newSchoolAdmin}),
  [CREATE_SCHOOL_ADMIN_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [CREATE_SCHOOL_SUCCESS]: (state, action) => merge({}, state, {newSchool: action.newSchool}),
  [CREATE_SCHOOL_FAIL]: (state, action) => merge({}, state, {error: action.error}),

  [UPDATE_SCHOOL_ADMIN_SUCCESS]: (state, action) => merge({}, state, {updatedSchoolAdmin: action.updatedSchoolAdmin}),
  [UPDATE_SCHOOL_ADMIN_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [UPDATE_SCHOOL_SUCCESS]: (state, action) => merge({}, state, {updatedSchool: action.updatedSchoolAdmin}),
  [UPDATE_SCHOOL_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [FINISH_UPDATE_OR_CREATE_SCHOOL]: (state, action) => INITIAL_STATE,
  [LOGOUT]: (state, action) => INITIAL_STATE,
}, INITIAL_STATE);
