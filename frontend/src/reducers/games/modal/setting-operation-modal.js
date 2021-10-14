import {merge} from 'extend-merge';
import createReducer from '../../utils/base';

import {
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  CHOOSE_ACTION_TYPE_MODAL_CLOSE,
  CHOOSE_ACTION_TYPE_MODAL_OPEN, SELECT_ACTION_TYPE, APPLY_SETTINGS,
} from '../../../actions/games/modal/settings-game-operation-modal';
import {ON_FINISH, ON_OPEN_SETTINGS} from '../../../actions/games/multiplier';

const INITIAL_STATE = {
  isOpen: true,
  isOpenChooseActionTypeModal: false,
};

export default createReducer({
  [OPEN_SETTINGS]: (state, action) => merge({}, state, {
    isOpen: true,
  }),
  [CLOSE_SETTINGS]: (state, action) => merge({}, state, {
    isOpen: false,
  }),
  [APPLY_SETTINGS]: (state, action) => merge({}, state, {
    isOpen: false,
  }),
  [ON_FINISH]: (state, action) => merge({}, state, {
    isOpen: true,
  }),
  [CHOOSE_ACTION_TYPE_MODAL_OPEN]: (state, action) => merge({}, state, {
    isOpenChooseActionTypeModal: true,
  }),
  [CHOOSE_ACTION_TYPE_MODAL_CLOSE]: (state, action) => merge({}, state, {
    isOpenChooseActionTypeModal: false,
  }),
  [SELECT_ACTION_TYPE]: (state, action) => merge({}, state, {
    isOpenChooseActionTypeModal: false,
  }),
  [ON_OPEN_SETTINGS]: (state, action) => merge({}, state, {
    isOpen: true,
  }),
}, INITIAL_STATE);
