import {startGameTimer, stopGameTimer} from './timer/afterbuner';
import {executeArithmetic} from '../../interactors/count-columns/generator';
import {pipSound, winSound, wrongSound} from './sounds/games';
import axios from 'axios';
import {CLEAR_GAME} from './modal/navbar-game-actions';
import {isAnswerEquals} from '../../reducers/utils/game-results';
import games from '../../interactors/games';
import {createNotification} from 'react-redux-notify';
import {actionsErrorNotification, actionsSuccessNotification} from '../school/notifications';

export const INCREMENT_ACTION = 'AFTERBURNER_GAME/INCREMENT_ACTION';
export const START_GAME = 'AFTERBURNER_GAME/START_GAME';
export const START_DIGITS = 'AFTERBURNER_GAME/START_DIGITS';
export const STOP_GAME = 'AFTERBURNER_GAME/STOP_GAME';
export const START_ANSWER_STEP = 'AFTERBURNER_GAME/START_ANSWER_STEP';
export const ON_SUBMIT_ANSwER = 'AFTERBURNER_GAME/ON_SUBMIT_ANSwER';
export const ANSWER_ON_CHANGE = 'AFTERBURNER_GAME/ON_CHANGE_ANSWER';
export const ON_NEXT = 'AFTERBURNER_GAME/ON_NEXT';
export const SUBMIT_RESULT_FETCH = 'AFTERBURNER_GAME/SUBMIT_RESULT_FETCH';
export const SUBMIT_RESULT_SUCCESS = 'AFTERBURNER_GAME/SUBMIT_RESULT_SUCCESS';
export const SUBMIT_RESULT_ERROR = 'AFTERBURNER_GAME/SUBMIT_RESULT_ERROR';
export const STOP_PROCESS = 'AFTERBURNER_GAME/STOP_PROCESS';


export function startGame(interval) {
  return (dispatch, getState) => {
    dispatch(startGameTimer(interval));
    dispatch({type: START_GAME, interval});
  };
}

export function startDigits(interval) {
  return (dispatch, getState) => {
    dispatch(startGameTimer(interval));
    dispatch({type: START_DIGITS, interval});
  };
}

export function stopTimerGame() {
  return (dispatch, getState) => {
    dispatch(stopGameTimer());
    dispatch({type: STOP_GAME});
  };
}

export function startAnswerStep() {
  return {
    type: START_ANSWER_STEP,
  };
}

export function onSubmitAnswer() {
  return (dispatch, getState) => {
    const {answer, digits} = getState().afterBurnerGame;
    const exact = executeArithmetic(digits);
    dispatch({type: ON_SUBMIT_ANSwER, answer, digits, exact});
    if (isAnswerEquals(answer, exact)) dispatch(winSound());
    else dispatch(wrongSound());
  };
}


export function onChangeAnswer(value) {
  return {
    type: ANSWER_ON_CHANGE, value,
  };
}

export function onNext() {
  return {
    type: ON_NEXT,
  };
}

export function onSubmitResult(results) {
  return (dispatch, getState) => {
    const url = 'api/result';
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
      dispatch({type: SUBMIT_RESULT_ERROR});
      dispatch(createNotification(actionsErrorNotification));
    });
  };
}

export const stopProcess = () => {
  return {
    type: STOP_PROCESS,
  };
};

export function digitSound(text, speak) {
  return (dispatch, getState) => {
    const {countDigit, speed, isVoice} = getState().afterBurnerGame;
    if ( isVoice && speed >= 2 && countDigit < 4 ) {
      speak({text: text || '', rate: 1.3});
    } else {
      dispatch(pipSound());
    }
  };
}
