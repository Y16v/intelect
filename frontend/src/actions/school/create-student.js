import {USER} from '../../store/storage_kets';
import getBaseActions from './base';
import axios from 'axios';
import {STUDENT} from '../../reducers/user/fixture';
import {history} from '../../index';
import {createStudentPageErrorNotification, createStudentPageSuccessNotification} from './notifications';
import {createNotification} from 'react-redux-notify';

export const CREATE_STUDENT_ACTION = 'CREATE_STUDENT_ACTION';
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_PAGE/CREATE_STUDENT_SUCCESS';
export const CREATE_STUDENT_FAIL = 'CREATE_STUDENT_PAGE/CREATE_STUDENT_FAIL';

export const onSubmit = () => {
  return (dispatch, getState) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      username,
      selectedTeacherId,
    } = getState().createStudentPage;
    console.log(phone, email, username, first_name, last_name);
    const user = JSON.parse(localStorage.getItem(USER));
    const url = `/api/schools/${user.school_id}/students`;
    if (!!first_name || !!last_name || !!username) {
      dispatch(getBaseActions(CREATE_STUDENT_ACTION).clearErrors());
      axios.post(url, {
        teacher_id: selectedTeacherId,
        category: STUDENT,
        student_data: {
          first_name,
          last_name,
          phone,
          email,
          username,
        },
      }).then((response) => {
        dispatch({type: CREATE_STUDENT_SUCCESS, studentResults: response.data});
        dispatch(getBaseActions(CREATE_STUDENT_ACTION).clearFields());
        dispatch(createNotification(createStudentPageSuccessNotification));
        history.push(`/teacher_profile/${selectedTeacherId}`);
      }).catch(({response}) => {
        dispatch({type: CREATE_STUDENT_FAIL, error: response.data});
        dispatch(createNotification(createStudentPageErrorNotification));
      });
    } else {
      dispatch(
          getBaseActions(CREATE_STUDENT_ACTION).dispatchErrorMessage(first_name,
              last_name,
              phone,
              email,
              username),
      );
    }
  };
};
