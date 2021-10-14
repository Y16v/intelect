import {merge} from 'extend-merge';
import createReducer from '../utils/base';
import {ON_CHANGE_CHIP} from '../../actions/games/abacus';
import {abacusChangeChip, abacusToNumber} from '../../interactors/abacus';


const INITIAL_STATE = {
  abacusState: [
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1],
  ],
  number: '0000000000000',
};

export default createReducer(
    {
      [ON_CHANGE_CHIP]: (state, action) => {
        const abacusState = abacusChangeChip(state.abacusState, action.valueI, action.valueJ);
        return merge({}, state, {
          abacusState: abacusState,
          number: abacusToNumber(abacusState),
        });
      },
    }, INITIAL_STATE);
