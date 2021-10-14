import {countdownSound, winSound, wrongSound} from './sounds/games';
import {getExpect, isEqualBigInt} from '../../interactors/multiplier/multiplier';
import axios from 'axios';
import games from '../../interactors/games';

import bigInt from 'big-integer';
import {createNotification} from 'react-redux-notify';
import {actionsErrorNotification, actionsSuccessNotification} from '../school/notifications';

export const START_GAME = 'MULTIPLIER_GAME/START_GAME';
export const ON_ANSWER = 'MULTIPLIER_GAME/ON_ANSWER';
export const ANSWER_VALUE_ON_CHANGE = 'MULTIPLIER_GAME/ANSWER_VALUE_ON_CHANGE';
export const ON_FINISH = 'MULTIPLIER_GAME/ON_FINISH';
export const ON_NEXT = 'MULTIPLIER_GAME/ON_NEXT';
export const ON_OPEN_SETTINGS = 'MULTIPLIER_GAME/ON_OPEN_SETTINGS';
export const ON_SUBMIT_FETCH = 'MULTIPLIER_GAME/ON_SUBMIT_FETCH';
export const SUBMIT_RESULT_SUCCESS = 'MULTIPLIER_GAME/SUBMIT_RESULT_SUCCESS';
export const SUBMIT_RESULT_ERROR = 'MULTIPLIER_GAME/SUBMIT_RESULT_ERROR';
export const OPEN_ALL_RESULT_MODAL = 'MULTIPLIER_GAME/OPEN_ALL_RESULT_MODAL';
export const CLOSE_ALL_RESULT_MODAL = 'MULTIPLIER_GAME/CLOSE_ALL_RESULT_MODAL';

export const startGame = () => (dispatch) => {
  dispatch(countdownSound());
  dispatch({
    type: START_GAME,
  });
};

export const onAnswer = () => (dispatch, getState) => {
  const {digits, actionType, answerValue, isRTL} = getState().multiplier;
  const expect = getExpect(digits[0], digits[1], actionType);
  const answer = isRTL ? answerValue.split('').reverse().join('') : answerValue;
  const isError = !isEqualBigInt(expect, bigInt(answer));
  dispatch({
    type: ON_ANSWER,
    isError,
    expect,
    answer,
  });
  if (isError) dispatch(wrongSound());
  else dispatch(winSound());
};

export const onChangeAnswerInput = (value) => ({
  type: ANSWER_VALUE_ON_CHANGE,
  value,
});

export const onFinish = () => (dispatch, getState) => {
  const url = 'api/result';
  const {results} = getState().multiplier;
  dispatch({type: ON_SUBMIT_FETCH});
  axios.post(url,
      JSON.stringify({
        game_id: games[1].id,
        results: results,
      })).then((data) => {
    dispatch({type: ON_FINISH});
    dispatch({type: SUBMIT_RESULT_SUCCESS, data});
    dispatch(createNotification(actionsSuccessNotification));
  }).catch((error) => {
    dispatch({type: SUBMIT_RESULT_ERROR});
    dispatch(createNotification(actionsErrorNotification));
  });
};

export const onNext = () => (dispatch) => {
  dispatch({type: ON_NEXT});
  dispatch(countdownSound());
};

export const openSettings = () => ({
  type: ON_OPEN_SETTINGS,
});

export const openAllResultModal = () => ({
  type: OPEN_ALL_RESULT_MODAL,
});

export const closeAllResultModal = () => ({
  type: CLOSE_ALL_RESULT_MODAL,
});
