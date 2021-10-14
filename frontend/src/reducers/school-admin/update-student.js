import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {BASE_INITIAL_STATE, getBasePersonCreateUpdate} from './base';
import {UPDATE_STUDENT_ACTION} from '../../actions/school/update-student';
import {GET_PASSWORD_SUCCESS} from '../../actions/school/school_admin_page';
import {SELECT_EDIT_STUDENT} from '../../actions/user/teacherStudents';

export const INITIAL_STATE = {
  ...BASE_INITIAL_STATE,
  person: {},
};

export default createReducer({
  ...getBasePersonCreateUpdate(UPDATE_STUDENT_ACTION),
  [GET_PASSWORD_SUCCESS]: (state, action) => merge({}, state, {
    selectedTeacherId: action.selectedPerson.id,
  }),
  [SELECT_EDIT_STUDENT]: (state, action) => merge({}, state, {
    person: action.student,
    selectedTeacherId: action.student.teacher_id,
    selectedGroupId: action.student.group_id || 'null',
    first_name: action.student.first_name,
    last_name: action.student.last_name,
    username: action.student.username,
  }),
}, INITIAL_STATE);
