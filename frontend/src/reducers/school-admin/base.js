import merge from 'xtend';
import {
  CHANGE_CLEAR,
  CHANGE_FIELD, CLEAR_ERRORS,
  EMAIL, EMAIL_ERROR,
  FIRST_NAME,
  FIRST_NAME_ERROR, GET_TEACHER_GROUPS_FAIL, GET_TEACHER_GROUPS_SUCCESS,
  LAST_NAME,
  LAST_NAME_ERROR,
  ON_GROUP_SELECT,
  ON_SELECTED_TEACHER,
  PHONE,
  PHONE_ERROR,
  USER_NAME, USER_NAME_ERROR,
} from '../../actions/school/base';

import {LOGOUT} from '../../actions/login/login';

export const BASE_INITIAL_STATE = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  username: '',
  error: '',
  teachersResult: '',
  isError: false,
  firstNameError: '',
  lastNameError: '',
  phoneError: '',
  emailError: '',
  userNameError: '',
  selectedTeacherId: null,
  selectedGroupId: 'null',
  groups: [],
};

export function getBasePersonCreateUpdate(typePrefix, initialState = BASE_INITIAL_STATE) {
  const getAction = (action) => `${typePrefix}/${action}`;
  return {
    [getAction(CHANGE_FIELD + FIRST_NAME)]: (state, action) => merge({}, state, {
      first_name: action.value,
    }),
    [getAction(CHANGE_FIELD + LAST_NAME)]: (state, action) => merge({}, state, {
      last_name: action.value,
    }),
    [getAction(CHANGE_FIELD + PHONE)]: (state, action) => merge({}, state, {
      phone: action.value,
    }),
    [getAction(CHANGE_FIELD + EMAIL)]: (state, action) => merge({}, state, {
      email: action.value,
    }),
    [getAction(CHANGE_FIELD + USER_NAME)]: (state, action) => merge({}, state, {
      username: action.value,
    }),
    [getAction(ON_SELECTED_TEACHER)]: (state, action) => merge({}, state, {
      selectedTeacherId: action.value,
    }),
    [getAction(ON_GROUP_SELECT)]: (state, action) => merge({}, state, {
      selectedGroupId: action.value,
    }),
    [getAction(GET_TEACHER_GROUPS_SUCCESS)]: (state, action) => merge({}, state, {groups: action.groups}),
    [getAction(GET_TEACHER_GROUPS_FAIL)]: (state, action) => merge({}, state, {error: action.error}),
    [getAction(FIRST_NAME_ERROR)]: (state, action) => merge({}, state, {
      firstNameError: action.error,
    }),
    [getAction(LAST_NAME_ERROR)]: (state, action) => merge({}, state, {
      lastNameError: action.error,
    }),
    [getAction(PHONE_ERROR)]: (state, action) => merge({}, state, {
      phoneError: action.error,
    }),
    [getAction(USER_NAME_ERROR)]: (state, action) => merge({}, state, {
      userNameError: action.error,
    }),
    [getAction(EMAIL_ERROR)]: (state, action) => merge({}, state, {
      emailError: action.error,
    }),
    [getAction(CLEAR_ERRORS)]: (state, action) => merge({}, state, {
      isError: false,
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
      emailError: '',
      userNameError: '',
    }),
    [getAction(CHANGE_CLEAR)]: (state, action) => merge({}, state, {
      isError: false,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      username: '',
    }),
    [LOGOUT]: (state, action) => initialState,
  };
}
