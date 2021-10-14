import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  SET_CHANGE_PASSWORD_DATA,
  SET_FIELD_ERROR,
  SET_SHOW_PASSWORD_FIELDS,
  CLEAR_STATE,
  SET_FINISH,
} from '../../actions/user/change-password';

const INITIAL_STATE = {
  fieldErrors: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  changePasswordData: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  showPasswordFields: {
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  },
  changePasswordSuccess: false,
  finish: false,
  error: '',
};


export default createReducer({
  [SET_CHANGE_PASSWORD_DATA]: (state, action) => merge({}, state, {changePasswordData: action.changePasswordData}),
  [SET_SHOW_PASSWORD_FIELDS]: (state, action) => merge({}, state, {showPasswordFields: action.showPasswordFields}),
  [SET_FIELD_ERROR]: (state, action) => merge({}, state, {fieldErrors: action.fieldErrors}),
  [CHANGE_PASSWORD_SUCCESS]: (state, action) => merge({}, state, {changePasswordSuccess: action.data}),
  [CHANGE_PASSWORD_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [SET_FINISH]: (state, action) => merge({}, state, {finish: action.finish}),
  [CLEAR_STATE]: (state, action) => INITIAL_STATE,
}, INITIAL_STATE);

