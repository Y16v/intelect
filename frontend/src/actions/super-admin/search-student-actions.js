import axios from 'axios';
import {USER_TOKEN_KEY} from '../../store/storage_kets';
import moment from 'moment';

export const SET_SCHOOL_ID_FOR_FILTER = 'SEARCH_STUDENTS/SET_SCHOOL_ID_FOR_FILTER';
export const SET_TEACHER_ID_FOR_FILTER = 'SEARCH_STUDENTS/SET_TEACHER_ID_FOR_FILTER';
export const SET_GROUP_ID_FOR_FILTER = 'SEARCH_STUDENTS/SET_GROUP_ID_FILTER';
export const SET_PLAYED_AT_FOR_FILTER = 'SEARCH_STUDENTS/SET_PLAYED_AT_FOR_FILTER';
export const SEARCH_STUDENTS_SUCCESS = 'SEARCH_STUDENTS/SEARCH_STUDENTS_SUCCESS';
export const SEARCH_STUDENTS_FAIL = 'SEARCH_STUDENTS/SEARCH_STUDENTS_FAIL';
export const SET_SEARCH_VALUE = 'SEARCH_STUDENTS/SET_SEARCH_VALUE';
export const SET_PAGE = 'SEARCH_STUDENTS/SET_PAGE';
export const SET_PAGINATION_COUNT = 'SEARCH_STUDENTS/SET_PAGINATION_COUNT';
export const GET_SCHOOL_SELECT_OPTIONS_SUCCESS = 'SEARCH_STUDENTS/SET_SCHOOL_SELECT_OPTIONS';
export const GET_SCHOOL_SELECT_OPTIONS_FAIL = 'SEARCH_STUDENTS/GET_SCHOOL_SELECT_OPTIONS_FAIL';
export const GET_TEACHER_SELECT_OPTIONS_SUCCESS = 'SEARCH_STUDENTS/SET_TEACHER_SELECT_OPTIONS';
export const GET_TEACHER_SELECT_OPTIONS_FAIL = 'SEARCH_STUDENTS/GET_TEACHER_SELECT_OPTIONS_FAIL';
export const GET_GROUP_SELECT_OPTIONS_SUCCESS = 'SEARCH_STUDENTS/GET_GROUP_SELECT_OPTIONS_SUCCESS';
export const GET_GROUP_SELECT_OPTIONS_FAIL = 'SEARCH_STUDENTS/GET_GROUP_SELECT_OPTIONS_FAIL';
export const SEARCH_STUDENTS_FETCH = 'SEARCH_STUDENTS/SEARCH_STUDENTS_FETCH';


export const searchStudents = () => (dispatch, getState) => {
  const {searchStudents} = getState();
  let {
    searchValue,
    selectedSchoolId,
    selectedTeacherId,
    selectedGroupId,
    playedAt,
    page,
    paginationCount,
  } = searchStudents;

  selectedSchoolId = selectedSchoolId !== '__all__' ? selectedSchoolId : '';
  selectedTeacherId = selectedTeacherId !== '__all__' ? selectedTeacherId : '';
  selectedGroupId = selectedGroupId !== '__all__' ? selectedGroupId : '';

  if (!playedAt) {
    playedAt = '';
  } else {
    playedAt = typeof playedAt === 'string' ? playedAt : playedAt.format('YYYY-MM-DD');
  }
  const url = `/api/users/search_students?q=${searchValue}` +
        `&school_id=${selectedSchoolId}&teacher_id=${selectedTeacherId}` +
        `&group_id=${selectedGroupId}&played_at=${playedAt}&page=${page}&count=${paginationCount}`;

  dispatch({type: SEARCH_STUDENTS_FETCH});
  axios.get(url)
      .then((response) => {
        response.data.students = response.data.students.map((student) => {
          const expDate = new Date(student.active_until);
          student.needToUpdateAccess = !(!student.active_until || expDate >= new Date());

          if (!student.active_until) {
            student.active_until = 'Frozen.';
            return student;
          }
          if (new Date().getTime() > expDate.getTime()) {
            student.active_until = 'Package expired!';
            return student;
          }
          student.active_until = moment(expDate).format('MMM Do YYYY');
          return student;
        });
        dispatch({
          type: SEARCH_STUDENTS_SUCCESS,
          searchResult: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: SEARCH_STUDENTS_FAIL,
          error: response && response.data && response.data.error,
        });
      });
};


export const setSearchValue = (value) => ({
  type: SET_SEARCH_VALUE,
  searchValue: value,
});


export const setSchoolIdAndSetTeacherSelectOptions = (schoolId) => (dispatch) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);

  dispatch({
    type: SET_SCHOOL_ID_FOR_FILTER,
    selectedSchoolId: schoolId,
  });
  dispatch({
    type: SET_TEACHER_ID_FOR_FILTER,
    selectedTeacherId: '__all__',
  });
  dispatch({
    type: SET_GROUP_ID_FOR_FILTER,
    selectedGroupId: '__all__',
  });

  if (schoolId === '__all__') {
    dispatch({
      type: SET_SCHOOL_ID_FOR_FILTER,
      selectedSchoolId: schoolId,
    });
    dispatch({
      type: GET_TEACHER_SELECT_OPTIONS_SUCCESS,
      teacherSelectOptions: [],
    });
    dispatch({
      type: GET_GROUP_SELECT_OPTIONS_SUCCESS,
      groupSelectOptions: [],
    });
    return;
  }

  axios.get(`/api/schools/${schoolId}/teachers`,
      {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_TEACHER_SELECT_OPTIONS_SUCCESS,
          teacherSelectOptions: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: GET_TEACHER_SELECT_OPTIONS_FAIL,
          error: (response && response.data && response.data.error) || 'Что-то пошло не так!',
        });
      });
};


export const setSchoolSelectOptions = () => (dispatch) => {
  const url = '/api/schools';
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_SCHOOL_SELECT_OPTIONS_SUCCESS,
          schoolSelectOptions: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: GET_SCHOOL_SELECT_OPTIONS_FAIL,
          error: response && response.data && response.data.error,
        });
      });
};


export const setSchoolId = (selectedSchoolId) => ({
  type: SET_SCHOOL_ID_FOR_FILTER,
  selectedSchoolId,
});


export const setTeacherIdAndSetGroupSelectOptions = (selectedTeacherId) => (dispatch, getState) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const state = getState();
  const {selectedSchoolId} = state.searchStudents;

  dispatch({
    type: SET_TEACHER_ID_FOR_FILTER,
    selectedTeacherId,
  });
  dispatch({
    type: SET_GROUP_ID_FOR_FILTER,
    selectedGroupId: '__all__',
  });

  if (!selectedTeacherId || selectedTeacherId === '__all__') {
    dispatch({
      type: GET_GROUP_SELECT_OPTIONS_SUCCESS,
      groupSelectOptions: [],
    });

    return;
  }

  const teacherId = selectedTeacherId && selectedTeacherId === '__all__' ? '' : selectedTeacherId;
  axios.get(
      `/api/schools/${selectedSchoolId}/groups?teacher_id=${teacherId}`,
      {headers: {Authorization: token}},
  )
      .then((response) => {
        dispatch({
          type: GET_GROUP_SELECT_OPTIONS_SUCCESS,
          groupSelectOptions: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: GET_GROUP_SELECT_OPTIONS_FAIL,
          error: response && response.data && response.data.error,
        });
      });
};


export const setTeacherId = (selectedTeacherId) => ({
  type: SET_TEACHER_ID_FOR_FILTER,
  selectedTeacherId,
});


export const setPlayedAt = (playedAt) => ({
  type: SET_PLAYED_AT_FOR_FILTER,
  playedAt,
});


export const setGroupId = (selectedGroupId) => ({
  type: SET_GROUP_ID_FOR_FILTER,
  selectedGroupId,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});


export const setPaginationCount = (paginationCount) => (dispatch) => {
  dispatch({
    type: SET_PAGINATION_COUNT,
    paginationCount,
  });
  dispatch({
    type: SET_PAGE,
    page: 1,
  });
};


