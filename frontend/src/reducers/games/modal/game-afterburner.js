import {merge} from 'extend-merge';
import createReducer from '../../utils/base';
import {
  OPEN,
  CLOSE, ON_CHANGE_FONT_VALUE, ON_APPLY_SETTINGS} from '../../../actions/games/modal/game-afterburner';
import {ON_CLICK_GAME} from '../../../actions/games/game-list';

import {CLEAR_GAME} from '../../../actions/games/modal/navbar-game-actions';
import {STOP_PROCESS} from '../../../actions/games/after_burner_game';

export const FONTS = ['colus', 'graduate', 'changa-one', 'stardos-stencil', 'iceland'];
const INITIAL_STATE = {
  isOpen: true,
  fontsOptions: FONTS,
};

export default createReducer(
    {
      [OPEN]: (state, action) => merge({}, state, {
        isOpen: true,
      }),

      [CLOSE]: (state, action) => merge({}, state, {
        isOpen: false,
      }),

      [ON_CLICK_GAME]: (state, action) => merge({}, state, {
        isOpen: true,
      }),
      [ON_APPLY_SETTINGS]: (state, action) => merge({}, state, {
        isOpen: false,
      }),
      [CLEAR_GAME]: (state, action) => merge({}, state, INITIAL_STATE),
      [STOP_PROCESS]: (state, action) => merge({}, state, INITIAL_STATE),

      [ON_CHANGE_FONT_VALUE]: (state, action) => merge({}, state, {
        font: action.value,
      }),
    }, INITIAL_STATE);
