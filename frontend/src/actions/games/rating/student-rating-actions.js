import axios from 'axios';
import {history} from '../../../index';
import {USER} from '../../../store/storage_kets';

export const GET_RATING_SUCCESS = 'STUDENTS_RATING/GET_RATING_SUCCESS';
export const GET_RATING_FAIL = 'STUDENTS_RATING/GET_RATING_FAIL';
export const MORE_STUDENT_RATINGS = 'STUDENTS_RATING/MORE_STUDENT_RATINGS';
export const CLEAR_RATINGS = 'STUDENTS_RATING/CLEAR_RATINGS';
export const CHANGE_SEARCH_VALUE = 'STUDENTS_RATING/CHANGE_SEARCH_VALUE';
export const GET_SEARCH_STUDENT_RATING_SUCCESS = 'STUDENTS_RATING/GET_SEARCH_STUDENT_RATING_SUCCESS';
export const GET_SEARCH_STUDENT_RATING_FAIL = 'STUDENTS_RATING/GET_SEARCH_STUDENT_RATING_FAIL';

export const getPageRatings = () => {
  return {
    type: MORE_STUDENT_RATINGS,
  };
};

export const changeSearchValue = (value) => ({
  type: CHANGE_SEARCH_VALUE,
  value,
});
export const getStudentRatings = () => {
  return (dispatch, getState) => {
    const {page} = getState().ratings;
    const url = `/api/users/search_students?q=&school_id=&page=${page}&count=50`;
    axios.get(url)
        .then((response) => {
          const {students} = response.data;
          dispatch({
            type: GET_RATING_SUCCESS,
            ratings: students,
          });
        })
        .catch((error) => {
          dispatch({
            type: GET_RATING_FAIL,
            error: error.response,
          });
        });
  };
};

export const getSearchStudentsRatings = (isGlobal) => {
  return (dispatch, getState) => {
    const user = JSON.parse(localStorage.getItem(USER));
    const {page, searchValue} = getState().ratings;
    const url = `/api/users/search_students?q=${searchValue}&school_id=${isGlobal ? '' : user.school_id}&page=${page + 1}&count=50`;
    axios.get(url)
        .then((response) => {
          const {students} = response.data;
          dispatch({
            type: GET_SEARCH_STUDENT_RATING_SUCCESS,
            ratings: students,
          });
        })
        .catch((error) => {
          dispatch({
            type: GET_SEARCH_STUDENT_RATING_FAIL,
            error: error.response,
          });
        });
  };
};

export const sideMenuCloseButton = () => (dispatch) => {
  dispatch({type: CLEAR_RATINGS});
  history.push('/games');
};
