import axios from 'axios';
import {USER} from '../../store/storage_kets';
import {TEACHER} from '../../reducers/user/fixture';
import {history} from '../../index';
import getBaseActions from './base';
import {createNotification} from 'react-redux-notify';
import {createTeacherPageErrorNotification, createTeacherPageSuccessNotification} from './notifications';

export const CREATE_TEACHER_SUCCESS = 'CREATE_TEACHER_PAGE/CREATE_TEACHER_SUCCESS ';
export const CREATE_TEACHER_FAIL = 'CREATE_TEACHER_PAGE/CREATE_TEACHER_FAIL';
export const CREATE_TEACHER_PAGE = 'CREATE_TEACHER_PAGE';

export const onSubmit = () => {
  return (dispatch, getState) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      username,
    } = getState().createTeacherPage;

    const user = JSON.parse(localStorage.getItem(USER));
    const url = `/api/schools/${user.school_id}/students`;
    if (!!first_name || !!last_name || !!phone || !!email || !!username) {
      dispatch(getBaseActions(CREATE_TEACHER_PAGE).clearErrors());
      axios.post(url, {
        teacher_id: null,
        category: TEACHER,
        student_data: {
          first_name,
          last_name,
          phone,
          email,
          username,
        },
      }).then((response) => {
        dispatch({type: CREATE_TEACHER_SUCCESS, teachersResult: response.data});
        dispatch(getBaseActions(CREATE_TEACHER_PAGE).clearFields());
        dispatch(createNotification(createTeacherPageSuccessNotification));
        history.push('/school-admin-page');
      }).catch(({response}) => {
        dispatch({type: CREATE_TEACHER_FAIL, error: response.data});
        dispatch(createNotification(createTeacherPageErrorNotification));
      });
    } else {
      dispatch(
          getBaseActions(CREATE_TEACHER_PAGE).dispatchErrorMessage(first_name,
              last_name,
              phone,
              email,
              username),
      );
    }
  };
};
