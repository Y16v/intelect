export const ON_CHANGE_OPERATION_TYPE = 'NAVBAR_GAME/ON_CHANGE_OPERATION_TYPE';
export const ON_CHANGE_DIGIT_COUNT = 'NAVBAR_GAME/ON_CHANGE_DIGIT_COUNT';
export const ON_CHANGE_SPEED = 'NAVBAR_GAME/ON_CHANGE_SPEED';
export const ON_CHANGE_ACTION_COUNT = 'NAVBAR_GAME/ON_CHANGE_ACTION_COUNT';
export const CLEAR_GAME = 'NAVBAR_GAME/CLEAR_GAME';
export const ON_CHANGE_FILED = {
  operation_type: ON_CHANGE_OPERATION_TYPE,
  digit_count: ON_CHANGE_DIGIT_COUNT,
  speed: ON_CHANGE_SPEED,
  action_count: ON_CHANGE_ACTION_COUNT,
};


export function handleChange(name, value) {
  return {
    type: ON_CHANGE_FILED[name],
    value,
  };
}

export function clearGame() {
  return {
    type: CLEAR_GAME,
  };
}
