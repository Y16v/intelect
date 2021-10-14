import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {BASE_INITIAL_STATE, getBasePersonCreateUpdate} from './base';
import {
  CREATE_TEACHER_PAGE,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_FAIL,
} from '../../actions/school/create-teacher-page';

export const INITIAL_STATE = {
  ...BASE_INITIAL_STATE,
};

export default createReducer({
  ...getBasePersonCreateUpdate(CREATE_TEACHER_PAGE),
  [CREATE_TEACHER_SUCCESS]: (state, action) => {
    return merge({}, state, {
      teachersResult: action.response,
    });
  },
  [CREATE_TEACHER_FAIL]: (state, action) => {
    return merge({}, state, {
      error: action.error,
      isError: true,
    });
  },
}, INITIAL_STATE);
