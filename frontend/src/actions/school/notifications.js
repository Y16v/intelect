import React from 'react';
import {NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';


export const createSchoolSuccessNotification = {
  message: 'Школа успешно создана!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const createSchoolErrorNotification = {
  message: 'Ошибка при создании!',
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const createTeacherPageSuccessNotification = {
  message: 'Учитель успешно создана!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const createTeacherPageErrorNotification = {
  message: 'Ошибка при создании!',
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const createStudentPageSuccessNotification = {
  message: 'Студент успешно создана!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const createStudentPageErrorNotification = {
  message: 'Ошибка при создании!',
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const updateStudentPageSuccessNotification = {
  message: 'Студент успешно отредактирован!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const updateStudentPageErrorNotification = {
  message: 'Ошибка при редактировании!',
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const updateTeacherPageSuccessNotification = {
  message: 'Учитель успешно отредактирован!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const updateTeacherPageErrorNotification = {
  message: 'Ошибка при создании!',
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const actionsSuccessNotification = {
  message: 'Результаты игры успешно сохранены!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const actionsErrorNotification = {
  message: 'При сохранении произошла ошибка!',
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
  icon: <i className="fa fa-check" />,
};

export const updatePackageSuccessNotificationConfig = {
  message: 'Пакет успешно обновлен.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};

export const updatePackageTypeSuccessNotificationConfig = {
  message: 'Тариф школы успешно обновлен.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};

export const changeChildPasswordSuccessNotificationConfig = (childFirstAndLastName) => ({
  message: `Пароль ${childFirstAndLastName} успешно обновлен.`,
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
});

export const createGroupSuccessNotificationsConfig = (groupName) => ({
  message: `Группа ${groupName} успешно создано.`,
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
});


export const editGroupSuccessNotificationConfig = (groupName) => ({
  message: `Изменения группы ${groupName} успешно сохранены.`,
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
});


export const deleteGroupSuccessNotificationConfig = (groupName) => ({
  message: `Группа ${groupName} успешно удалена.`,
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
});

export const deleteGroupFailNotificationConfig = {
  message: `Уупс! Удаление группы провалилась. Попробуйте перезагрузить страницу.`,
  type: NOTIFICATION_TYPE_ERROR,
  duration: 5000,
  canDismiss: true,
};


export const sendPackageProposalSuccessNotificationConfig = {
  message: 'Заявка на получение пакета успешно отправлено. Наши сотрудники отвечут вам ближайшее время.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};


export const packageProposalCanceledSuccessNotificationConfig = {
  message: 'Заявка успешно отменена.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};


export const packageProposalCancelFailNotificationConf = {
  message: 'Что-то пошло не так. Попробуйте еще раз или перезагрузите страницу.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};


export const packageProposalRejectedSuccessNotificationConf = {
  message: 'Продложение успешно отказано.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};


export const packageProposalRejectFailNotificationConf = {
  message: 'Что-то пошло не так. Попробуйте еще раз или перезагрузите страницу.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};


export const packageProposalConfirmedSuccessNotificationConf = {
  message: 'Продложение успешно принято.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};


export const packageProposalConfirmFailNotificationConf = {
  message: 'Что-то пошло не так. Попробуйте еще раз или перезагрузите страницу.',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 5000,
  canDismiss: true,
};
