import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  CHANGE_CHILD_PASSWORD_ERROR,
  FINISH_CHANGE_CHILD_PASSWORD,
  GET_CHILD_USER_FAIL,
  GET_CHILD_USER_SUCCESS,
  HIDE_CONFIRM_PASSWORD,
  HIDE_NEW_PASSWORD,
  RESET_ERRORS,
  SET_CONFIRM_PASSWORD_VALUE,
  SET_NEW_PASSWORD_ERROR,
  SET_NEW_PASSWORD_VALUE,
  SHOW_CONFIRM_PASSWORD,
  SHOW_NEW_PASSWORD,

} from '../../actions/user/change-child-password';


const INITIAL_STATE = {
  childUser: {},
  newPasswordValue: '',
  confirmPasswordValue: '',

  showNewPasswordValue: false,
  showConfirmPasswordValue: false,

  newPasswordError: '',
  changeChildPasswordError: '',
  getChildUserError: '',
};


export default createReducer({
  [FINISH_CHANGE_CHILD_PASSWORD]: () => (INITIAL_STATE),

  [SET_NEW_PASSWORD_VALUE]: (state, action) => merge({}, state, {newPasswordValue: action.newPasswordValue}),
  [SET_CONFIRM_PASSWORD_VALUE]: (state, action) => merge({}, state, {confirmPasswordValue: action.confirmPasswordValue}),

  [SHOW_NEW_PASSWORD]: (state) => merge({}, state, {showNewPasswordValue: true}),
  [HIDE_NEW_PASSWORD]: (state) => merge({}, state, {showNewPasswordValue: false}),
  [SHOW_CONFIRM_PASSWORD]: (state) => merge({}, state, {showConfirmPasswordValue: true}),
  [HIDE_CONFIRM_PASSWORD]: (state) => merge({}, state, {showConfirmPasswordValue: false}),

  [SET_NEW_PASSWORD_ERROR]: (state, action) => merge({}, state, {newPasswordError: action.error}),
  [CHANGE_CHILD_PASSWORD_ERROR]: (state, action) => merge({}, state, {changeChildPasswordError: action.error}),

  [RESET_ERRORS]: (state) => merge({}, state, {
    newPasswordError: '',
    changeChildPasswordError: '',
    getChildUserError: '',
  }),

  [GET_CHILD_USER_SUCCESS]: (state, action) => ({
    ...state,
    childUser: action.childUser,
  }),
  [GET_CHILD_USER_FAIL]: (state, action) => merge({}, state, {getChildUserError: action.error}),

}, INITIAL_STATE);
