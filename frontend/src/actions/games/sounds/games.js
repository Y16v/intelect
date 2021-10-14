export const BUTTON_CLICK = 'GAME_SOUND/BUTTON_CLICK';
export const WRONG_SOUND = 'GAME_SOUND/WRONG_SOUND';
export const WIN_SOUND = 'GAME_SOUND/WIN_SOUND';
export const PIP_SOUND = 'GAME_SOUND/PIP_SOUND';
export const COUN_DOWN_SOUND = 'GAME_SOUND/COUN_DOWN_SOUND';

export function mk() {
  return {
    type: 'MK',
    meta: {
      sound: {
        play: 'mk2',
      },
    },
  };
}


export function clickSound() {
  return {
    type: BUTTON_CLICK,
    meta: {
      sound: {
        play: 'buttonClick',
      },
    },
  };
}

export function wrongSound() {
  return {
    type: WRONG_SOUND,
    meta: {
      sound: {
        play: 'wrong',
      },
    },
  };
}

export function winSound() {
  return {
    type: WIN_SOUND,
    meta: {
      sound: {
        play: 'win',
      },
    },
  };
}

export function pipSound() {
  return {
    type: PIP_SOUND,
    meta: {
      sound: {
        play: 'pip',
      },
    },
  };
}


export function countdownSound() {
  return {
    type: COUN_DOWN_SOUND,
    meta: {
      sound: {
        play: 'countdown',
      },
    },
  };
}

export function chipSound() {
  return {
    type: COUN_DOWN_SOUND,
    meta: {
      sound: {
        play: 'chip',
      },
    },
  };
}
