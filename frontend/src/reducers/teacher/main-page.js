import createReducer from '../utils/base';
import {LOGOUT} from '../../actions/login/login';
import {SHOW_GROUP_ACTIONS_MENU, CLOSE_GROUP_ACTIONS_MENU, DELETE_GROUP_SUCCESS} from '../../actions/school/group';

const INITIAL_STATE = {
  teacher: '',
  groups: [],
  groupActionMenuAttrs: {
    anchorEl: null,
    groupId: null,
    groupName: '',
    deleteGroupSuccess: false,
  },
};

export default createReducer({
  [LOGOUT]: (state, action) => INITIAL_STATE,
  [SHOW_GROUP_ACTIONS_MENU]: (state, action) => ({
    ...state,
    groupActionMenuAttrs: {...action},
  }),
  [DELETE_GROUP_SUCCESS]: (state) => ({
    ...state,
    groupActionMenuAttrs: {
      ...state.groupActionMenuAttrs,
      deleteGroupSuccess: true,
    },
  }),
  [CLOSE_GROUP_ACTIONS_MENU]: (state) => ({
    ...state,
    groupActionMenuAttrs: {
      anchorEl: null,
      groupId: null,
      groupName: '',
      deleteGroupSuccess: false,

    },
  }),
}, INITIAL_STATE);
