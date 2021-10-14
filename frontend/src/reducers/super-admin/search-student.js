import {merge} from 'extend-merge';
import createReducer from '../utils/base';


import {
  GET_GROUP_SELECT_OPTIONS_FAIL,
  GET_GROUP_SELECT_OPTIONS_SUCCESS,
  GET_SCHOOL_SELECT_OPTIONS_FAIL,
  GET_SCHOOL_SELECT_OPTIONS_SUCCESS,
  GET_TEACHER_SELECT_OPTIONS_FAIL,
  GET_TEACHER_SELECT_OPTIONS_SUCCESS,
  SEARCH_STUDENTS_FAIL,
  SEARCH_STUDENTS_FETCH,
  SEARCH_STUDENTS_SUCCESS,
  SET_GROUP_ID_FOR_FILTER,
  SET_PAGE,
  SET_PAGINATION_COUNT,
  SET_SCHOOL_ID_FOR_FILTER,
  SET_SEARCH_VALUE,
  SET_TEACHER_ID_FOR_FILTER,
  SET_PLAYED_AT_FOR_FILTER,
} from '../../actions/super-admin/search-student-actions';
import {DELETE_STUDENT_SUCCESS} from '../../actions/user/student';


const INITIAL_STATE = {
  searchResult: {
    total: null,
    students: [],
  },
  searchValue: '',
  selectedSchoolId: '__all__',
  selectedTeacherId: '__all__',
  selectedGroupId: '__all__',
  playedAt: null,
  page: 1,
  paginationCount: 10,
  searchStudentsError: '',
  schoolSelectOptions: [],
  teacherSelectOptions: [],
  groupSelectOptions: [],
  getSchoolsError: '',
  getTeachersError: '',
  getGroupsError: '',
  isLoading: true,
};


export default createReducer({
  [SEARCH_STUDENTS_SUCCESS]: (state, action) => ({
    ...state,
    searchResult: action.searchResult,
    isLoading: false,
  }),
  [SEARCH_STUDENTS_FAIL]: (state, action) => merge({}, state, {searchStudentsError: action.error}),
  [SET_SEARCH_VALUE]: (state, action) => merge({}, state, {searchValue: action.searchValue, isLoading: false}),
  [SET_SCHOOL_ID_FOR_FILTER]: (state, action) => merge({}, state, {selectedSchoolId: action.selectedSchoolId, isLoading: false}),
  [SET_TEACHER_ID_FOR_FILTER]: (state, action) => merge({}, state, {selectedTeacherId: action.selectedTeacherId}),
  [SET_GROUP_ID_FOR_FILTER]: (state, action) => merge({}, state, {selectedGroupId: action.selectedGroupId}),
  [SET_PLAYED_AT_FOR_FILTER]: (state, action) => merge({}, state, {playedAt: action.playedAt}),
  [SET_PAGE]: (state, action) => merge({}, state, {page: action.page}),
  [SET_PAGINATION_COUNT]: (state, action) => merge({}, state, {paginationCount: action.paginationCount}),
  [GET_SCHOOL_SELECT_OPTIONS_SUCCESS]: (state, action) => ({
    ...state,
    schoolSelectOptions: action.schoolSelectOptions,
  }),
  [GET_TEACHER_SELECT_OPTIONS_SUCCESS]: (state, action) => ({
    ...state,
    teacherSelectOptions: action.teacherSelectOptions,
  }),
  [GET_GROUP_SELECT_OPTIONS_SUCCESS]: (state, action) => ({
    ...state,
    groupSelectOptions: action.groupSelectOptions,
  }),
  [GET_SCHOOL_SELECT_OPTIONS_FAIL]: (state, action) => merge({}, state, {getSchoolsError: action.error}),
  [GET_TEACHER_SELECT_OPTIONS_FAIL]: (state, action) => merge({}, state, {getTeachersError: action.error}),
  [GET_GROUP_SELECT_OPTIONS_FAIL]: (state, action) => merge({}, state, {getGroupsError: action.error}),
  [SEARCH_STUDENTS_FETCH]: (state, action) => merge({}, state, {isLoading: true}),
  [DELETE_STUDENT_SUCCESS]: (state, action) => merge({}, state, {
    searchResult: {
      ...state.searchResult,
      students: (state.searchResult.students || []).filter((student) => student.id !== action.studentId),
    },
  }),
}, INITIAL_STATE);
