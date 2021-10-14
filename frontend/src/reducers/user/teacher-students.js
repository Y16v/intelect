import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  GET_TEACHER_STUDENTS_SUCCESS,
  GET_TEACHER_STUDENTS_FAIL, GET_TEACHER_SUCCESS, GET_TEACHER_FAIL,
} from '../../actions/user/teacherStudents';
import {
  UPDATE_STUDENT_ACCESS_SUCCESS,
  UPDATE_STUDENT_ACCESS_FAIL,
  FINISH_UPDATE_STUDENT_ACCESS,
  SEARCH_TEXT_FILTER,
  SHOW_STUDENT_ACTIONS_MENU,
  CLOSE_STUDENT_ACTIONS_MENU,
} from '../../actions/user/student';
import {LOGOUT} from '../../actions/login/login';


const INITIAL_STATE = {
  teacher: {},
  getTeacherError: null,
  data: [],
  accessUpdatedStudent: {},
  updateStudentAccessError: '',
  dataWithOut: [],
  actionMenuAttrs: {
    student: {},
    needToUpdateAccess: false,
    canUpdateAccess: false,
    anchorEl: null,
  },
  loading: false,
};


export default createReducer({
  [GET_TEACHER_SUCCESS]: (state, action) => ({
    ...state,
    teacher: action.teacher,
  }),
  [GET_TEACHER_FAIL]: (state, action) => ({
    ...state,
    getTeacherError: action.error,
  }),
  [GET_TEACHER_STUDENTS_SUCCESS]: (state, action) => merge({}, state, {
    data: action.students,
    dataWithOut: action.students,
    loading: true,
  }),
  [GET_TEACHER_STUDENTS_FAIL]: (state, error) => merge({}, state, {error}),
  [UPDATE_STUDENT_ACCESS_SUCCESS]: (state, action) => merge({}, state, {accessUpdatedStudent: action.accessUpdatedStudent}),
  [UPDATE_STUDENT_ACCESS_FAIL]: (state, action) => merge({}, state, {updateStudentAccessError: action.error}),
  [FINISH_UPDATE_STUDENT_ACCESS]: (state, action) => INITIAL_STATE,
  [LOGOUT]: (state, action) => INITIAL_STATE,
  [SEARCH_TEXT_FILTER]: (state, action) => merge({}, state, {
    data: state.dataWithOut.filter(
        (student) =>
          `${(student.first_name || '').toLowerCase()} ${(student.last_name || '').toLowerCase()}`.includes(action.value.toLowerCase()),
    ),
  }),
  [SHOW_STUDENT_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: {
      ...action,
    },
  }),
  [CLOSE_STUDENT_ACTIONS_MENU]: (state) => ({
    ...state,
    actionMenuAttrs: {
      ...INITIAL_STATE.actionMenuAttrs,
    },
  }),
}, INITIAL_STATE);
