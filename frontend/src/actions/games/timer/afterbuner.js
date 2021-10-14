import {START_TIMER, STOP_TIMER} from 'redux-timer-middleware';

import {INCREMENT_ACTION} from '../after_burner_game';

export const AFTERBURNER_TIMER_NAME = 'afterburnerGame';

export function startGameTimer(timerInterval) {
  return (dispatch, getState) => {
    dispatch({
      type: START_TIMER,
      payload: {
        actionName: INCREMENT_ACTION,
        timerName: AFTERBURNER_TIMER_NAME,
        timerInterval: timerInterval,
      }});
  };
}

export function stopGameTimer() {
  return (dispatch, getState) => {
    dispatch({
      type: STOP_TIMER,
      payload: {
        timerName: AFTERBURNER_TIMER_NAME,
      }});
  };
}
