import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectMultiplier from '../common/SelectMultiplier';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: 130,
    maxWidth: 400,
    backgroundColor: 'rgba(128, 165, 220, 0.5)',
    margin: theme.spacing(1.1),
  },
  minFormContainer: {
    maxHeight: 40,
    minWidth: 300,
    backgroundColor: '#ff9b00',
  },
  centerForm: {
    margin: 'auto',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  textTypography: {
    color: 'white',
    margin: theme.spacing(1),
    fontWeight: 600,
    userSelect: 'none',
  },
  muiTypography: {
    color: 'white',
    userSelect: 'none',
    fontWeight: 600,
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 18,
  },
}));

export default function SelectMultiplierModal({label, onSelect, value, disabled = false, disabledButtons=[]}) {
  const [open, setOpen] = React.useState(false);
  const [valueLocal, setValueLocal] = React.useState(value);
  const classes = useStyles();
  const handleClickOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onSelect && onSelect(valueLocal);
  };

  return (
    <React.Fragment>
      <div className={classes.formContainer}>
        <div className={classes.minFormContainer}>
          <Typography
            className={classes.muiTypography}
            variant="h5"
            component="h2"
            align="center"
          >{label}
          </Typography>
        </div>
        <div className={classes.centerForm}>
          <Typography
            className={classes.textTypography}
            variant="h2"
            component="h2"
            align="center"
            style={{background: disabled ? 'gray' : 'none', cursor: 'pointer'}}
            onClick={handleClickOpen}>
            {value}
          </Typography>
        </div>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title" className={classes.title}>{intl('game.modal.alertDialogZeroing.chooseNumbers')}</DialogTitle>
        <SelectMultiplier
          label={intl('game.common.gameOperationCenterAC.firstMultiplier')}
          onClick={(v) => setValueLocal(v)}
          value={valueLocal}
          disabledButtons={disabledButtons}
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {intl('close')}
          </Button>
          <Button onClick={handleClose} color="primary">
            {intl('apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
