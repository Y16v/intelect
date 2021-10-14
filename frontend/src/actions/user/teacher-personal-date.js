import axios from 'axios';

export const TEACHER_PERSONAL_DATE_SUCCESS = 'TEACHER_PERSONAL_DATE/TEACHER_PERSONAL_DATE_SUCCESS';
export const TEACHER_PERSONAL_DATE_FAIL = 'TEACHER_PERSONAL_DATE/TEACHER_PERSONAL_DATE_FAIL';

export const getTeacherPersonalDate = () => (dispatch) =>{
  const url = `/api/users/current`;
  axios.get(url)
      .then((response) => {
        dispatch({
          type: TEACHER_PERSONAL_DATE_SUCCESS,
          TeacherPersonalDate: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TEACHER_PERSONAL_DATE_FAIL,
          error,
        });
      });
};
