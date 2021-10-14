
import {merge} from 'extend-merge';
import createReducer from '../../utils/base';
import {
  OPEN,
  CLOSE,
} from '../../../actions/games/modal/alert-dialog-zeroing';


const INITIAL_STATE = {
  open: false,
};

export default createReducer(
    {
      [OPEN]: (state, action) => merge({}, state, {
        open: true,
      }),

      [CLOSE]: (state, action) => merge({}, state, {
        open: false,
      }),
    }, INITIAL_STATE);
