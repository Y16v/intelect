import axios from 'axios';
import {history} from '../../index';
import {USER_TOKEN_KEY} from '../../store/storage_kets';
import {createNotification} from 'react-redux-notify';
import {changeChildPasswordSuccessNotificationConfig} from '../school/notifications';


export const SET_NEW_PASSWORD_VALUE = 'CHANGE_CHILD_PASSWORD/SET_NEW_PASSWORD_VALUE';
export const SET_CONFIRM_PASSWORD_VALUE = 'CHANGE_CHILD_PASSWORD/SET_CONFIRM_PASSWORD_VALUE';
export const SET_NEW_PASSWORD_ERROR = 'CHANGE_CHILD_PASSWORD/SET_CONFIRM_PASSWORD_ERROR';
export const SHOW_NEW_PASSWORD = 'CHANGE_CHILD_PASSWORD/SHOW_NEW_PASSWORD';
export const HIDE_NEW_PASSWORD = 'CHANGE_CHILD_PASSWORD/HIDE_NEW_PASSWORD';
export const SHOW_CONFIRM_PASSWORD = 'CHANGE_CHILD_PASSWORD/SHOW_CONFIRM_PASSWORD';
export const HIDE_CONFIRM_PASSWORD = 'CHANGE_CHILD_PASSWORD/HIDE_CONFIRM_PASSWORD';
export const CHANGE_CHILD_PASSWORD_ERROR = 'CHANGE_CHILD_PASSWORD/CHANGE_CHILD_PASSWORD_ERROR';
export const RESET_ERRORS = 'CHANGE_CHILD_PASSWORD/RESET_STATE';
export const FINISH_CHANGE_CHILD_PASSWORD = 'CHANGE_CHILD_PASSWORD/FINISH_CHANGE_PASSWORD';
export const GET_CHILD_USER_SUCCESS = 'CHANGE_CHILD_PASSWORD/GET_CHILD_USER_SUCCESS';
export const GET_CHILD_USER_FAIL = 'CHANGE_CHILD_PASSWORD/GET_CHILD_USER_FAIL';


export const setNewPasswordValue = (newPasswordValue) => ({
  type: SET_NEW_PASSWORD_VALUE,
  newPasswordValue,
});


export const setConfirmPasswordValue = (confirmPasswordValue) => ({
  type: SET_CONFIRM_PASSWORD_VALUE,
  confirmPasswordValue,
});


export const changeChildPassword = () => (dispatch, getState) => {
  dispatch({
    type: RESET_ERRORS,
  });

  const {changeChildPassword} = getState();
  const {newPasswordValue, confirmPasswordValue, childUser} = changeChildPassword;

  if (!isValidPasswords(dispatch, newPasswordValue, confirmPasswordValue)) {
    dispatch({
      type: SET_NEW_PASSWORD_VALUE,
      value: '',
    });

    dispatch({
      type: SET_CONFIRM_PASSWORD_VALUE,
      value: '',
    });

    return;
  }


  const url = '/api/users/change_child_password';
  const data = {
    child_user_id: childUser.id,
    new_password: newPasswordValue,
    confirm_password: confirmPasswordValue,
  };
  const config = {headers: {Authorization: localStorage.getItem(USER_TOKEN_KEY)}};

  axios.post(url, data, config)
      .then((response) => {
        dispatch(createNotification(
            changeChildPasswordSuccessNotificationConfig(`${childUser.first_name} ${childUser.last_name}`),
        ));
        dispatch({
          type: FINISH_CHANGE_CHILD_PASSWORD,
        });

        history.goBack();
      })
      .catch(({response}) => {
        dispatch({
          type: CHANGE_CHILD_PASSWORD_ERROR,
          error: response && response.data && response.date.error,
        });
      });
};


const isValidPasswords = (dispatch, newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    dispatch({
      type: CHANGE_CHILD_PASSWORD_ERROR,
      error: 'Пароли не совподают!',
    });

    return false;
  }

  if (newPassword.length < 4) {
    dispatch({
      type: SET_NEW_PASSWORD_ERROR,
      error: 'Длина пароля должен быть не меньше 4.',
    });

    return false;
  }

  return true;
};


export const finishChangePassword = () => (dispatch) => {
  dispatch({
    type: FINISH_CHANGE_CHILD_PASSWORD,
  });

  history.goBack();
};


export const showNewPassword = () => ({
  type: SHOW_NEW_PASSWORD,
});


export const hideNewPassword = () => ({
  type: HIDE_NEW_PASSWORD,
});


export const showConfirmPassword = () => ({
  type: SHOW_CONFIRM_PASSWORD,
});


export const hideConfirmPassword = () => ({
  type: HIDE_CONFIRM_PASSWORD,
});


export const getChildUser = (childUserId) => (dispatch) => {
  const url = `/api/users/${childUserId}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_CHILD_USER_SUCCESS,
          childUser: response.data,
        });
      })
      .catch(({response}) => {
        const errorMessage = response.status === 404 ? 'Простите, пользователь не найден!' : 'У вас не достаточно прав для изменения пароля данного пользователя!';
        dispatch({
          type: GET_CHILD_USER_FAIL,
          error: errorMessage,
        });
      });
};
