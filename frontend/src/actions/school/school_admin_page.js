import axios from 'axios';
import {USER, USER_TOKEN_KEY} from '../../store/storage_kets';
import {history} from '../../index';
import moment from 'moment';

export const GET_TEACHER_SUCCESS = 'SCHOOL_ADMIN/GET_TEACHER_SUCCESS';
export const GET_TEACHER_FAIL = 'SCHOOL_ADMIN/GET_TEACHER_FAIL';
export const GET_STUDENT_SUCCESS = 'SCHOOL_ADMIN/GET_STUDENT_SUCCESS';
export const GET_STUDENT_FAIL = 'SCHOOL_ADMIN/GET_STUDENT_FAIL';
export const GET_SCHOOL_SUCCESS = 'SCHOOL_ADMIN/GET_SCHOOL_SUCCESS';
export const GET_SCHOOL_FAIL = 'SCHOOL_ADMIN/GET_SCHOOL_FAIL';
export const GET_PASSWORD_FETCH = 'SCHOOL_ADMIN/GET_PASSWORD_FETCH';
export const GET_PASSWORD_SUCCESS = 'SCHOOL_ADMIN/GET_PASSWORD_SUCCESS';
export const GET_PASSWORD_FAIL = 'SCHOOL_ADMIN/GET_PASSWORD_FAIL';
export const ON_CLOSE_MODAL = 'SCHOOL_ADMIN/ON_CLOSE_MODAL';
export const SELECT_EDIT_PERSON = 'SCHOOL_ADMIN/SELECT_EDIT_PERSON';
export const UPDATE_TEACHER_ACCESS_SUCCESS = 'UPDATE_TEACHER_ACCESS_SUCCESS';
export const UPDATE_TEACHER_ACCESS_FAIL = 'UPDATE_TEACHER_ACCESS_FAIL';
export const FINISH_UPDATE_TEACHER_ACCESS = 'FINISH_UPDATE_TEACHER_ACCESS';
export const SEARCH_TEXT_FILTER = 'SCHOOL_ADMIN/SEARCH_TEXT_FILTER';
export const SHOW_TEACHER_ACTIONS_MENU = 'SCHOOL_ADMIN/SHOW_TEACHER_ACTIONS_MENU';
export const CLOSE_TEACHER_ACTIONS_MENU = 'SCHOOL_ADMIN/SCHOOL_ADMIN';


export const getTeachers = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem(USER));
    const baseUrl = `api/schools/${user.school_id}/teachers`;
    axios.get(baseUrl)
        .then((response) => {
          let teachers = response.data;
          teachers = teachers.map((teacher) => {
            const expDate = new Date(teacher.active_until);
            teacher.needToUpdateAccess = !(!teacher.active_until || expDate >= new Date());
            if (!teacher.active_until) {
              teacher.active_until = 'Frozen.';
              return teacher;
            }

            if (new Date().getTime() > expDate.getTime()) {
              teacher.active_until = 'Package expired!';
              return teacher;
            }

            teacher.active_until = !!teacher.active_until ? moment(expDate).format('MMM Do YYYY') : undefined;
            return teacher;
          });

          dispatch({
            type: GET_TEACHER_SUCCESS,
            teachers: teachers,
          });
        })
        .catch((error) => {
          dispatch({
            type: GET_TEACHER_FAIL,
            error,
          });
        });
  };
};

export const redirectToEditTeacher = (user) => (dispatch) => {
  history.push(`/update_teacher`);
  dispatch({type: SELECT_EDIT_PERSON, user});
};

export const redirectToEditSchoolAdmin = (user) => (dispatch) => {
  history.push(`/update_school_admin`);
  dispatch({type: SELECT_EDIT_PERSON, user});
};

export const handleFilter = (value) =>{
  return ({type: SEARCH_TEXT_FILTER, value});
};

export const getStudents = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem(USER));
    const baseUrl = `api/schools/${user.school_id}/students`;
    axios.get(baseUrl)
        .then((response) => {
          dispatch({
            type: GET_STUDENT_SUCCESS,
            students: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: GET_STUDENT_FAIL,
            error,
          });
        });
  };
};

export const getSchool = () => {
  return (dispatch, getState) => {
    const user = JSON.parse(localStorage.getItem(USER));
    const baseUrl = `api/schools/${user.school_id}`;
    axios.get(baseUrl)
        .then((response) => {
          dispatch({
            type: GET_SCHOOL_SUCCESS,
            school: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: GET_SCHOOL_FAIL,
            error,
          });
        });
  };
};


export function getPersonData(user) {
  return (dispatch) => {
    const baseUrl = `api/schools/${user.school_id}/students/${user.id}/password`;
    dispatch({type: GET_PASSWORD_FETCH, selectedPerson: user});
    axios.get( baseUrl)
        .then((response) => {
          dispatch({
            type: GET_PASSWORD_SUCCESS,
            userData: response.data,
            selectedPerson: user,
          });
          history.push(`/teacher_profile/${user.id}`);
        })
        .catch((error) => {
          dispatch({
            type: GET_PASSWORD_FAIL,
            error,
          });
        });
  };
}


export const updateTeacherAccess = (teacherId) => (dispatch) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const schoolAdmin = JSON.parse(localStorage.getItem(USER));
  const url = `/api/schools/${schoolAdmin.school_id}/teachers/${teacherId}/update_access`;

  axios.put(url, {}, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: UPDATE_TEACHER_ACCESS_SUCCESS,
          updatedTeacher: response.data,
        });
      })
      .catch((error) => {
        let errorMessage;
        if (error.response.data.error === 'school.package.empty') {
          errorMessage = 'Невожможно обновить доступ учителя. Пакет пуст!';
        } else {
          errorMessage = 'Что-то пошло не так!';
        }
        dispatch({
          type: UPDATE_TEACHER_ACCESS_FAIL,
          error: errorMessage,
        });
      });
};


export const finishUpdateTeacherAccess = () => (dispatch) => {
  dispatch({
    type: FINISH_UPDATE_TEACHER_ACCESS,
  });
};


export const onCloseModal =() => ({
  type: ON_CLOSE_MODAL,
});


export const showTeacherActionsMenu = ({teacher, needToUpdateAccess, canUpdateAccess, anchorEl}) => ({
  type: SHOW_TEACHER_ACTIONS_MENU,
  teacher,
  needToUpdateAccess,
  canUpdateAccess,
  anchorEl,
});


export const closeTeacherActionsMenu = () => ({
  type: CLOSE_TEACHER_ACTIONS_MENU,
});
