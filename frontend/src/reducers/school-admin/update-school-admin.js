import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {BASE_INITIAL_STATE, getBasePersonCreateUpdate} from './base';
import {UPDATE_SCHOOL_ADMIN} from '../../actions/school/update-school-admin';
import {SELECT_EDIT_PERSON} from '../../actions/school/school_admin_page';

export const INITIAL_STATE = {
  ...BASE_INITIAL_STATE,
  person: {},
};

export default createReducer({
  ...getBasePersonCreateUpdate(UPDATE_SCHOOL_ADMIN),
  [SELECT_EDIT_PERSON]: (state, action) => merge({}, state, {
    person: action.user,
    first_name: action.user.first_name,
    last_name: action.user.last_name,
    phone: action.user.phone,
    email: action.user.email,
    username: action.user.username,
  }),

}
, INITIAL_STATE);
