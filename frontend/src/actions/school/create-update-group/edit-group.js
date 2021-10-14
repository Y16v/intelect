import axios from 'axios';
import {USER_TOKEN_KEY} from '../../../store/storage_kets';
import {createNotification} from 'react-redux-notify';
import {editGroupSuccessNotificationConfig} from '../notifications';
import {_validateData} from './base-actions';
import {history} from '../../../index';
import {USER_CATEGORY_PUSH} from '../../../reducers/user/fixture';


export const ACTION_TYPE_PREFIX = 'UPDATE_GROUP';
export const RETRIEVE_GROUP_SUCCESS = `${ACTION_TYPE_PREFIX}/RETRIEVE_GROUP_SUCCESS`;
export const RETRIEVE_GROUP_FAIL = `${ACTION_TYPE_PREFIX}/RETRIEVE_GROUP_FAIL`;
export const EDIT_GROUP_FAIL = `${ACTION_TYPE_PREFIX}/EDIT_GROUP_FAIL`;
export const RESET_STATE = `${ACTION_TYPE_PREFIX}/RESET_STATE`;

export const retrieveGroup = (groupId) => (dispatch, getState) => {
  const state = getState();
  const loggedUser = state.profile;

  const token = localStorage.getItem(USER_TOKEN_KEY);
  const url = `/api/schools/${loggedUser.school_id}/groups/${groupId}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: RETRIEVE_GROUP_SUCCESS,
          group: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: RETRIEVE_GROUP_FAIL,
          error: response && response.data && response.data.error,
        });
      });
  dispatch({
    type: RETRIEVE_GROUP_SUCCESS,
    id: 1,
    name: 'RY-1-17',
    teacher_id: 123,
  });
};


export const editGroup = () => (dispatch, getState) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const state = getState();
  const {name, id} = state.editGroup;
  const loggedUser = state.profile;

  if (!_validateData(ACTION_TYPE_PREFIX, dispatch, {name})) return;

  const url = `/api/schools/${loggedUser.school_id}/groups/${id}`;
  const data = {
    name,
  };

  axios.put(url, data, {headers: {Authorization: token}})
      .then(() => {
        dispatch(createNotification(
            editGroupSuccessNotificationConfig(name),
        ));

        dispatch({
          type: RESET_STATE,
        });
        history.push(USER_CATEGORY_PUSH[loggedUser.category_id]);
      })
      .catch(({response}) => {
        dispatch({
          type: EDIT_GROUP_FAIL,
          error: response && response.data && response.data.error,
        });
      });
};
