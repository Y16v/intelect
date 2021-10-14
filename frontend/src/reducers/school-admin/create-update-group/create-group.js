import {merge} from 'extend-merge';

import createReducer from '../../utils/base';
import {BASE_INITIAL_STATE, getCreateUpdateGroupBaseReducers} from './base';
import {
  ACTION_TYPE_PREFIX,
  GET_TEACHER_PROFILE_SUCCESS,
  GET_TEACHER_PROFILE_FAIL,
  RESET_STATE,
} from '../../../actions/school/create-update-group/create-group';


export const INITIAL_STATE = {
  ...BASE_INITIAL_STATE,
  teacherProfile: {},
  getTeachersError: '',
};


export default createReducer({
  ...getCreateUpdateGroupBaseReducers(ACTION_TYPE_PREFIX),
  [GET_TEACHER_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    teacherProfile: action.teacherProfile,
  }),
  [GET_TEACHER_PROFILE_FAIL]: (state, action) => merge({}, state, {getTeacherProfileError: action.error}),
  [RESET_STATE]: () => INITIAL_STATE,
}, INITIAL_STATE);
