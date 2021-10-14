import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {deepOrange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {Box, Menu, Table, TableBody, TableCell, TableHead} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {history} from '../../index';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import SearchBar from '../profile/cards/SearchBar';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import CustomLink from '../common/CustomLink';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '60vw',
    minHeight: '80vh',
    padding: 20,
    borderRadius: '4px',
    background: '#FFFFFF',
    marginBottom: '10px',
    overflow: 'hidden',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: '#2196F3',
  },
  list: {
    maxHeight: '60vh',
    position: 'relative',
    overflow: 'auto',
  },
  textItem: {
    color: '#515151',
    fontSize: '17px',
  },
  searchForm: {
    marginRight: theme.spacing(2),
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    width: '100%',
    overflow: 'hidden',
  },
  highlight:
        theme.palette.type === 'light',
  title: {
    flex: '1 1 80%',
  },
  createButton: {
    width: '10vw',
    fontWeight: 'bold',
    background: '#2196F3',
  },
}));

const TableToolbar = ({pack, actions}) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}
    >
      <Typography style={{fontStyle: 'normal', fontSize: '26px', lineHeight: '30px', fontWeight: 'bold'}}
        className={classes.title} variant="h6" id="tableTitle">
        {intl('teachers')}
      </Typography>
      <SearchBar onChange={actions.handleFilter} />
      <Tooltip title="Create list">
        <Button
          className={classes.createButton}
          onClick={() => history.push('/create_teacher')}
          variant="contained" color="primary"
          disabled={pack <= 0}
        >
          {intl('profile.card.createOrUpdate.create')}
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

export default function PersonsTable({data, onClick, pack, actions, updateTeacherAccess, actionMenuAttrs}) {
  const classes = useStyles();
  const people = Array.isArray(data) ? data : [];
  const handleCloseSnackbar = () => {
    actions.finishUpdateTeacherAccess();
    actions.getTeachers();
    actions.getStudents();
    actions.getSchool();
  };

  return (
    <Box className={classes.root}>
      {teacherActionsMenu(
          actions.closeTeacherActionsMenu,
          {
            ...actionMenuAttrs,
            openTeacherProfile: onClick,
            updateTeacherAccess: actions.updateTeacherAccess,
            redirectToEditTeacher: actions.redirectToEditTeacher,

          },
      )}
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={!!updateTeacherAccess.updatedTeacher.id || !!updateTeacherAccess.error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={updateTeacherAccess.error ? 'error' : 'success'}>
          {updateTeacherAccess.error ?
                        updateTeacherAccess.error :
                        `${intl('schoolAdmin.teacherPackage')} ${updateTeacherAccess.updatedTeacher.first_name} ${updateTeacherAccess.updatedTeacher.last_name} ${intl('schoolAdmin.teacherPackage2')}`
          }
        </Alert>
      </Snackbar>
      <TableToolbar pack={pack} actions={actions}/>
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{intl('fullName')}</TableCell>
              <TableCell>{intl('phone')}</TableCell>
              <TableCell>{intl('email')}</TableCell>
              <TableCell>{intl('activeUntil')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={(event) => actions.showTeacherActionsMenu({
                  teacher: user,
                  needToUpdateAccess: user.needToUpdateAccess,
                  canUpdateAccess: true,
                  anchorEl: event.currentTarget,
                })}
              >
                <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{!! user.active_until.year ? `${user.active_until.day}/${user.active_until.month}/${user.active_until.year}` : `${user.active_until}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Box>
  );
}


function teacherActionsMenu(onClose, {
  teacher,
  anchorEl,
  openTeacherProfile,
  updateTeacherAccess,
  needToUpdateAccess,
  canUpdateAccess,
  redirectToEditTeacher,
}) {
  return (
    <Menu
      keepMounted
      open={!!teacher.id}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem onClick={() => {
        openTeacherProfile(teacher);
        onClose();
      }}>
        {intl('schoolAdmin.personTable.openProfile')}
      </MenuItem>
      <MenuItem onClick={() => {
        redirectToEditTeacher(teacher);
        onClose();
      }}>
        {intl('schoolAdmin.personTable.editProfile')}
      </MenuItem>
      {canUpdateAccess && (
        <MenuItem disabled={!needToUpdateAccess} onClick={() => {
          updateTeacherAccess(teacher.id);
          onClose();
        }}>
          {intl('schoolAdmin.personTable.updatePackage')}
        </MenuItem>
      )}
      <MenuItem>
        <CustomLink
          to={`/change-child-password/${teacher.id}`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >
          {intl('changePassword')}
        </CustomLink>
      </MenuItem>
    </Menu>
  );
}
