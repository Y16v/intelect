import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {
  GET_LOGGED_USER_SCHOOL_FAIL,
  GET_LOGGED_USER_SCHOOL_SUCCESS,
  GET_SCHOOL_PACKAGE_PROPOSALS_FAIL,
  GET_SCHOOL_PACKAGE_PROPOSALS_SUCCESS,
  RESET_STATE,
  SEND_PROPOSAL_FAIL, SET_PACKAGE_PROPOSALS_PAGE, SET_PACKAGE_PROPOSALS_PAGINATION_COUNT,
  SET_PROPOSAL_TYPE_TAB, GET_PACKAGE_TYPE_OPTIONS_FAIL, GET_PACKAGE_TYPE_OPTIONS_SUCCESS,
} from '../../actions/school/make-package-proposal';


const INITIAL_STATE = {
  tabNumber: 0,
  sendProposalFail: '',

  school: {
    id: null,
    owner_id: null,
    package_type_id: null,
    name: '',
    package: null,
    is_active: null,
    created_at: null,
    is_for_individual_students: null,
    package_type: {},
  },

  proposalsHistory: [],
  total: null,
  paginationCount: 10,
  page: 1,

  packageTypeOptions: [],
  getPackageTypeOptionsError: '',
  getSchoolError: '',
  getProposalsHistoryError: '',
};


export default createReducer({
  [SET_PROPOSAL_TYPE_TAB]: (state, action) => merge({}, state, {tabNumber: action.tabNumber}),
  [SEND_PROPOSAL_FAIL]: (state, action) => merge({}, state, {sendProposalFail: action.sendProposalFail}),

  [GET_PACKAGE_TYPE_OPTIONS_SUCCESS]: (state, action) => ({...state, packageTypeOptions: action.packageTypeOptions}),
  [GET_PACKAGE_TYPE_OPTIONS_FAIL]: (state, action) => merge({}, state, {getPackageTypeOptionsError: action.error}),
  [GET_LOGGED_USER_SCHOOL_SUCCESS]: (state, action) => ({...state, school: action.school}),
  [GET_LOGGED_USER_SCHOOL_FAIL]: (state, action) => merge({}, state, {getSchoolError: action.error}),
  [GET_SCHOOL_PACKAGE_PROPOSALS_SUCCESS]: (state, action) => ({
    ...state,
    ...action,
  }),
  [GET_SCHOOL_PACKAGE_PROPOSALS_FAIL]: (state, action) => merge({}, state, {getProposalsHistoryError: action.error}),
  [SET_PACKAGE_PROPOSALS_PAGE]: (state, action) => merge({}, state, {page: action.page}),
  [SET_PACKAGE_PROPOSALS_PAGINATION_COUNT]: (state, action) => merge({}, state, {paginationCount: action.paginationCount}),
  [RESET_STATE]: () => INITIAL_STATE,
}, INITIAL_STATE);
