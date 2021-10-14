import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  CLOSE_TEACHER_ACTIONS_MENU,
  FINISH_UPDATE_TEACHER_ACCESS,
  GET_PASSWORD_FETCH,
  GET_PASSWORD_SUCCESS,
  GET_SCHOOL_FAIL,
  GET_SCHOOL_SUCCESS,
  GET_STUDENT_FAIL,
  GET_STUDENT_SUCCESS,
  GET_TEACHER_FAIL,
  GET_TEACHER_SUCCESS,
  ON_CLOSE_MODAL,
  SEARCH_TEXT_FILTER,
  SHOW_TEACHER_ACTIONS_MENU,
  UPDATE_TEACHER_ACCESS_FAIL,
  UPDATE_TEACHER_ACCESS_SUCCESS,
} from '../../actions/school/school_admin_page';
import {USER} from '../../store/storage_kets';
import {LOGIN_REQUEST_SUCCESS, LOGOUT} from '../../actions/login/login';
import {UPDATE_SCHOOL_ADMIN_SUCCESS} from '../../actions/school/update-school-admin';

const INITIAL_STATE = {
  teachers: [],
  students: [],
  school: {},
  user: JSON.parse(localStorage.getItem(USER)),
  isOpenModal: false,
  userData: {},
  selectedPerson: {},
  updateTeacherAccess: {
    updatedTeacher: {},
    error: '',
  },
  actionMenuAttrs: {
    teacher: {},
    needToUpdateAccess: false,
    canUpdateAccess: false,
    anchorEl: null,
  },
  teachersWithOut: [],
};

export default createReducer({
  [UPDATE_TEACHER_ACCESS_SUCCESS]: (state, action) => merge({}, state, {updateTeacherAccess: {...action}}),
  [UPDATE_TEACHER_ACCESS_FAIL]: (state, action) => merge({}, state, {updateTeacherAccess: {...action}}),
  [FINISH_UPDATE_TEACHER_ACCESS]: (state, action) => ({
    ...state,
    updateTeacherAccess: {
      updatedTeacher: {},
      error: '',
    },
  }),
  [GET_SCHOOL_SUCCESS]: (state, action) => merge({}, state, {school: action.school}),
  [GET_TEACHER_SUCCESS]: (state, action) => merge({}, state, {
    teachers: action.teachers,
    teachersWithOut: action.teachers,
  }),
  [GET_TEACHER_FAIL]: (state, action) => merge({}, state, {error: action.error}),

  [GET_STUDENT_SUCCESS]: (state, action) => merge({}, state, {students: [...action.students]}),
  [GET_STUDENT_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [GET_SCHOOL_FAIL]: (state, action) => merge({}, state, {error: action.error}),
  [GET_PASSWORD_SUCCESS]: (state, action) => merge({}, state, {
    isOpenModal: true,
    userData:
        action.userData,
    selectedPerson:
        action.selectedPerson,
  }),
  [GET_PASSWORD_FETCH]: (state, action) => merge({}, state, {selectedPerson: action.selectedPerson}),
  [ON_CLOSE_MODAL]: (state, action) => merge({}, state, {isOpenModal: false, selectedPerson: {}}),
  [LOGIN_REQUEST_SUCCESS]: (state, action) => merge({}, state, {
    user: action.user,
  }),
  [SEARCH_TEXT_FILTER]: (state, action) => merge({}, state, {
    teachers: state.teachersWithOut.filter(
        (teacher) =>
          `${(teacher.first_name || '').toLowerCase()} ${(teacher.last_name || '').toLowerCase()}`.includes(action.value.toLowerCase()),
    ),

  }),
  [SHOW_TEACHER_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: action,
  }),
  [CLOSE_TEACHER_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: {
      ...INITIAL_STATE.actionMenuAttrs,
    },
  }),
  [LOGOUT]: (state, action) => ({
    ...INITIAL_STATE,
  }),
  [UPDATE_SCHOOL_ADMIN_SUCCESS]: (state, action) => merge({}, state, {
    user: JSON.parse(localStorage.getItem(USER)),
  }),


}, INITIAL_STATE);
