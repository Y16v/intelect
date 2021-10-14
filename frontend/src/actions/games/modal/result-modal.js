import {showPrevResults} from '../../../reducers/utils/game-results';

export const OPEN = 'RESULT_MODAL/OPEN';
export const CLOSE = 'RESULT_MODAL/CLOSE';


export const open = () => {
  return (dispatch, getState) => {
    const {results} = getState().afterBurnerGame;
    const showResults = showPrevResults(results);
    dispatch({type: OPEN, showResults});
  };
};

export const close = () => ({
  type: CLOSE,
});
