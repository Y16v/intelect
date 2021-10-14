import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import SettingsSpeedGame from './GamesSettingSpeedModal';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1.2),
    minWidth: 150,
  },
  centerForm: {
    margin: 'auto',
    textAlign: 'center',
  },
  formContainer: {
    minHeight: 100,
    maxWidth: 400,
    minWidth: 300,
    backgroundColor: ' rgba(128, 165, 220, 0.5) ',
    margin: theme.spacing(1.1),
  },
  minFormContainer: {
    maxHeight: 40,
    maxWidth: 400,
    backgroundColor: '#ff9b00',
  },
  muiTypography: {
    color: 'white',
    fontWeight: 600,
    userSelect: 'none',
  },
}));

export default function AmountOfAction({defaultValue, onChange, label}) {
  const classes = useStyles();
  return (<div className={classes.formContainer}>
    <div className={classes.minFormContainer}>
      <Typography
        className={classes.muiTypography}
        variant="h5"
        component="h2"
        align="center"
      >{label || intl('numberOfAction')}
      </Typography>
    </div>
    <div className={classes.centerForm}>
      <FormControl className={classes.formControl}>
        <SettingsSpeedGame onChange={onChange} value={defaultValue}/>
      </FormControl>
    </div>
  </div>
  );
}
