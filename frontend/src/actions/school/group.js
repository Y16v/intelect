import axios from 'axios';
import {USER_TOKEN_KEY} from '../../store/storage_kets';
import {createNotification} from 'react-redux-notify';
import {deleteGroupFailNotificationConfig, deleteGroupSuccessNotificationConfig} from './notifications';
import swal from 'sweetalert';

export const SHOW_GROUP_ACTIONS_MENU = 'GROUPS/SHOW_GROUP_ACTIONS_MENU';
export const CLOSE_GROUP_ACTIONS_MENU = 'GROUPS/CLOSE_GROUP_ACTIONS_MENU';
export const DELETE_GROUP_SUCCESS = 'GROUPS/DELETE_GROUP_SUCCESS';

export const showGroupActionMenu = ({groupId, groupName, anchorEl}) => ({
  type: SHOW_GROUP_ACTIONS_MENU,
  groupId,
  groupName,
  anchorEl,
});


export const closeGroupActionMenu = () => ({
  type: CLOSE_GROUP_ACTIONS_MENU,
});


export const deleteGroup = () => (dispatch, getState) => {
  swal({
    title: 'Вы действительно хотите удалить эту группу?',
    icon: 'warning',
    dangerMode: true,
    buttons: {
      cancel: 'Отменить',
      defeat: 'Да, удалить',
    },
  })
      .then((willDelete) => {
        if (!willDelete) {
          return dispatch({
            type: CLOSE_GROUP_ACTIONS_MENU,
          });
        }
        const state = getState();
        const {profile: loggedUser} = state;
        const {groupId, groupName} = state.teacherProfilePage.groupActionMenuAttrs;

        const url = `/api/schools/${loggedUser.school_id}/groups/${groupId}`;
        const token = localStorage.getItem(USER_TOKEN_KEY);

        axios.delete(url, {data: {}, headers: {Authorization: token}})
            .then(() => {
              dispatch(createNotification(deleteGroupSuccessNotificationConfig(groupName)));

              dispatch({
                type: DELETE_GROUP_SUCCESS,
              });
              dispatch({
                type: CLOSE_GROUP_ACTIONS_MENU,
              });
            })
            .catch(() => {
              dispatch(createNotification(deleteGroupFailNotificationConfig));
            });
      });
};
