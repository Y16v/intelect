import axios from 'axios';
import {USER} from '../../store/storage_kets';
import {TEACHER} from '../../reducers/user/fixture';
import {history} from '../../index';
import getBaseActions from './base';
import {createNotification} from 'react-redux-notify';
import {updateStudentPageErrorNotification, updateTeacherPageSuccessNotification} from './notifications';

export const UPDATE_TEACHER_SUCCESS = 'UPDATE_TEACHER/UPDATE_TEACHER_SUCCESS ';
export const UPDATE_TEACHER_FAIL = 'UPDATE_TEACHER/UPDATE_TEACHER_FAIL';
export const UPDATE_TEACHER_ACTION = 'UPDATE_TEACHER_ACTION';

export const onSubmit = () => {
  return (dispatch, getState) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      username,
      person,
    } = getState().updateTeacher;

    const user = JSON.parse(localStorage.getItem(USER));
    const url = `/api/schools/${user.school_id}/teachers/${person.id}`;
    if (!!first_name && !!last_name && !!phone && !!email && !!username) {
      dispatch(getBaseActions(UPDATE_TEACHER_ACTION).clearErrors());
      axios.put(url, {
        teacher_id: null,
        category: TEACHER,
        first_name,
        last_name,
        phone,
        email,
        username,
      }).then((response) => {
        dispatch({type: UPDATE_TEACHER_SUCCESS, teachersResult: response.data});
        dispatch(getBaseActions(UPDATE_TEACHER_ACTION).clearFields());
        dispatch(createNotification(updateTeacherPageSuccessNotification));
        history.push('/school-admin-page');
      }).catch(({response}) => {
        dispatch({type: UPDATE_TEACHER_FAIL, error: response.data});
        dispatch(createNotification(updateStudentPageErrorNotification));
      });
    } else {
      dispatch(
          getBaseActions(UPDATE_TEACHER_ACTION).dispatchErrorMessage(first_name,
              last_name,
              phone,
              email,
              username),
      );
    }
  };
};
