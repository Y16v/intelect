import axios from 'axios';
import {STUDENT} from '../../reducers/user/fixture';
import {history} from '../../index';
import getBaseActions from './base';
import {createNotification} from 'react-redux-notify';
import {updateStudentPageErrorNotification, updateStudentPageSuccessNotification} from './notifications';

export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT/UPDATE_STUDENT_SUCCESS ';
export const UPDATE_STUDENT_FAIL = 'UPDATE_STUDENT/UPDATE_STUDENT_FAIL';
export const UPDATE_STUDENT_ACTION = 'UPDATE_STUDENT_ACTION';

export const onSubmit = () => {
  return (dispatch, getState) => {
    const {
      selectedTeacherId,
      selectedGroupId,
      first_name,
      last_name,
      username,
      person,
    } = getState().updateStudent;

    const url = `/api/schools/${person.school_id}/students/${person.id}`;
    if (!!first_name && !!last_name && !!username) {
      dispatch(getBaseActions(UPDATE_STUDENT_ACTION).clearErrors());

      axios.put(url, {
        teacher_id: selectedTeacherId,
        group_id: selectedGroupId !== 'null' ? selectedGroupId : null,
        category: STUDENT,
        first_name,
        last_name,
        username,
      })
          .then((response) => {
            dispatch({type: UPDATE_STUDENT_SUCCESS, studentUpdate: response.data});
            dispatch(getBaseActions(UPDATE_STUDENT_ACTION).clearFields());
            dispatch(createNotification(updateStudentPageSuccessNotification));
            history.push('/teacher_profile');
          })
          .catch(({response}) => {
            dispatch({type: UPDATE_STUDENT_FAIL, error: response.data});
            dispatch(createNotification(updateStudentPageErrorNotification));
          });

      return;
    }

    dispatch(
        getBaseActions(UPDATE_STUDENT_ACTION).dispatchErrorMessage(
            first_name,
            last_name,
            username,
        ),
    );
  };
};
