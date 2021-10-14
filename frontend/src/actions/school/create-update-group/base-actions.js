
export const CHANGE_FIELD = 'CHANGE_';
export const SCHOOL_ID = 'SCHOOL_ID';
export const TEACHER_ID = 'TEACHER_ID';
export const GROUP_NAME = 'GROUP_NAME';
export const FIELD_ERROR = 'FIELD_ERROR_';

const GROUP_NAME_MIN_LENGTH = 4;


export function getBaseActions(typePrefix) {
  const getActionType = (action) => `${typePrefix}/${action}`;

  const FIELDS = {
    school_id: getActionType(CHANGE_FIELD + SCHOOL_ID),
    teacher_id: getActionType(CHANGE_FIELD + TEACHER_ID),
    name: getActionType(CHANGE_FIELD + GROUP_NAME),
  };


  const changeFieldValue = ({fieldName, value}) => ({
    type: FIELDS[fieldName],
    value,
  });

  return {
    changeFieldValue,
  };
}


export const _validateData = (typePrefix, dispatch, {name}) => {
  const getActionType = (action) => `${typePrefix}/${action}`;

  if (name.length < GROUP_NAME_MIN_LENGTH) {
    dispatch({
      type: getActionType(FIELD_ERROR + GROUP_NAME),
      error: `Длина названия должен быть не менее ${GROUP_NAME_MIN_LENGTH}х символов.`,
    });
    return false;
  }
  return true;
};
