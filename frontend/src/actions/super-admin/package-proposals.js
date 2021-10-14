import axios from 'axios';
import {USER_TOKEN_KEY} from '../../store/storage_kets';
import swal from 'sweetalert';
import packageProposalStatuses from '../../constants/packageProposalStatuses';
import {createNotification} from 'react-redux-notify';
import {
  packageProposalConfirmedSuccessNotificationConf,
  packageProposalConfirmFailNotificationConf,
  packageProposalRejectedSuccessNotificationConf,
  packageProposalRejectFailNotificationConf,
} from '../school/notifications';
import moment from 'moment';


export const GET_SCHOOL_SELECT_OPTIONS_SUCCESS = 'SUPER_ADMIN/PACKAGE_PROPOSALS/GET_SCHOOL_SELECT_OPTIONS_SUCCESS';
export const GET_SCHOOL_SELECT_OPTIONS_FAIL = 'SUPER_ADMIN/PACKAGE_PROPOSALS/GET_SCHOOL_SELECT_OPTIONS_FAIL';
export const SET_SCHOOL_ID_FOR_FILTER = 'SUPER_ADMIN/PACKAGE_PROPOSALS/SET_SCHOOL_ID_FOR_FILTER';
export const SET_STATUS_FOR_FILTER = 'SUPER_ADMIN/PACKAGE_PROPOSALS/SET_STATUS_FOR_FILTER';
export const SET_PAGE = 'SUPER_ADMIN/PACKAGE_PROPOSALS/SET_PAGE';
export const SET_PAGINATION_COUNT = 'SUPER_ADMIN/PACKAGE_PROPOSALS/SET_PAGINATION_COUNT';
export const GET_PACKAGE_PROPOSALS_SUCCESS = 'SUPER_ADMIN/PACKAGE_PROPOSALS/GET_PACKAGE_PROPOSALS_SUCCESS';
export const GET_PACKAGE_PROPOSALS_FAIL = 'SUPER_ADMIN/PACKAGE_PROPOSALS/GET_PACKAGE_PROPOSALS_FAIL';
export const SHOW_PROPOSAL_ACTIONS_MENU = 'SUPER_ADMIN/PACKAGE_PROPOSALS/SHOW_ACTIONS_MENU';
export const CLOSE_PROPOSAL_ACTIONS_MENU = 'SUPER_ADMIN/PACKAGE_PROPOSALS/CLOSE_ACTIONS_MENU';


export const setSchoolIdForFilter = (schoolIdForFilter) => ({
  type: SET_SCHOOL_ID_FOR_FILTER,
  schoolIdForFilter,
});


export const setStatusForFilter = (statusForFilter) => ({
  type: SET_STATUS_FOR_FILTER,
  statusForFilter,
});


export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});


export const setPaginationCount = (paginationCount) => ({
  type: SET_PAGINATION_COUNT,
  paginationCount,
});


export const getSchools = () => (dispatch) => {
  const url = '/api/schools';
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_SCHOOL_SELECT_OPTIONS_SUCCESS,
          schools: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SCHOOL_SELECT_OPTIONS_FAIL,
          error,
        });
      });
};


export const getPackageProposals = () => (dispatch, getState) => {
  const state = getState();
  let {schoolIdForFilter, statusForFilter, page, paginationCount} = state.superAdminPackageProposals;

  schoolIdForFilter = !schoolIdForFilter || schoolIdForFilter === '__all__' ? '' : schoolIdForFilter;
  statusForFilter = !statusForFilter || statusForFilter === '__all__' ? '' : statusForFilter;

  const url = `/api/schools/package_proposals?school_id=${schoolIdForFilter}` +
        `&status=${statusForFilter}&page=${page}&count=${paginationCount}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const headers = {Authorization: token};

  axios.get(url, {headers})
      .then((response) => {
        const packageProposal = response.data.package_proposals.map((packageProposal) => {
          const status = packageProposalStatuses[packageProposal.status];
          packageProposal.statusDisplayName = status && status.displayName;
          packageProposal.created_at = moment(new Date(packageProposal.created_at)).format('MMM Do YYYY');
          packageProposal.confirmed_at = moment(new Date(packageProposal.confirmed_at)).format('MMM Do YYYY');

          return packageProposal;
        });

        dispatch({
          type: GET_PACKAGE_PROPOSALS_SUCCESS,
          proposals: packageProposal,
          totalProposals: response.data.total,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_PACKAGE_PROPOSALS_FAIL,
          error,
        });
      });
};


export const rejectProposal = (proposalId) => (dispatch) => {
  swal({
    title: 'Вы действительно хотите отказать предложению.?',
    icon: 'warning',
    dangerMode: true,
    buttons: {
      cancel: 'Отменить',
      defeat: 'Да, отказать',
    },
  })
      .then((willReject) => {
        if (!willReject) return dispatch(closeProposalActionsMenu());

        const url = `/api/schools/package_proposals/${proposalId}/update_status`;
        const token = localStorage.getItem(USER_TOKEN_KEY);
        const headers = {Authorization: token};

        axios.put(url, {status: packageProposalStatuses._codes._rejected}, {headers})
            .then(() => {
              dispatch(createNotification(packageProposalRejectedSuccessNotificationConf));
              dispatch(closeProposalActionsMenu());
              dispatch(getPackageProposals());
            })
            .catch(() => {
              dispatch(createNotification(packageProposalRejectFailNotificationConf));
            });
      });
};


export const confirmProposal = (proposalId) => (dispatch) => {
  swal({
    title: 'Подтвердите действие',
    icon: 'warning',
    dangerMode: true,
    buttons: {
      cancel: 'Назад',
      defeat: 'Принять заявку',
    },
  })
      .then((willConfirm) => {
        if (!willConfirm) return dispatch(closeProposalActionsMenu());

        const url = `/api/schools/package_proposals/${proposalId}/update_status`;
        const token = localStorage.getItem(USER_TOKEN_KEY);
        const headers = {Authorization: token};

        axios.put(url, {status: packageProposalStatuses._codes._confirmed}, {headers})
            .then(() => {
              dispatch(createNotification(packageProposalConfirmedSuccessNotificationConf));
              dispatch(closeProposalActionsMenu());
              dispatch(getPackageProposals());
            })
            .catch(() => {
              dispatch(createNotification(packageProposalConfirmFailNotificationConf));
            });
      });
};


export const showProposalActionsMenu = (proposalId, anchorEl, canUpdateStatus) => ({
  type: SHOW_PROPOSAL_ACTIONS_MENU,
  proposalId,
  anchorEl,
  canUpdateStatus,
});


export const closeProposalActionsMenu = () => ({
  type: CLOSE_PROPOSAL_ACTIONS_MENU,
});
