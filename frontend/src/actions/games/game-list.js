import {history} from '../../index';


export const ON_CLICK_GAME = 'GAME_GRID/ON_CLICK_GAME';

export function onClickGame(url) {
  history.push(`/${url}`);
  return {
    type: ON_CLICK_GAME, url,
  };
}
