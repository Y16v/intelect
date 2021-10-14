import {Box, Menu} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import CustomLink from '../../common/CustomLink';
import React from 'react';
import {intl} from '../../../routes/AppRoot';

export default function StudentActionsMenu(onClose, {
  student,
  anchorEl,
  updateStudentAccess,
  needToUpdateAccess,
  canUpdateAccess,
  redirectToEditStudent,
  deleteStudentAccess,
}) {
  return (
    <Menu
      keepMounted
      open={!!student.id}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem>
        <CustomLink
          to={`/teacher_profile/students/${student.id}`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >
          {intl('profile.common.studentActionsMenu.openProfile')}
        </CustomLink>
      </MenuItem>
      <MenuItem onClick={() => {
        redirectToEditStudent(student);
        onClose();
      }}>
        {intl('profile.common.studentActionsMenu.updateProfile')}
      </MenuItem>
      {canUpdateAccess && (
        <MenuItem onClick={() => {
          updateStudentAccess(student.id);
          onClose();
        }} disabled={!needToUpdateAccess}>{intl('profile.common.studentActionsMenu.renewPackage')}</MenuItem>
      )}
      <MenuItem>
        <CustomLink
          to={`/change-child-password/${student.id}`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >
          {intl('profile.common.studentActionsMenu.changePassword')}
        </CustomLink>
      </MenuItem>
      {canUpdateAccess && (
        <MenuItem onClick={() => {
          deleteStudentAccess(student.id);
          onClose();
        }}>{intl('profile.common.studentActionsMenu.delete')}</MenuItem>
      )}
    </Menu>
  );
}
