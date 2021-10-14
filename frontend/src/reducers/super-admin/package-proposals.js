import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  CLOSE_PROPOSAL_ACTIONS_MENU,
  GET_PACKAGE_PROPOSALS_FAIL,
  GET_PACKAGE_PROPOSALS_SUCCESS,
  GET_SCHOOL_SELECT_OPTIONS_FAIL,
  GET_SCHOOL_SELECT_OPTIONS_SUCCESS,
  SET_PAGE,
  SET_PAGINATION_COUNT,
  SET_SCHOOL_ID_FOR_FILTER,
  SET_STATUS_FOR_FILTER, SHOW_PROPOSAL_ACTIONS_MENU,

} from '../../actions/super-admin/package-proposals';
import packageProposalStatuses from '../../constants/packageProposalStatuses';


const INITIAL_STATE = {
  totalProposals: null,
  proposals: [],
  page: 1,
  paginationCount: 10,
  schools: [],
  schoolIdForFilter: '__all__',
  statusForFilter: packageProposalStatuses._pending.code,
  getSchoolsError: '',
  getProposalsError: '',
  actionMenuAttrs: {
    proposalId: null,
    anchorEl: null,
    canUpdateStatus: false,
  },
};


export default createReducer({
  [SET_SCHOOL_ID_FOR_FILTER]: (state, action) => merge({}, state, {...action}),
  [SET_STATUS_FOR_FILTER]: (state, action) => merge({}, state, {...action}),
  [SET_PAGE]: (state, action) => merge({}, state, {...action}),
  [SET_PAGINATION_COUNT]: (state, action) => merge({}, state, {...action}),
  [GET_PACKAGE_PROPOSALS_SUCCESS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [GET_SCHOOL_SELECT_OPTIONS_SUCCESS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [GET_SCHOOL_SELECT_OPTIONS_FAIL]: (state, action) => merge({}, state, {getSchoolsError: action.error}),
  [GET_PACKAGE_PROPOSALS_FAIL]: (state, action) => merge({}, state, {getProposalsError: action.error}),
  [SHOW_PROPOSAL_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: action,
  }),
  [CLOSE_PROPOSAL_ACTIONS_MENU]: (state, action) => ({
    ...state,
    actionMenuAttrs: {
      proposalId: null,
      anchorEl: null,
      canUpdateStatus: false,
    },
  }),
}, INITIAL_STATE);
