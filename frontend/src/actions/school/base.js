import {USER_TOKEN_KEY} from '../../store/storage_kets';
import axios from 'axios';

export const CHANGE_FIELD = 'CHANGE_FIELD';
export const FIRST_NAME = 'FIRST_NAME';
export const LAST_NAME = 'LAST_NAME';
export const PHONE = 'PHONE';
export const EMAIL = 'EMAIL';
export const USER_NAME = 'USER_NAME';
export const FIRST_NAME_ERROR = 'FIRST_NAME_ERROR';
export const LAST_NAME_ERROR = 'LAST_NAME_ERROR';
export const PHONE_ERROR = 'PHONE_ERROR';
export const USER_NAME_ERROR = 'USER_NAME_ERROR';
export const EMAIL_ERROR = 'EMAIL_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const CHANGE_CLEAR = 'CHANGE_CLEAR';
export const ON_SELECTED_TEACHER = 'ON_SELECTED_TEACHER';
export const GET_TEACHER_GROUPS_SUCCESS = 'GET_TEACHER_GROUPS_SUCCESS';
export const GET_TEACHER_GROUPS_FAIL = 'GET_TEACHER_GROUPS_FAIL';
export const ON_GROUP_SELECT = 'ON_GROUP_SELECT';


export default function(typePrefix) {
  const getActionType = (action) => `${typePrefix}/${action}`;

  const FIELDS = {
    first_name: getActionType(CHANGE_FIELD + FIRST_NAME),
    last_name: getActionType(CHANGE_FIELD + LAST_NAME),
    phone: getActionType(CHANGE_FIELD + PHONE),
    email: getActionType(CHANGE_FIELD + EMAIL),
    username: getActionType(CHANGE_FIELD + USER_NAME),
  };

  function changeField(field, value) {
    return {
      type: FIELDS[field],
      value,
    };
  }

  const onSelectTeacher = (value) => {
    return {
      type: getActionType(ON_SELECTED_TEACHER),
      value,
    };
  };

  const setTeacherIdAndGetGroupsSelectOptions = (selectedTeacherId) => (dispatch, getState) => {
    const {profile: loggedUser, updateStudent} = getState();

    const school_id = loggedUser.school_id || updateStudent.person.school_id;

    dispatch({
      type: getActionType(ON_SELECTED_TEACHER),
      value: selectedTeacherId,
    });
    dispatch({
      type: getActionType(ON_GROUP_SELECT),
      value: 'null',
    });

    const url = `/api/schools/${school_id}/groups?teacher_id=${selectedTeacherId}`;
    const token = localStorage.getItem(USER_TOKEN_KEY);
    const headers = {Authorization: token};

    axios.get(url, {headers})
        .then((response) => {
          dispatch({
            type: getActionType(GET_TEACHER_GROUPS_SUCCESS),
            groups: response.data,
          });
        })
        .catch(({response}) => {
          dispatch({
            type: getActionType(GET_TEACHER_GROUPS_FAIL),
            error: response && response.data && response.data.error,
          });
        });
  };

  const onSelectGroup = (value) => {
    return {
      type: getActionType(ON_GROUP_SELECT),
      value,
    };
  };

  const teacherFormValidate = (fields) => (dispatch) => {
    const {phone, email, first_name, last_name, username} = fields;
    if (!first_name) {
      dispatch({type: getActionType(FIRST_NAME_ERROR), error: 'Это обязательное поле!'});
      return false;
    }
    if (!last_name) {
      dispatch({type: getActionType(LAST_NAME_ERROR), error: 'Это обязательное поле!'});
      return false;
    }
    if (phone.length !== 13) {
      dispatch({type: getActionType(PHONE_ERROR), error: 'Некорректный номер телефона'});
      return false;
    } else {
      dispatch({type: getActionType(PHONE_ERROR), error: ''});
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      dispatch({type: getActionType(EMAIL_ERROR), error: 'Введите правильный адрес'});
      return false;
    } else {
      dispatch({type: getActionType(EMAIL_ERROR), error: ''});
    }
    if (!username) {
      dispatch({type: getActionType(USER_NAME_ERROR), error: 'Это обязательное поле!'});
      return false;
    }
    return true;
  };

  const changeNameField = (name, value) => (dispatch) => {
    dispatch(changeField(name, value));
  };
  const dispatchErrorMessage = (
      first_name,
      last_name,
      phone,
      email,
      username,
  ) => (dispatch) => {
    if (!first_name) dispatch({type: getActionType(FIRST_NAME_ERROR), error: 'Это обязательное поле!'});
    if (!last_name) dispatch({type: getActionType(LAST_NAME_ERROR), error: 'Это обязательное поле!'});
    if (!phone) dispatch({type: getActionType(PHONE_ERROR), error: 'Это обязательное поле!'});
    if (!username) dispatch({type: getActionType(USER_NAME_ERROR), error: 'Это обязательное поле!'});
    if (!email) dispatch({type: getActionType(EMAIL_ERROR), error: 'Это обязательное поле!'});
  };

  const clearFields = () => ({
    type: getActionType(CHANGE_CLEAR),
  });
  const clearErrors = () => ({
    type: getActionType(CLEAR_ERRORS),
  });
  return {
    changeNameField,
    onSelectTeacher,
    onSelectGroup,
    setTeacherIdAndGetGroupsSelectOptions,
    dispatchErrorMessage,
    clearFields,
    clearErrors,
    teacherFormValidate,
  };
}
