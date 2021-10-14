import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {TEACHER_PERSONAL_DATE_FAIL, TEACHER_PERSONAL_DATE_SUCCESS} from '../../actions/user/teacher-personal-date';

const INITIAL_STATE = {
  TeacherPersonalDate: [],
};

export default createReducer({
  [TEACHER_PERSONAL_DATE_SUCCESS]: (state, action) => merge({}, state, {
    TeacherPersonalDate: action.TeacherPersonalDate,
  }),
  [TEACHER_PERSONAL_DATE_FAIL]: (state, action) => merge({}, state, {error: action.error}),

}, INITIAL_STATE);
