import axios from 'axios';
import {SCHOOL_ADMIN} from '../../reducers/user/fixture';
import {history} from '../../index';
import getBaseActions from './base';
import {createNotification} from 'react-redux-notify';
import {updateStudentPageErrorNotification, updateTeacherPageSuccessNotification} from './notifications';
import {USER} from '../../store/storage_kets';

export const UPDATE_SCHOOL_ADMIN_SUCCESS = 'UPDATE_SCHOOL_ADMIN/UPDATE_SCHOOL_ADMIN_SUCCESS ';
export const UPDATE_SCHOOL_ADMIN_FAIL = 'UPDATE_SCHOOL_ADMIN/UPDATE_SCHOOL_ADMIN_FAIL';
export const UPDATE_SCHOOL_ADMIN = 'UPDATE_SCHOOL_ADMIN';

export const onSubmit = () => {
  return (dispatch, getState) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      username,
      person,
    } = getState().updateSchoolAdmin;

    const url = `/api/school_admins/${person.id}`;
    if (!!first_name && !!last_name && !!phone && !!email && !!username) {
      dispatch(getBaseActions(UPDATE_SCHOOL_ADMIN).clearErrors());
      axios.put(url, {
        teacher_id: null,
        category: SCHOOL_ADMIN,
        first_name,
        last_name,
        phone,
        email,
        username,
      }).then((response) => {
        localStorage.setItem(USER, JSON.stringify(response.data));
        dispatch({type: UPDATE_SCHOOL_ADMIN_SUCCESS, schoolAdminResult: response.data});
        dispatch(getBaseActions(UPDATE_SCHOOL_ADMIN).clearFields());
        dispatch(createNotification(updateTeacherPageSuccessNotification));
        history.push('/school-admin-page');
      }).catch(({response}) => {
        dispatch({type: UPDATE_SCHOOL_ADMIN_FAIL, error: response.data});
        dispatch(createNotification(updateStudentPageErrorNotification));
      });
    } else {
      dispatch(
          getBaseActions(UPDATE_SCHOOL_ADMIN).dispatchErrorMessage(first_name,
              last_name,
              phone,
              email,
              username),
      );
    }
  };
};
