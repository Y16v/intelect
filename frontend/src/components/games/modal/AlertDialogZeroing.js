import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#3586e3',
    border: 0,
    color: 'white',
    height: 38,
    padding: '0 3px',
  },
}));

export default function AlertDialog({
  open,
  handleClose,
  actions,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {<Alert severity="warning">
            <AlertTitle>{intl('game.modal.alertDialogZeroing.yourAssignmentsWillBeLost')}</AlertTitle>
          </Alert>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {intl('game.modal.alertDialogZeroing.areYouSure')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={actions.close} color="primary" variant="contained">
            {intl('cancel')}
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained" autoFocus>
            {intl('yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
