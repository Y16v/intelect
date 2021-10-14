import axios from 'axios';
import {history} from '../../index';
import {USER, USER_ID, USER_TOKEN_KEY} from '../../store/storage_kets';
import {STUDENT_ID, USER_CATEGORY_NAME, USER_CATEGORY_PUSH} from '../../reducers/user/fixture';
import {GET_USER_SUCCESS, LOAD_IS_ACTIVE_USER_FAIL, LOAD_IS_ACTIVE_USER_SUCCESS} from '../user/profile';

export const LOGIN_CHANGE_FIELD = 'LOGIN_CHANGE_FIELD/';
export const USERNAME_FILED = 'USERNAME_FILED';
export const PASSWORD_FIELD = 'PASSWORD_FIELD';
export const LOGIN_REQUEST = 'LOGIN_PAGE/LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_PAGE/LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_PAGE/LOGIN_REQUEST_FAILED';
export const FAILED_VALIDATION = 'LOGIN_PAGE/FAILED_VALIDATION';
export const CLEAR_FIELDS = 'LOGIN_PAGE/CLEAR_FIELDS';
export const CLEAR_ERRORS = 'LOGIN_PAGE/CLEAR_ERRORS';
export const LOGOUT = 'LOGIN_PAGE/LOGOUT';
export const GET_VERSION_SUCCESS = 'LOGIN_PAGE/GET_VERSION_SUCCESS';

export const FIELDS = {
  login: LOGIN_CHANGE_FIELD + USERNAME_FILED,
  password: LOGIN_CHANGE_FIELD + PASSWORD_FIELD,
};

export function changeField(field, value) {
  return {
    type: FIELDS[field],
    value,
  };
}

export const changeLoginField = (name, value) => (dispatch) => {
  dispatch(changeField(name, value));
};


export const validateLogin = (username, password) => {
  let usernameError = '';
  let passwordError = '';
  if (!username) {
    usernameError = 'Enter username!';
  }
  if (!password) {
    passwordError = 'Enter password!';
  }
  return {
    usernameError,
    passwordError,
  };
};

export const login = () => (dispatch, getState) => {
  dispatch({type: CLEAR_ERRORS});
  const {username, password} = getState().login;
  const {usernameError, passwordError} = validateLogin(username, password);
  if (!usernameError && !passwordError) {
    dispatch({type: LOGIN_REQUEST});
    axios.post('/api/login', {
      username,
      password,
    }).then((result) => {
      const {token, user_id, user} = result.data;
      localStorage.setItem(USER_TOKEN_KEY, token);
      localStorage.setItem(USER_ID, user_id);
      user.category = USER_CATEGORY_NAME[user.category_id];
      localStorage.setItem(USER, JSON.stringify(user));
      dispatch({type: LOGIN_REQUEST_SUCCESS, token, user_id, user});
      if (user.category_id !== STUDENT_ID) {
        history.push(USER_CATEGORY_PUSH[user.category_id]);
      } else {
        history.push('/games');
      }
    }).catch(({response}) => {
      dispatch({type: LOGIN_REQUEST_FAILED, error: response.data});
    });
  } else {
    dispatch({type: FAILED_VALIDATION, usernameError, passwordError});
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER);
  history.push('/login');
  dispatch({type: LOGOUT});
};

export const pushToGames = () => (dispatch) => {
  history.push('/games');
};

export const pushToProfile = () => (dispatch) => {
  const profile = JSON.parse(localStorage.getItem(USER));
  history.push(USER_CATEGORY_PUSH[profile.category_id]);
};

export const loadAuth = () => (dispatch) => {
  const url = '/api/users/current';
  const user = localStorage.getItem(USER);
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (!!user || !!token) {
    axios.get(url)
        .then((response) => {
          localStorage.setItem(USER, JSON.stringify(response.data));
          dispatch({
            type: GET_USER_SUCCESS,
          });
        })
        .catch((error) => {
          dispatch(logout());
        });
  }
};

export const loadIsActive = () => (dispatch) => {
  const url = '/api/load_active_user';
  const user = localStorage.getItem(USER);
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (!!user || !!token) {
    axios.get(url)
        .then((response) => {
          dispatch({
            type: LOAD_IS_ACTIVE_USER_SUCCESS,
          });
        })
        .catch(({response}) => {
          dispatch({
            type: LOAD_IS_ACTIVE_USER_FAIL,
          });
          if (response.status === 403) {
            history.push('/non-activated-user');
          }
        });
  }
};

export const getBuildNumber = () => (dispatch) => {
  axios.get('/api/get-version')
      .then((response) => {
        dispatch({type: GET_VERSION_SUCCESS, version: response.data.version});
      });
};
