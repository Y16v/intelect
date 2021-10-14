import axios from 'axios';
import moment from 'moment';

import {USER, USER_TOKEN_KEY} from '../../store/storage_kets';
import {createNotification} from 'react-redux-notify';
import {
  packageProposalCanceledSuccessNotificationConfig, packageProposalCancelFailNotificationConf,
  sendPackageProposalSuccessNotificationConfig,
} from './notifications';
import {history} from '../../index';
import packageProposalStatuses from '../../constants/packageProposalStatuses';
import swal from 'sweetalert';

export const SET_PROPOSAL_TYPE_TAB = 'MAKE_PACKAGE_PROPOSAL/SET_PROPOSAL_TYPE_TAB';
export const RESET_STATE = 'MAKE_PACKAGE_PROPOSAL/RESET_STATE';
export const SEND_PROPOSAL_FAIL = 'MAKE_PACKAGE_PROPOSAL/SEND_PROPOSAL_FAIL';
export const GET_PACKAGE_TYPE_OPTIONS_SUCCESS = 'MAKE_PACKAGE_PROPOSAL/GET_PACKAGE_TYPE_OPTIONS_SUCCESS';
export const GET_PACKAGE_TYPE_OPTIONS_FAIL = 'MAKE_PACKAGE_PROPOSAL/GET_PACKAGE_TYPE_OPTIONS_FAIL';
export const GET_LOGGED_USER_SCHOOL_SUCCESS = 'MAKE_PACKAGE_PROPOSAL/GET_LOGGED_USER_SCHOOL_SUCCESS';
export const GET_LOGGED_USER_SCHOOL_FAIL = 'MAKE_PACKAGE_PROPOSAL/GET_LOGGED_USER_SCHOOL_FAIL';
export const GET_SCHOOL_PACKAGE_PROPOSALS_SUCCESS = 'MAKE_PACKAGE_PROPOSAL/GET_SCHOOL_PACKAGE_PROPOSAL_HISTORY_SUCCESS';
export const GET_SCHOOL_PACKAGE_PROPOSALS_FAIL = 'MAKE_PACKAGE_PROPOSAL/GET_SCHOOL_PACKAGE_PROPOSAL_HISTORY_FAIL';
export const SET_PACKAGE_PROPOSALS_PAGE = 'MAKE_PACKAGE_PROPOSAL/SET_PACKAGE_PROPOSALS_PAGE';
export const SET_PACKAGE_PROPOSALS_PAGINATION_COUNT = 'MAKE_PACKAGE_PROPOSAL/SET_PACKAGE_PROPOSALS_PAGINATION_COUNT';


export const setProposalTypeTab = (tabNumber) => ({
  type: SET_PROPOSAL_TYPE_TAB,
  tabNumber,
});


export const makeUpgradePackageProposal = (package_type_id) => (dispatch, getState) => {
  const state = getState();
  const {id: school_id} = state.makePackageProposal.school;

  makeProposal(dispatch, school_id, package_type_id);
};


export const makeUpdatePackageProposal = () => (dispatch, getState) => {
  const state = getState();
  const {id: school_id, package_type_id} = state.makePackageProposal.school;

  makeProposal(dispatch, school_id, package_type_id);
};


function makeProposal(dispatch, school_id, package_type_id) {
  const url = '/api/schools/package_proposals';
  const data = {
    school_id: school_id,
    package_type_id: package_type_id,
  };
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const headers = {Authorization: token};

  axios.post(url, data, {headers})
      .then(() => {
        dispatch(createNotification(sendPackageProposalSuccessNotificationConfig));

        dispatch({
          type: RESET_STATE,
        });

        history.push('/school-admin-page');
      })
      .catch(() => {
        dispatch({
          type: SEND_PROPOSAL_FAIL,
          error: 'Что-то пошло нет!',
        });
      });
}


export const getPackageTypesForUpgrade = () => (dispatch) => {
  const url = '/api/package_types';

  axios.get(url)
      .then((response) => {
        dispatch({
          type: GET_PACKAGE_TYPE_OPTIONS_SUCCESS,
          packageTypeOptions: response.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PACKAGE_TYPE_OPTIONS_FAIL,
          error: 'Что-то пошло не так!',
        });
      });
};


export const getLoggedUserSchool = () => (dispatch) => {
  const loggedUser = JSON.parse(localStorage.getItem(USER));

  const url = `/api/schools/${loggedUser.school_id}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const headers = {Authorization: token};

  axios.get(url, {headers})
      .then((response) => {
        dispatch({
          type: GET_LOGGED_USER_SCHOOL_SUCCESS,
          school: response.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_LOGGED_USER_SCHOOL_FAIL,
          error: 'Что-то пошло не так.',
        });
      });
};


export const setPage = (page) => ({
  type: SET_PACKAGE_PROPOSALS_PAGE,
  page,
});


export const setPaginationCount = (paginationCount) => ({
  type: SET_PACKAGE_PROPOSALS_PAGINATION_COUNT,
  paginationCount,
});


export const getSchoolPackageProposalsHistory = () => (dispatch, getState) => {
  const loggedUser = JSON.parse(localStorage.getItem(USER));

  const {page, paginationCount: count} = getState().makePackageProposal;

  const url = `/api/schools/package_proposals?school_id=${loggedUser.school_id}&page=${page}&count=${count}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const headers = {Authorization: token};

  axios.get(url, {headers})
      .then((response) => {
        const proposals = response.data.package_proposals.map((package_proposal) => {
          const status = packageProposalStatuses[package_proposal.status];
          package_proposal.statusDisplayName = status && status.displayName;
          package_proposal.created_at = moment(new Date(package_proposal.created_at)).format('MMM Do YYYY');

          return package_proposal;
        });


        dispatch({
          type: GET_SCHOOL_PACKAGE_PROPOSALS_SUCCESS,
          proposalsHistory: proposals,
          total: response.data.total,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SCHOOL_PACKAGE_PROPOSALS_FAIL,
          error: 'Что-то пошло не так.',
        });
      });
};


export const cancelPackageProposal = (proposalId) => (dispatch) => {
  swal({
    title: 'Вы действительно хотите отменить заявку?',
    icon: 'warning',
    dangerMode: true,
    buttons: {
      cancel: 'Назад',
      defeat: 'Да, отменить',
    },
  })
      .then((willCancel) => {
        if (!willCancel) return;

        const url = `/api/schools/package_proposals/${proposalId}/update_status`;
        const token = localStorage.getItem(USER_TOKEN_KEY);
        const headers = {Authorization: token};

        axios.put(url, {status: packageProposalStatuses._codes._canceled}, {headers})
            .then(() => {
              dispatch(createNotification(packageProposalCanceledSuccessNotificationConfig));

              dispatch(getSchoolPackageProposalsHistory());
            })
            .catch(() => {
              dispatch(createNotification(packageProposalCancelFailNotificationConf));
            });
      });
};
