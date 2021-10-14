import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {GET_STUDENT_RESULTS_SUCCESS} from '../../actions/user/student';

const INITIAL_STATE = {
  dates: [],
  points: [],
  loading: false,
};

export default createReducer({
  [GET_STUDENT_RESULTS_SUCCESS]: (state, action) => merge({}, state, {
    dates: (action.results || []).map((result) => result.submit_at),
    points: (action.results || []).map((result) => result.total_points),
    loading: true,
  }),
}, INITIAL_STATE);
