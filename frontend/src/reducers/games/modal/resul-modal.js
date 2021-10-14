import {merge} from 'extend-merge';
import createReducer from '../../utils/base';
import {CLOSE, OPEN} from '../../../actions/games/modal/result-modal';
import {SUBMIT_RESULT_FETCH, SUBMIT_RESULT_SUCCESS} from '../../../actions/games/after_burner_game';
import {SUBMIT_RESULT_FAIL} from '../../../actions/games/count-columns-game';

const INITIAL_STATE = {
  open: false,
  results: [],
  isSubmitLoading: false,
};

export default createReducer(
    {
      [OPEN]: (state, action) => merge({}, state, {
        open: true,
        results: action.showResults,
      }),
      [CLOSE]: (state, action) => merge({}, state, {
        open: false,
      }),
      [SUBMIT_RESULT_SUCCESS]: (state, action) => merge({}, state, {
        open: false,
      }),
      [SUBMIT_RESULT_FETCH]: (state, action) => merge({}, state, {isSubmitLoading: true}),
      [SUBMIT_RESULT_SUCCESS]: (state, action) => merge({}, state, {isSubmitLoading: false}),
      [SUBMIT_RESULT_FAIL]: (state, action) => merge({}, state, {isSubmitLoading: false}),

    }, INITIAL_STATE);
