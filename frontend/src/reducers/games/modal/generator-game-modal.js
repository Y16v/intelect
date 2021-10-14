import {merge} from 'extend-merge';
import createReducer from '../../utils/base';
import {ON_APPLY_SETTINGS, OPEN, CLOSE} from '../../../actions/games/modal/generator-game';


const INITIAL_STATE = {
  isOpen: true,
};

export default createReducer({
  [ON_APPLY_SETTINGS]: (state, action) => merge({}, state, {
    isOpen: false,
  }),
  [OPEN]: (state, action) => merge({}, state, {
    isOpen: true,
  }),
  [CLOSE]: (state, action) => merge({}, state, {
    isOpen: false,
  }),
}, INITIAL_STATE);
