import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {BASE_INITIAL_STATE, getBasePersonCreateUpdate} from './base';
import {CREATE_STUDENT_ACTION, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAIL} from '../../actions/school/create-student';
import {GET_PASSWORD_SUCCESS} from '../../actions/school/school_admin_page';

export const INITIAL_STATE = {
  ...BASE_INITIAL_STATE,
};

export default createReducer({
  ...getBasePersonCreateUpdate(CREATE_STUDENT_ACTION),
  [GET_PASSWORD_SUCCESS]: (state, action) => merge({}, state, {
    selectedTeacherId: action.selectedPerson.id,
  }),
  [CREATE_STUDENT_SUCCESS]: (state, action) => {
    return merge({}, state, {
      studentResults: action.response,
    });
  },
  [CREATE_STUDENT_FAIL]: (state, action) => {
    return merge({}, state, {
      error: action.error,
      isError: true,
    });
  },
}, INITIAL_STATE);
