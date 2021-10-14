import axios from 'axios';
import {USER, USER_TOKEN_KEY} from '../../store/storage_kets';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const LOAD_IS_ACTIVE_USER_SUCCESS = 'LOAD_IS_ACTIVE_USER_SUCCESS';
export const LOAD_IS_ACTIVE_USER_FAIL = 'LOAD_IS_ACTIVE_USER_FAIL';


export const getCurrentUser = () => (dispatch) => {
  const url = '/api/users/current';
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const user = JSON.parse(localStorage.getItem(USER));

  if (user && user.id) {
    dispatch({
      type: GET_USER_SUCCESS,
      ...user,
    });
    return;
  }

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        localStorage.setItem(USER, JSON.stringify(response.data));
        dispatch({
          type: GET_USER_SUCCESS,
          ...response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAIL,
          error: error.response.data.error,
        });
      });
};
