import merge from 'xtend';

import {
  CHANGE_FIELD, FIELD_ERROR,
  GROUP_NAME,
  SCHOOL_ID,
  TEACHER_ID,
} from '../../../actions/school/create-update-group/base-actions';


export const BASE_INITIAL_STATE = {
  school_id: null,
  teacher_id: null,
  name: '',
  nameError: '',
};


export function getCreateUpdateGroupBaseReducers(typePrefix, initialState = BASE_INITIAL_STATE) {
  const getAction = (action) => `${typePrefix}/${action}`;

  return {
    [getAction(CHANGE_FIELD + SCHOOL_ID)]: (state, action) => merge({}, state, {school_id: action.value}),
    [getAction(CHANGE_FIELD + TEACHER_ID)]: (state, action) => merge({}, state, {teacher_id: action.value}),
    [getAction(CHANGE_FIELD+ GROUP_NAME)]: (state, action) => merge({}, state, {name: action.value}),
    [getAction(FIELD_ERROR + GROUP_NAME)]: (state, action) => merge({}, state, {nameError: action.error}),
  };
}
