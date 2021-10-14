import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  LOGIN_CHANGE_FIELD, USERNAME_FILED,
  PASSWORD_FIELD, LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILED,
  FAILED_VALIDATION, CLEAR_ERRORS,
  CLEAR_FIELDS, LOGOUT,
} from '../../actions/login/login';

export const INITIAL_STATE = {
  username: '',
  password: '',
  isLoading: false,
  user_id: null,
  token: '',
  usernameError: '',
  passwordError: '',
  errorMessage: '',
  isError: false,
};

export default createReducer(
    {
      [LOGIN_CHANGE_FIELD + USERNAME_FILED]: (state, action) => merge({}, state, {
        username: action.value,
      }),
      [LOGIN_CHANGE_FIELD + PASSWORD_FIELD]: (state, action) => merge({}, state, {
        password: action.value,
      }),
      [LOGIN_REQUEST]: (state, action) => merge({}, state, {
        isLoading: true,
      }),
      [LOGIN_REQUEST_SUCCESS]: (state, action) => merge({}, state, {
        isLoading: false,
        user_id: action.user_id,
        token: action.token,
      }),
      [LOGIN_REQUEST_FAILED]: (state, action) => merge({}, state, {
        isLoading: false,
        errorMessage: action.error,
        isError: true,
      }),
      [FAILED_VALIDATION]: (state, action) => merge({}, state, {
        usernameError: action.usernameError,
        passwordError: action.passwordError,
      }),
      [CLEAR_FIELDS]: (state, action) => merge({}, state, {
        username: '',
        password: '',
      }),
      [CLEAR_ERRORS]: (state, action) => merge({}, state, {
        usernameError: '',
        passwordError: '',
        isError: false,
      }),
      [LOGOUT]: () => INITIAL_STATE,
    },
    INITIAL_STATE,
);
