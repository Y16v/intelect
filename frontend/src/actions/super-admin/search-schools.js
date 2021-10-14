import {USER_TOKEN_KEY} from '../../store/storage_kets';
import axios from 'axios';
import moment from 'moment';

export const SEARCH_SCHOOLS_SUCCESS = 'MY_SCHOOLS/SEARCH_SCHOOLS_SUCCESS';
export const SEARCH_SCHOOLS_FAIL = 'MY_SCHOOLS/SEARCH_SCHOOLS_FAIL';
export const SET_SEARCH_QUERY_VALUE = 'MY_SCHOOLS/SET_SEARCH_QUERY_VALUE';
export const SET_PAGE = 'MY_SCHOOLS/SET_PAGE';
export const SET_PAGINATION_COUNT = 'MY_SCHOOLS/SET_PAGINATION_COUNT';


export const searchSchools = () => (dispatch, getState) => {
  const {q, page, paginationCount} = getState().searchSchools;

  const url = `/api/schools/search?q=${q}&page=${page}&count=${paginationCount}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        const schools = response.data.schools.map((school) => {
          school.created_at = moment(school.created_at).format('MMM Do YYYY');
          return school;
        });

        dispatch({
          type: SEARCH_SCHOOLS_SUCCESS,
          searchResult: {
            total: response.data.total,
            schools: schools,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: SEARCH_SCHOOLS_FAIL,
          error: error,
        });
      });
};


export const setSearchQueryValue = (q) => ({
  type: SET_SEARCH_QUERY_VALUE,
  q,
});


export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});


export const setPaginationCount = (paginationCount) => ({
  type: SET_PAGINATION_COUNT,
  paginationCount,
});
