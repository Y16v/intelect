import axios from 'axios';

export const STUDENT_PROFILE_PAGE_SUCCESS = 'STUDENT_PROFILE_PAGE_SUCCESS';
export const STUDENT_PROFILE_PAGE_FAIL = 'STUDENT_PROFILE_PAGE_FAIL';

export const getStudentProfilePage = () => (dispatch) =>{
  const url = `/api/users/current`;
  axios.get(url)
      .then((response) => {
        dispatch({
          type: STUDENT_PROFILE_PAGE_SUCCESS,
          StudentProfilePageResult: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: STUDENT_PROFILE_PAGE_FAIL,
          error,
        });
      });
};
