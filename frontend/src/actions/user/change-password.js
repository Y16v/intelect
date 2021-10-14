import axios from 'axios';
import {history} from '../../index';

import {USER, USER_TOKEN_KEY} from '../../store/storage_kets';
import {USER_CATEGORY_PUSH} from '../../reducers/user/fixture';

export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const SET_CHANGE_PASSWORD_DATA = 'SET_CHANGE_PASSWORD_DATA';
export const SET_SHOW_PASSWORD_FIELDS = 'SET_SHOW_PASSWORD_FIELDS';
export const SET_FIELD_ERROR = 'SET_FIELD_ERROR';
export const CLEAR_STATE = 'CLEAR_STATE';
export const SET_FINISH = 'SET_FINISH';


export const changePassword = () => (dispatch, getState) =>{
  if (!_validateChangePasswordData(dispatch, getState)) {
    return;
  }
  const formData = getState().changePassword.changePasswordData;
  const data = {
    old_password: formData.oldPassword,
    new_password: formData.newPassword,
    confirm_password: formData.confirmPassword,
  };
  const url = '/api/users/current/change_password';
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.post(url, data, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          data: true,
        });
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.response.data.error) {
          case 'user.aut.passwordNotMatch':
            errorMessage = 'Вы ввели не правильный пароль.';
            break;
          case 'user.changePassword.newAndConfirmNotMatch':
            errorMessage = 'Новые пароли не совподают.';
            break;
                // no default
        }
        dispatch({
          type: CHANGE_PASSWORD_FAIL,
          error: errorMessage,
        });
      });
};

export const finishChangePassword = () => (dispatch) => {
  dispatch({
    type: SET_FINISH,
    finish: true,
  });
  const profile = JSON.parse(localStorage.getItem(USER));
  history.push(USER_CATEGORY_PUSH[profile.category_id]);
};

export const setChangePasswordData = (key, value) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SET_CHANGE_PASSWORD_DATA,
    changePasswordData: {
      ...state.changePassword.changePasswordData,
      [key]: value,
    },
  });
};

export const pushToChangePassword = () => (dispatch) => {
  history.push('/change_password');
};

export const setShowPasswordField = (key, value) => (dispatch, getState) => {
  const showPasswordFields = getState().changePassword.showPasswordFields;
  dispatch({
    type: SET_SHOW_PASSWORD_FIELDS,
    showPasswordFields: {
      ...showPasswordFields,
      [key]: value,
    },
  });
};


export const clearState = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};

export const resetErrors = () => (dispatch) => {
  dispatch({
    type: CHANGE_PASSWORD_FAIL,
    error: '',
  });
  dispatch({
    type: SET_FIELD_ERROR,
    fieldErrors: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
};


const _validateChangePasswordData = (dispatch, getState) => {
  const fieldErrors = getState().changePassword.fieldErrors;
  const formData = getState().changePassword.changePasswordData;

  for (const field in formData) {
    if (!formData[field]) {
      dispatch({
        type: SET_FIELD_ERROR,
        fieldErrors: {
          ...fieldErrors,
          [field]: 'Это поле обязательно!',
        },
      });
      return false;
    }
  }
  return true;
};
