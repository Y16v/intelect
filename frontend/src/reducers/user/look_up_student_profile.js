import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  GET_LOOK_UP_STUDENT_FAIL,
  GET_LOOK_UP_STUDENT_SUCCESS,
  GET_STUDENT_ACCESSES_FAIL,
  HIDE_STUDENT_ACCESSES,
  SHOW_STUDENT_ACCESSES,
} from '../../actions/user/student';

const INITIAL_STATE = {
  showStudentAccesses: false,
  studentAccesses: {},
};


export default createReducer({
  [GET_LOOK_UP_STUDENT_SUCCESS]: (state, action) => merge({}, state, {...action.student}),
  [GET_LOOK_UP_STUDENT_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [SHOW_STUDENT_ACCESSES]: (state, action) =>({
    ...state,
    studentAccesses: action.studentAccesses,
    showStudentAccesses: true,
  }),
  [HIDE_STUDENT_ACCESSES]: (state) => ({
    ...state,
    studentAccesses: {},
    showStudentAccesses: false,
  }),
  [GET_STUDENT_ACCESSES_FAIL]: (state, action) => merge({}, state, {error: action.error}),
}, INITIAL_STATE);
