import {merge} from 'extend-merge';

import createReducer from '../../utils/base';
import {BASE_INITIAL_STATE, getCreateUpdateGroupBaseReducers} from './base';
import {
  ACTION_TYPE_PREFIX, EDIT_GROUP_FAIL,
  RETRIEVE_GROUP_FAIL,
  RETRIEVE_GROUP_SUCCESS,
} from '../../../actions/school/create-update-group/edit-group';


const INITIAL_STATE = {
  ...BASE_INITIAL_STATE,
  id: null,
  retrieveGroupError: '',
  editGroupError: '',
};


export default createReducer({
  ...getCreateUpdateGroupBaseReducers(ACTION_TYPE_PREFIX),
  [RETRIEVE_GROUP_SUCCESS]: (state, action) => merge({}, state, {...action.group}),
  [RETRIEVE_GROUP_FAIL]: (state, action) => merge({}, state, {retrieveGroupError: action.error}),
  [EDIT_GROUP_FAIL]: (state, action) => merge({}, state, {editGroupError: action.error}),
}, INITIAL_STATE);
