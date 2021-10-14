import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from '../../actions/user/profile';
import {USER_CATEGORY_NAME} from './fixture';
import {GET_VERSION_SUCCESS} from '../../actions/login/login';


export const INITIAL_STATE = {
  id: null,
  username: null,
  school_id: null,
  phone: null,
  email: null,
  first_name: null,
  last_name: null,
  is_active: null,
  category: '',
  version: '',
};


export default createReducer({
  [GET_USER_SUCCESS]: (state, action) => merge({}, state, {
    id: action.id,
    category_id: action.category_id,
    username: action.username,
    phone: action.phone,
    email: action.email,
    first_name: action.first_name,
    last_name: action.last_name,
    is_active: action.is_active,
    school_id: action.school_id,
    category: USER_CATEGORY_NAME[action.category_id],
  }),
  [GET_VERSION_SUCCESS]: (state, action) => merge({}, state, {version: action.version}),
  [GET_USER_FAIL]: (state, action) => merge({}, state, {error: action.error}),
},

INITIAL_STATE,
);

