import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {LINK_MOBILE_APP_CLOSE} from '../../actions/link-mobile-app/link-mobile-app';

export const INITIAL_STATE = {
  isClose: false,
};

export default createReducer(
    {
      [LINK_MOBILE_APP_CLOSE]: (state, action) => merge({}, state, {isClose: true}),
    },
    INITIAL_STATE,
);
