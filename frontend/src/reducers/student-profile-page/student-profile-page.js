import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  STUDENT_PROFILE_PAGE_FAIL,
  STUDENT_PROFILE_PAGE_SUCCESS,
} from '../../actions/student-profile-page/student-profile-page';

const INITIAL_STATE = {
  getStudentProfilePageResult: [],
};

export default createReducer({
  [STUDENT_PROFILE_PAGE_SUCCESS]: (state, action) => merge({}, state, {
    getStudentProfilePageResult: action.StudentProfilePageResult,
  }),
  [STUDENT_PROFILE_PAGE_FAIL]: (state, action) => merge({}, state, {error: action.error}),

}, INITIAL_STATE);
