import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import SpeedSettingNumber from './SpeedSettingsNumber';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  buttonForm: {
    color: 'white',
    width: 120,
    height: 50,
    margin: theme.spacing(2),
  },
  typographyText: {
    color: 'white',
    fontWeight: 700,
    userSelect: 'none',
  },
}));


export default function SettingsSpeedGame({isFloat, value, onChange}) {
  const classes = useStyles();
  const [isOpen, setWindowOpen] = React.useState(false);
  const [selectOneBit, setSelectOneBit] = React.useState(null);
  const [selectTwoBit, setSelectTwoBit] = React.useState(null);
  const dot = isFloat ? '.' : '';
  const handleClickOpen = () => {
    setWindowOpen(true);
  };
  const handleClickClose = () => {
    setWindowOpen(false);
  };
  const handleApply = () => {
    onChange && onChange(parseFloat(`${selectOneBit}${dot}${selectTwoBit}`));
    setWindowOpen(false);
  };
  return (
    <div>
      <div>
        <Typography
          className={classes.typographyText}
          variant="h3"
          component="h6"
          align="center"
          onClick={handleClickOpen}>
          {value}
        </Typography>
      </div>
      <Dialog open={isOpen} onClose={handleClickClose} fullWidth
        aria-labelledby="form-dialog-title">
        <SpeedSettingNumber
          value1={selectOneBit}
          value2={selectTwoBit}
          defaultValue={value}
          onClick1={(number) => setSelectOneBit(number)}
          onClick2={(number) => setSelectTwoBit(number)}
          dot={dot}
        />
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            {intl('cancel')}
          </Button>
          <Button onClick={handleApply} color="primary" disabled={ !selectOneBit && !selectTwoBit }>
            {intl('apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
