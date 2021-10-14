import axios from 'axios';
import moment from 'moment';
import {STUDENT_ID} from '../../reducers/user/fixture';
import {getResultsDateRangeOptions} from '../../reducers/utils/game-results';

export const GET_RESULT_ARCHIVES_SUCCESS = 'STUDENT_RESULT_ARCHIVES/GET_RESULT_ARCHIVES_SUCCESS';
export const GET_RESULT_ARCHIVES_FAIL = 'STUDENT_RESULT_ARCHIVES/GET_RESULT_ARCHIVES_FAIL';
export const SHOW_RESULT_ITEMS_DIALOG = 'STUDENT_RESULT_ARCHIVES/SHOW_RESULT_ITEMS_DIALOG';
export const CLOSE_RESULT_ITEMS_DIALOG = 'STUDENT_RESULT_ARCHIVES/CLOSE_RESULT_ITEMS_DIALOG';
export const GET_STUDENT_SUCCESS = 'STUDENT_RESULT_ARCHIVES/GET_STUDENT_SUCCESS';
export const GET_STUDENT_FAIL = 'STUDENT_RESULT_ARCHIVES/GET_STUDENT_FAIL';
export const SET_ARCHIVES_DATE_RANGE_SELECT_OPTIONS = 'STUDENT_RESULT_ARCHIVES/SET_ARCHIVES_DATE_RANGE_SELECT_OPTIONS';
export const SET_ARCHIVES_DATE_RANGE = 'STUDENT_RESULT_ARCHIVES/SET_ARCHIVES_DATE_RANGE';
export const SET_ARCHIVES_IS_LOADING = 'STUDENT_RESULT_ARCHIVES/SET_ARCHIVES_IS_LOADING';


export const getResultArchives = (studentId) => (dispatch, getState) => {
  dispatch({
    type: SET_ARCHIVES_IS_LOADING,
  });
  const state = getState();
  const {selectedDateRange} = state.studentResultArchives;

  const url = `/api/students/${studentId}/result_archives?start_date=${selectedDateRange.startDate}&end_date=${selectedDateRange.endDate}`;

  axios.get(url)
      .then((response) => {
        const dates = [];
        const points = [];
        const archives = response.data.result_archives.map((archive) => {
          const submit_at = new Date(archive.submit_at);
          archive.submit_at = moment(new Date(submit_at)).format('MMM Do YYYY');
          archive.submit_at_time = moment( new Date(submit_at)).format('hh:mm');
          archive.payload = JSON.parse(archive.payload);

          archive.weekday_name = moment(submit_at).format('dd');
          archive.weekday = submit_at.getDay();
          archive.date = submit_at.getDate();
          archive.right_total = archive.right_answers;
          archive.total = archive.total_tasks;

          dates.push(archive.submit_at);
          points.push(archive.total_points);
          return archive;
        });

        dispatch({
          type: GET_RESULT_ARCHIVES_SUCCESS,
          archives,
          chartData: {
            dates,
            points,
          },
        });
        if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
          dispatch(setDateRangeOptions(response.data.available_date_range));
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_RESULT_ARCHIVES_FAIL,
          error: error,
        });
      });
};


export const getStudent = (studentId) => (dispatch) => {
  const url = `/api/users/${studentId}`;

  axios.get(url)
      .then((response) => {
        const user = response.data;
        if (user.category_id !== STUDENT_ID) {
          return dispatch({
            type: GET_STUDENT_FAIL,
            notFoundOrPermissionDenied: true,
            errorMessage: 'NotFoundOrPermissionDenied',
          });
        }


        dispatch({
          type: GET_STUDENT_SUCCESS,
          student: user,
        });
      })
      .catch(({response}) => {
        if (response.status === 404 || response.status === 401) {
          return dispatch({
            type: GET_STUDENT_FAIL,
            notFoundOrPermissionDenied: true,
            errorMessage: 'NotFoundOrPermissionDenied',
          });
        }

        dispatch({
          type: GET_STUDENT_FAIL,
          unknownError: true,
          errorMessage: 'Что-то полшо не так!',
        });
      });
};


export const openResultItemsDialog = (items) => ({
  type: SHOW_RESULT_ITEMS_DIALOG,
  items,
});


export const closeResultItemsDialog = () => ({
  type: CLOSE_RESULT_ITEMS_DIALOG,
});


export const setDateRangeOptions = ({from, to}) => (dispatch) => {
  if (!from || !to) {
    return dispatch({
      type: SET_ARCHIVES_DATE_RANGE_SELECT_OPTIONS,
      dateRanges: [],
    });
  }

  const dateRanges = getResultsDateRangeOptions({from, to});
  dispatch({
    type: SET_ARCHIVES_DATE_RANGE_SELECT_OPTIONS,
    dateRanges,
  });
  dispatch(setArchivesDateRange(...Object.values(dateRanges[dateRanges.length - 1])));
};


export const setArchivesDateRange = (startDate, endDate) => ({
  type: SET_ARCHIVES_DATE_RANGE,
  startDate,
  endDate,
});
