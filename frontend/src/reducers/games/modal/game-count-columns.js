import {merge} from 'extend-merge';
import createReducer from '../../utils/base';
import {
  CLOSE,
  OPEN,
  ON_APPLY_SETTINGS,
} from '../../../actions/games/modal/game-count-columns';
import {FONTS} from './game-afterburner';
import {SUBMIT_RESULT_SUCCESS} from '../../../actions/games/count-columns-game';

const INITIAL_STATE = {
  isOpen: true,
  fontsOptions: FONTS,
  font: '',
};

export default createReducer(
    {
      [OPEN]: (state, action) => merge({}, state, {
        isOpen: true,
      }),

      [CLOSE]: (state, action) => merge({}, state, {
        isOpen: false,
      }),
      [ON_APPLY_SETTINGS]: (state, action) => merge({}, state, {
        isOpen: false,
      }),
      [SUBMIT_RESULT_SUCCESS]: (state, actions) => INITIAL_STATE,

    }, INITIAL_STATE);
