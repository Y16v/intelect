import axios from 'axios';
import {USER, USER_TOKEN_KEY} from '../../store/storage_kets';
import {TEACHER_ID} from '../../reducers/user/fixture';
import {history} from '../../index';
import {_reformatDate} from '../utils';

export const GET_TEACHER_STUDENTS_SUCCESS = 'GET_TEACHER_STUDENTS_SUCCESS';
export const GET_TEACHER_STUDENTS_FAIL = 'GET_TEACHER_STUDENTS_FAIL';
export const SELECT_EDIT_STUDENT ='TEACHER_STUDENT/SELECT_EDIT_STUDENT';
export const GET_TEACHER_SUCCESS = 'TEACHER_STUDENT/GET_TEACHER_SUCCESS';
export const GET_TEACHER_FAIL = 'TEACHER_STUDENT/GET_TEACHER_FAIL';


export const redirectToEditStudent = (student) => (dispatch) => {
  history.push(`/update_student`);
  dispatch({type: SELECT_EDIT_STUDENT, student});
};

export const getTeacherStudents = () => (dispatch, getState) => {
  const teacher = JSON.parse(localStorage.getItem(USER));
  const token = localStorage.getItem(USER_TOKEN_KEY);
  let teacherId;
  let schoolId;
  if (teacher.category_id === TEACHER_ID) {
    teacherId = teacher.id;
    schoolId = teacher.school_id;
  } else {
    const {selectedPerson} = getState().schoolAdminPage;
    teacherId = selectedPerson.id;
    schoolId = selectedPerson.school_id;
  }
  const url = `/api/schools/${schoolId || 0}/students?teacher_pk=${teacherId}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        let students = response.data;
        students = students.map((student) => {
          const expDate = new Date(student.active_until);
          student.needToUpdateAccess = !(!student.active_until || expDate >= new Date());

          if (!student.active_until) {
            student.active_until = 'Frozen.';
            return student;
          }

          if (new Date().getSeconds() > expDate.getSeconds()) {
            student.active_until = 'Package expired!';
            return student;
          }

          student.active_until = !!student.active_until ? _reformatDate(new Date(student.active_until)) : undefined;
          return student;
        });

        dispatch({
          type: GET_TEACHER_STUDENTS_SUCCESS,
          students: students,
        });
      })
      .catch(({response})=> {
        dispatch({
          type: GET_TEACHER_STUDENTS_FAIL,
          error: response.data.error,
        });
      });
};


export const getTeacher = (teacherId) => (dispatch) => {
  const url = `/api/users/${teacherId}`;
  axios.get(url)
      .then((response) => {
        dispatch({
          type: GET_TEACHER_SUCCESS,
          teacher: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_TEACHER_FAIL,
          error,
        });
      });
};


