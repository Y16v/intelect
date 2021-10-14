import axios from 'axios';
import {USER, USER_TOKEN_KEY} from '../../store/storage_kets';
import {_reformatDate} from '../utils';
import games from '../../constants/games';
import moment from 'moment';
import {getResultsDateRangeOptions} from '../../reducers/utils/game-results';
import swal from 'sweetalert';

export const GET_LOOK_UP_STUDENT_SUCCESS = 'GET_STUDENT_SUCCESS';
export const GET_LOOK_UP_STUDENT_FAIL = 'GET_STUDENT_FAIL';
export const GET_STUDENT_RESULTS_SUCCESS = 'GET_STUDENT_RESULTS_SUCCESS';
export const GET_STUDENT_RESULTS_FAIL = 'GET_STUDENT_RESULTS_FAIL';
export const GET_RESULT_ITEMS_SUCCESS = 'GET_RESULT_ITEMS_SUCCESS';
export const GET_RESULT_ITEMS_FAIL = 'GET_RESULT_ITEMS_FAIL';
export const SHOW_STUDENT_ACCESSES = 'SHOW_STUDENT_ACCESSES';
export const GET_STUDENT_ACCESSES_FAIL = 'GET_STUDENT_ACCESSES_FAIL';
export const HIDE_STUDENT_ACCESSES = 'HIDE_STUDENT_ACCESSES';
export const SET_RESULT_TOTAL = 'SET_RESULT_TOTAL';
export const RETRIEVE_RESULT_SUCCESS = 'RETRIEVE_RESULT_SUCCESS';
export const RETRIEVE_RESULT_FAIL = 'RETRIEVE_RESULT_FAIL';
export const UPDATE_STUDENT_ACCESS_SUCCESS = 'UPDATE_STUDENT_ACCESS_SUCCESS';
export const UPDATE_STUDENT_ACCESS_FAIL = 'UPDATE_STUDENT_ACCESS_FAIL';
export const FINISH_UPDATE_STUDENT_ACCESS = 'FINISH_UPDATE_STUDENT_ACCESS';
export const SEARCH_TEXT_FILTER = 'STUDENTS/SEARCH_TEXT_FILTER';
export const SET_PRINT_RESULTS_FORM_VALUE = 'SET_PRINT_RESULTS_FORM_VALUE';
export const GET_RESULTS_TO_PRINT_SUCCESS = 'GET_RESULTS_TO_PRINT_SUCCESS';
export const GET_RESULTS_TO_PRINT_FAIL = 'GET_RESULTS_TO_PRINT_FAIL';
export const SET_DIALOG_TO_PRINT = 'SET_DIALOG_TO_PRINT';
export const SET_READY_TO_PRINT = 'SET_READY_TO_PRINT';
export const SHOW_STUDENT_ACTIONS_MENU = 'STUDENTS_TABLE/SHOW_STUDENT_ACTIONS_MENU';
export const CLOSE_STUDENT_ACTIONS_MENU = 'STUDENTS_TABLE/CLOSE_STUDENT_ACTIONS_MENU';
export const SET_RESULTS_DATE_RANGE_SELECT_OPTIONS = 'STUDENT_PAGE/SET_RESULTS_DATE_RANGE_SELECT_OPTIONS';
export const SET_RESULTS_DATE_RANGE = 'STUDENT_PAGE/SET_RESULTS_DATE_RANGE';
export const OPEN_RESULT_ITEMS_DIALOG = 'STUDENT_PAGE/OPEN_RESULT_ITEMS_DIALOG';
export const CLOSE_RESULT_ITEMS_DIALOG = 'STUDENT_PAGE/CLOSE_RESULT_ITEMS_DIALOG';
export const SET_RESULTS_IS_LOADING = 'STUDENT_PAGE/SET_RESULTS_IS_LOADING';
export const DELETE_STUDENT_SUCCESS = 'STUDENT_PAGE/DELETE_STUDENT_SUCCESS';
export const DELETE_STUDENT_ERROR = 'STUDENT_PAGE/DELETE_STUDENT_ERROR';

export const getStudent = (studentId) => (dispatch)=> {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const url = `/api/users/${studentId}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_LOOK_UP_STUDENT_SUCCESS,
          student: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LOOK_UP_STUDENT_FAIL,
          error: error.response.data.error,
        });
      });
};

export const getStudentResults = (studentId) => (dispatch, getState) => {
  dispatch({
    type: SET_RESULTS_IS_LOADING,
  });

  const state = getState().studentResults;
  const {startDate, endDate} = state.selectedDateRange;
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const url = `/api/results?student_id=${studentId}&start_date=${startDate || ''}&end_date=${endDate || ''}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        const results = response.data.results;
        Promise.all(results.map((result) => {
          return new Promise((resolve) => {
            const url = `/api/result?result_id=${result.id}`;

            axios.get(url, {headers: {Authorization: token}})
                .then((response) => {
                  const result = response.data;
                  const submit_at = new Date(result.submit_at);
                  result.submit_at = moment(submit_at).format('MMM Do YYYY');
                  result.submit_at_time = moment( new Date(submit_at)).format('HH:mm');
                  result.game_name = games[result.game_id].name;
                  result.total_tasks = result.total;
                  result.right_answers = result.right_total;
                  result.payload = result.result_items;
                  result.weekday_name = moment(submit_at).format('dd');
                  result.weekday = submit_at.getDay();
                  result.date = submit_at.getDate();
                  resolve(response.data);
                });
          });
        }))
            .then((results) => {
              dispatch({
                type: GET_STUDENT_RESULTS_SUCCESS,
                ...response.data,
                results,
              });
              if (!state.selectedDateRange.startDate || !state.selectedDateRange.endDate) {
                dispatch(setDateRangeOptions(response.data.available_date_range));
              }
            });
      })
      .catch((error) => {
        dispatch({
          type: GET_STUDENT_RESULTS_FAIL,
          error: error.response.data.error,
        });
      });
};

export const setIsReadyToPrint = (value) => (dispatch) => {
  dispatch({
    type: SET_READY_TO_PRINT,
    isDataReadyToPrint: value,
  });
};


export const setDialogToPrint = (value) => (dispatch) => {
  dispatch({
    type: SET_DIALOG_TO_PRINT,
    isDialogOpen: value,
  });
};


export const getStudentResultsInDateRange = (studentId) => (dispatch, getState) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const {studentResults} = getState();
  let {startDate, endDate} = studentResults.resultsToPrint;
  startDate = typeof startDate === 'string' ? startDate : startDate.format('YYYY-MM-DD');
  endDate = typeof endDate === 'string' ? endDate : endDate.format('YYYY-MM-DD');
  const url = `/api/results?student_id=${studentId}&start_date=${startDate}&end_date=${endDate}`;

  if (!startDate) {
    return dispatch({
      type: GET_RESULTS_TO_PRINT_FAIL,
      error: 'Вы не указали начальную дату.',
    });
  }
  if (!endDate) {
    return dispatch({
      type: GET_RESULTS_TO_PRINT_FAIL,
      error: 'Вы не указали конечную дату.',
    });
  }

  if (new Date(startDate) > new Date(endDate)) {
    return dispatch({
      type: GET_RESULTS_TO_PRINT_FAIL,
      error: 'Вы указали не корректный диапазон времени. Начальная дата должна быть меньше чем конечный.',
    });
  }

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        const {results} = response.data;
        Promise.all(results.map((result) => {
          return new Promise((resolve, reject) => {
            const url = `/api/result?result_id=${result.id}`;

            axios.get(url, {headers: {Authorization: token}})
                .then((response) => {
                  const result = response.data;
                  result.submit_at = _reformatDate(new Date(result.submit_at));
                  result.game_name = games[result.game_id].name;
                  resolve(response.data);
                });
          });
        })).then((results) => {
          dispatch({
            type: GET_RESULTS_TO_PRINT_SUCCESS,
            data: results,
          });
          dispatch({
            type: SET_READY_TO_PRINT,
            isDataReadyToPrint: true,
          });
        });
      });
};

export const setPrintResultsFormValue = (field, value) => (dispatch, getState) => {
  dispatch({
    type: SET_PRINT_RESULTS_FORM_VALUE,
    field,
    value,
  });
};

export const showStudentAccesses = (studentId) => (dispatch, getState) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const {lookUpStudent} = getState();

  const url = `/api/schools/${lookUpStudent.school_id}/students/${studentId}/password`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: SHOW_STUDENT_ACCESSES,
          studentAccesses: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_STUDENT_ACCESSES_FAIL,
          error: error.response.data.error,
        });
      });
};


export const hideStudentAccesses = () => ({type: HIDE_STUDENT_ACCESSES});

export const retrieveResult = (resultId) => (dispatch) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const url = `/api/result?result_id=${resultId}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        const result = response.data;
        result.submit_at = _reformatDate(new Date(result.submit_at));
        result.game_name = games[result.game_id].name;
        dispatch({
          type: RETRIEVE_RESULT_SUCCESS,
          result: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: RETRIEVE_RESULT_FAIL,
          error: error.response ? error.response.data.error : '',
        });
      });
};


export const updateStudentAccess = (studentId) => (dispatch) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const schoolAdmin = JSON.parse(localStorage.getItem(USER));
  const url = `/api/schools/${schoolAdmin.school_id}/students/${studentId}/update_access`;

  axios.put(url, {}, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: UPDATE_STUDENT_ACCESS_SUCCESS,
          accessUpdatedStudent: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_STUDENT_ACCESS_FAIL,
          error: 'Невожможно обновить доступ студента. Пакет пуст!',
        });
      });
};

export const deleteStudentAccess = (studentId) => (dispatch, getState) => {
  const schoolAdmin = JSON.parse(localStorage.getItem(USER));
  swal({
    title: 'Вы действительно хотите удалить студента?',
    icon: 'error',
    dangerMode: true,
    buttons: {
      cancel: 'Нет',
      defeat: 'Да',
    },
  }).then((willCancel) => {
    if (!willCancel) return;
    const url = `/api/schools/${schoolAdmin.school_id}/students/${studentId}`;
    const token = localStorage.getItem(USER_TOKEN_KEY);
    const headers = {Authorization: token};
    axios.delete(url, {headers, data: {}})
        .then(() => {
          dispatch({type: DELETE_STUDENT_SUCCESS, studentId});
        })
        .catch(() => {
          dispatch({type: DELETE_STUDENT_ERROR, studentId});
        });
  });
};


export const finishUpdateStudentAccess = () => (dispatch) => {
  dispatch({
    type: FINISH_UPDATE_STUDENT_ACCESS,
  });
};

export const handleFilter = (value) =>{
  return ({type: SEARCH_TEXT_FILTER, value});
};

export const showStudentActionsMenu = ({student, needToUpdateAccess, canUpdateAccess, anchorEl}) => ({
  type: SHOW_STUDENT_ACTIONS_MENU,
  student,
  needToUpdateAccess,
  canUpdateAccess,
  anchorEl,
});

export const closeStudentActionsMenu = () => ({
  type: CLOSE_STUDENT_ACTIONS_MENU,
});


const setDateRangeOptions = ({from, to}) => (dispatch) => {
  if (!from || !to) {
    return dispatch({
      type: SET_RESULTS_DATE_RANGE_SELECT_OPTIONS,
      dateRanges: [],
    });
  }
  const dateRanges = getResultsDateRangeOptions({from, to});
  dispatch({
    type: SET_RESULTS_DATE_RANGE_SELECT_OPTIONS,
    dateRanges,
  });
  dispatch(setResultsDateRange(...Object.values(dateRanges[dateRanges.length - 1])));
};


export const setResultsDateRange = (startDate, endDate) => ({
  type: SET_RESULTS_DATE_RANGE,
  startDate,
  endDate,
});


export const openResultItemsDialog = (items) => ({
  type: OPEN_RESULT_ITEMS_DIALOG,
  items,
});


export const closeResultItemsDialog = () => ({
  type: CLOSE_RESULT_ITEMS_DIALOG,
});
