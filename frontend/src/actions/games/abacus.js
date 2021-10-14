import {chipSound} from './sounds/games';

export const ON_CHANGE_CHIP = 'ABACUS/ON_CHANGE_CHIP';


export const onClickChip = (valueI, valueJ) => (dispatch) => {
  dispatch({
    type: ON_CHANGE_CHIP, valueI, valueJ,
  });
  dispatch(chipSound());
};
