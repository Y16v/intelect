import axios from 'axios';
import {history} from '../../../index';
import {USER_TOKEN_KEY} from '../../../store/storage_kets';
import {createNotification} from 'react-redux-notify';
import {createGroupSuccessNotificationsConfig} from '../notifications';
import {_validateData} from './base-actions';


export const ACTION_TYPE_PREFIX = 'CREATE_GROUP';
export const GET_TEACHER_PROFILE_SUCCESS = `${ACTION_TYPE_PREFIX}/GET_TEACHER_PROFILE_SUCCESS`;
export const GET_TEACHER_PROFILE_FAIL = `${ACTION_TYPE_PREFIX}/GET_TEACHER_PROFILE_FAIL`;
export const CREATE_GROUP_FAIL = `${ACTION_TYPE_PREFIX}/CREATE_GROUP_FAIL`;
export const RESET_STATE = `${ACTION_TYPE_PREFIX}/RESET_STATE`;


export const createGroup = () => (dispatch, getState) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const state = getState();
  const {school_id, teacher_id, name} = state.createGroup;

  if (!_validateData(ACTION_TYPE_PREFIX, dispatch, {name})) return;

  const url = `/api/schools/${school_id}/groups`;
  const data = {
    teacher_id,
    name,
  };

  axios.post(url, data, {headers: {Authorization: token}})
      .then(() => {
        dispatch(createNotification(
            createGroupSuccessNotificationsConfig(name),
        ));
        dispatch({
          type: RESET_STATE,
        });
        history.goBack();
      })
      .catch(({response}) => {
        dispatch({
          type: CREATE_GROUP_FAIL,
          error: response.data && response.data.error,
        });
      });
};


export const getTeacherProfile = () => (dispatch, getState) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const state = getState();
  const {teacher_id} = state.createGroup;
  const url = `/api/users/${teacher_id}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_TEACHER_PROFILE_SUCCESS,
          teacherProfile: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: GET_TEACHER_PROFILE_FAIL,
          error: response.data && response.data.error,
        });
      });
};
