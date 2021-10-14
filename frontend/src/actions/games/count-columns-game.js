import {ACTION_TYPES, executeArithmetic} from '../../interactors/count-columns/generator';
import {clickSound, winSound, wrongSound} from './sounds/games';
import axios from 'axios';
import games from '../../interactors/games';
import {CLEAR_GAME} from './modal/navbar-game-actions';
import {createNotification} from 'react-redux-notify';
import {actionsErrorNotification, actionsSuccessNotification} from '../school/notifications';

;

export const VERIFY_SUBMIT = 'COUNT_COLUMNS_GAME/VERIFY_SUBMIT';
export const ON_CHANGE_ANSWER = 'COUNT_COLUMNS_GAME/ON_CHANGE_ANSWER';
export const CLEAR_ANSWER_FIELD = 'COUNT_COLUMNS_GAME/CLEAR_ANSWER_FIELD';
export const CLEAR = 'COUNT_COLUMNS_GAME/CLEAR';
export const BEGIN_TIME = 'COUNT_COLUMNS_GAME/BEGIN_TIME';
export const SUBMIT_RESULT_FETCH = 'COUNT_COLUMNS_GAME/SUBMIT_RESULT_FETCH';
export const SUBMIT_RESULT_SUCCESS = 'COUNT_COLUMNS_GAME/SUBMIT_RESULT_SUCCESS';
export const SUBMIT_RESULT_FAIL = 'COUNT_COLUMNS_GAME/SUBMIT_RESULT_FAIL';

export const answerHandle = (value) => ({
  type: ON_CHANGE_ANSWER, value,
});


export const clearAnswerField = () => ({
  type: CLEAR_ANSWER_FIELD,
});

export const clear = () => {
  return (dispatch, getState) => {
    const {actionCount, digitCount, actionType} = getState().gameCountColumns;
    const digits = ACTION_TYPES[actionType](actionCount, digitCount);
    dispatch({type: CLEAR, digits});
  };
};


export const verify = () => {
  return (dispatch, getState) => {
    const {answerValue, digits, expect, timeBegin} = getState().gameCountColumns;
    const answer = parseInt(answerValue);
    const expectNew = executeArithmetic(digits);
    if (expect != null) {
      dispatch(clear());
      dispatch(clickSound());
      dispatch({type: BEGIN_TIME, time: Date.now()});
    } else {
      const result = answer === expectNew;
      const spentTime =( Date.now() - timeBegin) / 1000;
      dispatch({type: VERIFY_SUBMIT, expect: expectNew, result, spentTime});
      if (result) dispatch(winSound());
      else dispatch(wrongSound());
    }
  };
};

export function onSubmitResult() {
  return (dispatch, getState) => {
    const url = 'api/result';
    const {results} = getState().gameCountColumns;
    dispatch({type: SUBMIT_RESULT_FETCH});
    axios.post(url,
        JSON.stringify({
          game_id: games[0].id,
          results: results,
        })).then((data) => {
      dispatch({type: CLEAR_GAME});
      dispatch({type: SUBMIT_RESULT_SUCCESS, data});
      dispatch(createNotification(actionsSuccessNotification));
    }).catch((error) => {
      dispatch({type: SUBMIT_RESULT_FAIL});
      dispatch(createNotification(actionsErrorNotification));
    });
  };
}

